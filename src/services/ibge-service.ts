import axios from "axios";

type County = {
  id: number;
  nome: string;
  microrregiao: {};
  "regiao-imediata": {};
};

async function getUfs() {
  try {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter estados do IBGE: ${error.message}`);
  }
}

async function getCountiesByUfId(ufId: string) {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`
    );
    const countiesFormatted = response.data.map((county: County) => {
      const countySimplified = county;
      delete countySimplified.microrregiao;
      delete countySimplified["regiao-imediata"];
      return countySimplified;
    });
    return countiesFormatted;
  } catch (error) {
    throw new Error(
      `Erro ao obter municípios do IBGE para o estado ${ufId}: ${error.message}`
    );
  }
}

export const ibgeService = {
  getUfs,
  getCountiesByUfId,
};
