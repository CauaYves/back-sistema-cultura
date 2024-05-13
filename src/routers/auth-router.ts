import { Router } from "express";
import {
  getUserInfo,
  checkConfirmationCode,
  createUser,
  signIn,
  forgotPassword,
  updatePassword,
  updatedUserData,
} from "@/controllers";
import { authMiddleware, validateBody, validateQuery } from "@/middlewares";
import {
  checkConfirmationCodeSchema,
  signinSchema,
  signupSchema,
  forgotPasswordSchema,
} from "@/schemas";

const authrouter = Router();

authrouter
  .post("/sign-up", validateBody(signupSchema), createUser)
  .post("/sign-in", validateBody(signinSchema), signIn)
  .post(
    "/confirm-registration",
    validateQuery(checkConfirmationCodeSchema),
    checkConfirmationCode
  )
  .post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword)
  .put("/update-password", validateBody(signinSchema), updatePassword)
  .get("/user", authMiddleware, getUserInfo)
  .put("/", authMiddleware, validateBody(signupSchema), updatedUserData);

export { authrouter };
