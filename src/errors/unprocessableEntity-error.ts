import { ApplicationError } from "../protocols";

export function UnprocessableEntityError(message: string): ApplicationError {
  return {
    name: "UnprocessableEntityError",
    message,
  };
}
