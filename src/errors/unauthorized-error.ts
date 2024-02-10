import { ApplicationError } from "../protocols";

export function unauthorizedError(): ApplicationError {
  return {
    name: "não autorizado",
    message: "Você não está autorizado a prosseguir com esta ação.",
  };
}
