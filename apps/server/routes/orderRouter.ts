import { Router } from "express";
import { isAuthenticated } from "@/middleware/isAuthenticated";
import schemaValidator from "@/middleware/schemaValidator";
import {
  createCheckoutSession,
  getOrderById,
  getRecentOrders,
  getStats,
  updateOrder,
} from "@/controller/orderController";

const orderRouter: Router = Router();

orderRouter.use(isAuthenticated);

orderRouter.get("/checkout-session/:id", createCheckoutSession);

orderRouter.get("/recent-orders", getRecentOrders);
orderRouter.get("/stats", getStats);
orderRouter
  .route("/:id")
  .get(getOrderById)
  .patch(schemaValidator("updateOrder"), updateOrder);

export { orderRouter };
