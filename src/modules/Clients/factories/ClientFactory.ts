import type { IClient } from "../@types/types";
import { v4 as uuidv4 } from "uuid";

import { createAddress } from "./AddressFactory";
import { createDetails } from "./DetailsFactory";
import { createFiles } from "./FilesFactory";
import { createProductData } from "./ProductsFactory";
import { createRiskProfile } from "./RiskProfileFactory";

export const createClient = (data: Partial<IClient> = {}): IClient => {
  return {
    id: data.id === "" || data.id === undefined ? uuidv4() : data.id,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),

    details: data.details ? createDetails(data.details) : createDetails(),
    address: data.address ? createAddress(data.address) : createAddress(),
    riskProfile: data.riskProfile ? createRiskProfile(data.riskProfile) : createRiskProfile(),

    products: Array.isArray(data.products) ? data.products.map((p) => createProductData(p)) : [],

    documents: Array.isArray(data.documents) ? createFiles(data.documents) : createFiles(),
  };
};
