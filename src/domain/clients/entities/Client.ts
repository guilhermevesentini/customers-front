<<<<<<< HEAD
import { Address } from "@/domain/shared/address/Address";
import { Files } from "@/domain/shared/Document/Document";
import { RiskProfile } from "./RiskProfile";
import { Products } from "./Products";
import type { IClient } from "@/modules/Clients/interfaces/IClient";
import { EStatus } from "@/shared/enums/enums";
import { Details } from "./Details";
=======
import { Address } from '@/domain/shared/address/Address';
import { Files } from '@/domain/shared/Document/Document';
import { RiskProfile } from './RiskProfile';
import { Products } from './Products';
import type { IClient } from '@/modules/Clients/interfaces/IClient';
import { EStatus } from '@/shared/enums/enums';
import { Details } from './Details';
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

export class Client {
  private _data: IClient;

  constructor(data?: IClient) {
<<<<<<< HEAD
    if (data) this.validate(data);

    this._data = {
      id: data?.id ?? "",
=======
    if(data) this.validate(data);

    this._data = {
      id: data?.id ?? '',      
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      details: data?.details ?? new Details().getDetails,
      createdAt: data?.createdAt ?? new Date(),
      address: data?.address || new Address().getAddress,
      products: data?.products.map((prop) => new Products(prop).getProducts) || [],
      documents: data?.documents ?? new Files().getFiles,
<<<<<<< HEAD
      riskProfile: data?.riskProfile ?? new RiskProfile().getRiskProfile,
=======
      riskProfile: data?.riskProfile ?? new RiskProfile().getRiskProfile
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    };
  }

  private validate(data: IClient) {
    //validacoes client
  }

  get getClient(): IClient {
<<<<<<< HEAD
    return this._data;
  }
}
=======
    return this._data
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
