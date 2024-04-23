import { Router } from "express";
import {
  checkConfirmationCode,
  createUser,
  singIn,
  forgotPassword,
  updatePassword,
} from "@/controllers";
import { validateBody, validateQuery } from "@/middlewares";
import {
  checkConfirmationCodeSchema,
  signinSchema,
  signupSchema,
  forgotPasswordSchema,
} from "@/schemas";

const authrouter = Router();

authrouter
  .post("/sign-up", validateBody(signupSchema), createUser)
  .post("/sign-in", validateBody(signinSchema), singIn)
  .post(
    "/confirm-registration",
    validateQuery(checkConfirmationCodeSchema),
    checkConfirmationCode
  )
  .post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword)
  .put("/update-password", validateBody(signinSchema), updatePassword);

export { authrouter };
