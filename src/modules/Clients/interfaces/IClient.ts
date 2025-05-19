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
