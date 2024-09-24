import { Router } from "express";
import {
  authorize,
  googleOauthHandler,
  signIn,
  signOut,
  signUp,
} from "@/controller/authController";
import schemaValidator from "@/middleware/schemaValidator";

const authRouter: Router = Router();

authRouter.post("/signup", schemaValidator("signup"), signUp);
authRouter.post("/signin", schemaValidator("signin"), signIn);
authRouter.get("/oauth/google", googleOauthHandler);
authRouter.get("/signout", signOut);

authRouter.post("/authorize", authorize);

export { authRouter };
