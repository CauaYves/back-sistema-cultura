import axios from "axios";
import https from "https";

// Configuração para ignorar a verificação do certificado SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

type County = {
  id: number;
  nome: string;
  microrregiao?: {};
  "regiao-imediata"?: {};
};

type Uf = {
  id: 50;
  sigla: string;
  nome: string;
  regiao: {
    id: 5;
    sigla: string;
    nome: string;
  };
};

async function getUfs() {
  try {
    const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados", { httpsAgent });
    const ufsFormatted = response.data.map((uf: Uf) => {
      const { id, sigla, nome } = uf;
      return { id, sigla, nome };
    });
    return ufsFormatted;
  } catch (error) {
    console.log(error);
    throw new Error(`Erro ao obter estados do IBGE: ${error.message}`);
  }
}

async function getCountiesByUfId(ufId: string) {
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`, {
      httpsAgent,
    });
    const countiesFormatted = response.data.map((county: County) => {
      const { id, nome } = county;
      return { id, nome };
    });
    return countiesFormatted;
  } catch (error) {
    console.log(error);
    throw new Error(`Erro ao obter municípios do IBGE para o estado ${ufId}: ${error.message}`);
  }
}

export const ibgeService = {
  getUfs,
  getCountiesByUfId,
};
