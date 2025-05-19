import { Address } from '@/domain/shared/address/Address';
import { Files } from '@/domain/shared/Document/Document';
import { RiskProfile } from './RiskProfile';
import { Products } from './Products';
import type { IClient } from '@/modules/Clients/interfaces/IClient';
import { EStatus } from '@/shared/enums/enums';
import { Details } from './Details';

export class Client {
  private _data: IClient;

  constructor(data?: IClient) {
    if(data) this.validate(data);

    this._data = {
      id: data?.id ?? '',      
      details: data?.details ?? new Details().getDetails,
      createdAt: data?.createdAt ?? new Date(),
      address: data?.address || new Address().getAddress,
      products: data?.products.map((prop) => new Products(prop).getProducts) || [],
      documents: data?.documents ?? new Files().getFiles,
      riskProfile: data?.riskProfile ?? new RiskProfile().getRiskProfile
    };
  }

  private validate(data: IClient) {
    //validacoes client
  }

  get getClient(): IClient {
    return this._data
  }
}