export type IClient = {
  id: string;
  details: IDetails;
  createdAt: Date;
  products: IProduct[];
  status: string;
  address: IAddress;
  riskProfile: IRiskProfile;
  documents: IFiles[];
};

export type IDetails = {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  birthday: string;
  status: string;
  email: string;
};

export type IProduct = {
  id: string;
  status: string;
  tipo: string;
  company: string;
  start: string;
  end: string;
  price: number;
  description: string;
  files: IFiles[];
};

export interface IAddress {
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipcode: string;
}

export type IFiles = {
  name: string;
  size: number;
  content: string;
  type: string;
};

export type IRiskProfile = {
  hasGarage: string;
  parkingLocation: string;
  vehicleCount: number;
  hasSecurity: boolean;
  driverAge: string;
  driverGender: string;
  maritalStatus: string;
  hasMinorChildren: boolean;
  vehicleUse: string;
  hasYoungDriver: string;
  weeklyUse: string;
  kmPerMonth: string;
  coverageType: string;
  franchiseType: string;
  wantsAssistance: boolean;
  wantsReserveCar: boolean;
  wantsGlassCoverage: boolean;
};
