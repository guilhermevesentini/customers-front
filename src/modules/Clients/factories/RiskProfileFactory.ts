import type { IRiskProfile } from "../@types/types";

export const createRiskProfile = (data?: Partial<IRiskProfile>): IRiskProfile => {
  if (data) validateRiskProfile(data);

  return {
    hasGarage: data?.hasGarage ?? "",
    parkingLocation: data?.parkingLocation ?? "",
    vehicleCount: data?.vehicleCount ?? 0,
    hasSecurity: data?.hasSecurity ?? false,
    driverAge: data?.driverAge ?? "",
    driverGender: data?.driverGender ?? "",
    maritalStatus: data?.maritalStatus ?? "",
    hasMinorChildren: data?.hasMinorChildren ?? false,
    vehicleUse: data?.vehicleUse ?? "",
    hasYoungDriver: data?.hasYoungDriver ?? "",
    weeklyUse: data?.weeklyUse ?? "",
    kmPerMonth: data?.kmPerMonth ?? "",
    coverageType: data?.coverageType ?? "",
    franchiseType: data?.franchiseType ?? "",
    wantsAssistance: data?.wantsAssistance ?? false,
    wantsReserveCar: data?.wantsReserveCar ?? false,
    wantsGlassCoverage: data?.wantsGlassCoverage ?? false,
  };
};

const validateRiskProfile = (data: Partial<IRiskProfile>) => {
  // Exemplo de validação, descomente se quiser usar:
  // if (!data.coverageType || !data.franchiseType) {
  //   throw new Error('Tipo de cobertura e franquia são obrigatórios.');
  // }
  // if (typeof data.vehicleCount !== 'number' || data.vehicleCount < 0) {
  //   throw new Error('Quantidade de veículos inválida.');
  // }
};
