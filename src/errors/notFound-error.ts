import { ApplicationError } from "../protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Não encontrado!",
  };
}
