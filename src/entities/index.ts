export type User = {
  cpf: string;
  email: string;
  name: string;
  password: string;
};

export type CulturalUser = {
  alternativeTel: string;
  cep: string;
  complement: string;
  county: string;
  cpf: string;
  cultura: boolean;
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
