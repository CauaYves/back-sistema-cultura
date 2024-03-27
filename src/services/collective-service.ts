import { Collective } from "@/entities";
import { conflictError, UnprocessableEntityError } from "@/errors";
import { collectiveRepository, userRepository } from "@/repositories";

async function create(body: Collective, userId: number) {
  const existentUser = await userRepository.findOneById(userId);
  if (!existentUser)
    throw UnprocessableEntityError(
      "Responsável pelo coletivo não encontrado! "
    );

  const existentCollective = await collectiveRepository.getOneByUserId(userId);
  if (existentCollective)
    throw conflictError("Já existe um coletivo cultural cadastrado! ");

  const collective = await collectiveRepository.create(body);
  return collective;
}

const collectiveService = {
  create,
};

export { collectiveService };
