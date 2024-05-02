export type User = {
  cpf: string;
  email: string;
  name: string;
  password: string;
};

export type CulturalUserPJ = {
  alternativeTel: string;
  cep: string;
  cnpj: string;
  complement: string;
  county: string;
  cultura: string[];
  email: string;
  fantasyName: string;
  houseNumber: string;
  job: string;
  neighboorhood: string;
  name: string;
  phone: string;
  proponent: string;
  public: boolean;
  publicPlace: string;
  responsible: string;
  socialReason: string;
  tel: string;
  uf: string;
  website: string;
};
export type CulturalUserPF = {
  alternativeTel: string;
  cep: string;
  complement: string;
  county: string;
  cpf: string;
  cultura: string[];
  email: string;
  houseNumber: string;
  name: string;
  neighboorhood: string;
  phone: string;
  proponent: string;
  public: boolean;
  publicPlace: string;
  tel: string;
  uf: string;
};

export type FileInfo = {
  name: string;
  contentType: string;
};

export type Contact = {
  type: string;
  number: string;
  public: boolean;
  userId: number;
};

export type Collective = {
  name: string;
  area: string;
  opening: string;
  phone: string;
  email: string;
  address: string;
  neighboorhood: string;
  cep: string;
  complement: string;
  county: string;
  responsible: string;
  userId: number;
};
