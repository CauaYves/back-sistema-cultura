import { ApplicationError } from "../protocols";

export function invalidDataError(message: string): ApplicationError {
  return {
    name: "InvalidDataError",
    message,
  };
}
