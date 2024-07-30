import {
  checkConfirmationCode,
  createUser,
  forgotPassword,
  getUserInfo,
  signIn,
  updatePassword,
  updatedUserData,
} from "@/controllers";
import { authMiddleware, validateBody, validateQuery } from "@/middlewares";
import {
  checkConfirmationCodeSchema,
  forgotPasswordSchema,
  signinSchema,
  signupSchema,
  updatePasswordSchema,
} from "@/schemas";
import { Router } from "express";

const authrouter = Router();

authrouter
  .post("/sign-up", validateBody(signupSchema), createUser)
  .post("/sign-in", validateBody(signinSchema), signIn)
  .post("/confirm-registration", validateQuery(checkConfirmationCodeSchema), checkConfirmationCode)
  .post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword)
  .get("/check-token", authMiddleware, (_req, res) => res.sendStatus(200))
  .put("/update-password", validateBody(updatePasswordSchema), updatePassword)
  .get("/user", authMiddleware, getUserInfo)
  .put("/", authMiddleware, validateBody(signupSchema), updatedUserData);

export { authrouter };
