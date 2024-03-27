import { Router } from "express";
import { checkConfirmationCode, createUser, singIn } from "@/controllers";
import { validateBody, validateQuery } from "@/middlewares";
import {
  checkConfirmationCodeSchema,
  signinSchema,
  signupSchema,
} from "@/schemas";

const authrouter = Router();

authrouter.post("/sign-up", validateBody(signupSchema), createUser);
authrouter.post("/sign-in", validateBody(signinSchema), singIn);
authrouter.post(
  "/confirm-registration",
  validateQuery(checkConfirmationCodeSchema),
  checkConfirmationCode
);

export { authrouter };
