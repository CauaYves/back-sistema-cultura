import { ApplicationError } from "@/protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "notFoundError",
    message: "Não encontrado!",
  };
}
