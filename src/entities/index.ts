export type User = {
  cpf: string;
  email: string;
  name: string;
  password: string;
};

export type CulturalUser = {
  address: string;
  borndate: string;
  cep: string;
  codename: string;
  complement: string;
  deficiency: boolean;
  education: string;
  email: string;
  extracurricularCourses: string;
  gender: string;
  houseNumber: string;
  issuingbody: string;
  mothername: string;
  nacionality: string;
  naturalness: string;
  public: boolean;
  race: string;
  rg: string;
  student: boolean;
  superiorCourses: string;
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
