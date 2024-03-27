import { Collective } from "@/entities";
import { UnprocessableEntityError } from "@/errors";
import { collectiveRepository, userRepository } from "@/repositories";

async function create(body: Collective, userId: number) {
  const existentUser = await userRepository.findOneById(userId);
  if (!existentUser)
    throw UnprocessableEntityError(
      "Responsável pelo coletivo não encontrado! "
    );

  const collective = await collectiveRepository.create(body);
  return collective;
}

const collectiveService = {
  create,
};

export { collectiveService };
