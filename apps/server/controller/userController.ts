import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import { db } from "@/app";

export const getCurrentUser = catchAsync(async (req, res, next) => {
  const data = req.user;

  if (!data) return next(new AppError("Please logged in to access this!", 401));

  const user = await db.user.findUnique({
    where: {
      id: data.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
