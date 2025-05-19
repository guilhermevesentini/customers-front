<<<<<<< HEAD
import type { IRiskProfile } from "@/domain/clients/entities/RiskProfile";
import type { IAddress } from "@/domain/shared/address/Address";
import type { IFiles } from "@/domain/shared/Document/Document";
import type { IProduct } from "./IProducts";
import type { IDetails } from "./IDetails";

export type IClient = {
  id: string;
  details: IDetails;
  createdAt: Date;
  products: IProduct[];
  address: IAddress;
  riskProfile: IRiskProfile;
  documents: IFiles[];
};
=======
import type { IRiskProfile } from '@/domain/clients/entities/RiskProfile'
import type { IAddress } from '@/domain/shared/address/Address'
import type { IFiles } from '@/domain/shared/Document/Document'
import type { IProduct } from './IProducts'
import type { IDetails } from './IDetails'

export type IClient = {
  id: string
  details: IDetails
  createdAt: Date
  products: IProduct[]
  address: IAddress
  riskProfile: IRiskProfile
  documents: IFiles[]
}


>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
