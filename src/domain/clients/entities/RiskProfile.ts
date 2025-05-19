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

export class RiskProfile {
  private readonly _data: IRiskProfile;

  constructor(data?: IRiskProfile) {
<<<<<<< HEAD
    if (data) this.validate(data);

    this._data = {
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
=======
    if(data) this.validate(data);

    this._data = {
      hasGarage: data?.hasGarage ?? '',
      parkingLocation: data?.parkingLocation ?? '',
      vehicleCount: data?.vehicleCount ?? 0,
      hasSecurity: data?.hasSecurity ?? false,
      driverAge: data?.driverAge ?? '',
      driverGender: data?.driverGender ?? '',
      maritalStatus: data?.maritalStatus ?? '',
      hasMinorChildren: data?.hasMinorChildren ?? false,
      vehicleUse: data?.vehicleUse ?? '',
      hasYoungDriver: data?.hasYoungDriver ?? '',
      weeklyUse: data?.weeklyUse ?? '',
      kmPerMonth: data?.kmPerMonth ?? '',
      coverageType: data?.coverageType ?? '',
      franchiseType: data?.franchiseType ?? '',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      wantsAssistance: data?.wantsAssistance ?? false,
      wantsReserveCar: data?.wantsReserveCar ?? false,
      wantsGlassCoverage: data?.wantsGlassCoverage ?? false,
    };
  }

  get getRiskProfile(): IRiskProfile {
    return this._data;
  }

  private validate(data: IRiskProfile) {
    // if (!data.coverageType || !data.franchiseType) {
    //   throw new Error('Tipo de cobertura e franquia são obrigatórios.');
    // }
<<<<<<< HEAD
=======

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    // if (typeof data.vehicleCount !== 'number' || data.vehicleCount < 0) {
    //   throw new Error('Quantidade de veículos inválida.');
    // }
  }
}
