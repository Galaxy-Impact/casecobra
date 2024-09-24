import { Router } from "express";
import { getCurrentUser } from "@/controller/userController";
import { isAuthenticated } from "@/middleware/isAuthenticated";

const userRouter: Router = Router();

userRouter.get("/current-user", isAuthenticated, getCurrentUser);

export { userRouter };
