import Stripe from "stripe";
import { Order } from "@casecobra/db";
import { db } from "@/app";
import {
  ADMIN_EMAIL,
  BASE_PRICE,
  CLIENT_URL,
  PRODUCT_PRICES,
  STRIPE_WEBHOOKS_SECRET,
} from "@/config";
import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import { stripe } from "@/lib/stripe";
import Email from "@/services/email";

export const createCheckoutSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("Id not found!", 404));

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration)
    return next(new AppError("Configuration not found!", 404));

  if (!req.user) return next(new AppError("Unauthorized", 401));

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) return next(new AppError("User not found", 404));

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${CLIENT_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${CLIENT_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "klarna"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["DE", "US", "NP", "CH", "BH", "AU"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  res.status(201).json({
    status: "success",
    data: {
      session: {
        url: stripeSession.url,
      },
    },
  });
});

export const webHooksCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return next(new AppError("Invalid signature", 400));
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      STRIPE_WEBHOOKS_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    if (!event.data.object.customer_details?.email) {
      return next(new AppError("Missing user email", 404));
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const { userId, orderId } = session.metadata || {
      userId: null,
      orderId: null,
    };

    if (!userId || !orderId) {
      throw new Error("Invalid request metadata");
    }

    const billingAddress = session.customer_details!.address;
    const shippingAddress = session.shipping_details!.address;

    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        shippingAddress: {
          create: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state,
          },
        },
        billingAddress: {
          create: {
            name: session.customer_details!.name!,
            city: billingAddress!.city!,
            country: billingAddress!.country!,
            postalCode: billingAddress!.postal_code!,
            street: billingAddress!.line1!,
            state: billingAddress!.state,
          },
        },
      },
    });

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return;

    await new Email({
      user: {
        name: user.name || "",
        email: user?.email,
      },
    }).sendThankYouMail({
      orderDate: new Date(updatedOrder.createdAt).toLocaleDateString(),
      orderId,
    });
  }

  res.status(200).json({
    status: "success",
  });
});

export const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("Id not found!", 404));

  if (!req.user) return next(new AppError("Unathorized", 401));

  const order = await db.order.findUnique({
    where: {
      id,
      userId: req.user.id,
    },
    include: {
      shippingAddress: true,
      billingAddress: true,
      configuration: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!order) return next(new AppError("order not found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const getRecentOrders = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Unauthorized", 401));

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) return next(new AppError("user not found!", 404));

  if (user.email !== ADMIN_EMAIL) return next(new AppError("forbidden", 403));

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      amount: true,
      isPaid: true,
      createdAt: true,
      updatedAt: true,
      shippingAddress: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

export const getStats = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Unauthorized", 401));

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) return next(new AppError("user not found!", 404));

  if (user.email !== ADMIN_EMAIL) return next(new AppError("forbidden", 403));

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      lastWeekSum: lastWeekSum._sum.amount,
      lastMonthSum: lastMonthSum._sum.amount,
    },
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) return next(new AppError("Id not found", 404));

  if (!req.user) return next(new AppError("Unauthorized", 401));

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) return next(new AppError("user not found!", 404));

  if (user.email !== ADMIN_EMAIL) return next(new AppError("forbidden", 403));

  const order = await db.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});
