import { Collective } from "@/entities";
import { UnprocessableEntityError } from "@/errors";
import { collectiveRepository, userRepository } from "@/repositories";

async function getManyByUserId(userId: number) {
  const collectiveList = await collectiveRepository.getManyByUserId(userId);
  return collectiveList;
}

async function create(body: Collective, userId: number) {
  const existentUser = await userRepository.findOneById(userId);
  if (!existentUser)
    throw UnprocessableEntityError(
      "Responsável pelo coletivo não encontrado! "
    );

  const collective = await collectiveRepository.create(body);
  return collective;
}

async function update(body: Collective, collectiveId: number) {
  const collective = await collectiveRepository.edit(body, collectiveId);
  return collective;
}

const collectiveService = {
  create,
  getManyByUserId,
  update,
};

export { collectiveService };
