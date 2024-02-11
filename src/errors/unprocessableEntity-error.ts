import { ApplicationError } from "../protocols";

export function unprocessableEntityError(message: string): ApplicationError {
  return {
    name: "unprocessableEntityError",
    message,
  };
}
