import type { IClient, IProduct } from "../@types/types";
import { v4 as uuidv4 } from "uuid";

import { createAddress } from "./AddressFactory";
import { createDetails } from "./DetailsFactory";
import { createFiles } from "./FilesFactory";
import { createProductData } from "./ProductsFactory";
import { createRiskProfile } from "./RiskProfileFactory";
import { EStatus } from "@/core/enums/enums";

export const createClient = (data: Partial<IClient> = {}): IClient => {
  return {
    id: data.id === "" || data.id === undefined ? uuidv4() : data.id,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    status: handleStatus(data.products),
    details: data.details ? createDetails(data.details) : createDetails(),
    address: data.address ? createAddress(data.address) : createAddress(),
    riskProfile: data.riskProfile ? createRiskProfile(data.riskProfile) : createRiskProfile(),

    products: Array.isArray(data.products)
      ? data.products.map((p) => createProductData(p, data.details?.name))
      : [],

    documents: Array.isArray(data.documents) ? createFiles(data.documents) : createFiles(),
  };
};

const handleStatus = (products: IProduct[] | undefined) => {
  if (!products) return EStatus.inactive;

  const hasPendingProduct = products.some((product) => product.status === EStatus.pending);

  if (hasPendingProduct) return EStatus.pending;

  const hasActiveProduct = products.some((product) => product.status === EStatus.active);

  if (hasActiveProduct) return EStatus.active;

  return EStatus.inactive;
};
