import { Client } from '../entities/Client'
import { v4 as uuidv4 } from 'uuid'
import { Address } from '@/domain/shared/address/Address'
import { RiskProfile } from '../entities/RiskProfile'
import { Files} from '@/domain/shared/Document/Document'
import { Products } from '../entities/Products'
import type { IClient } from '@/modules/Clients/interfaces/IClient'
import { Details } from '../entities/Details'

export class ClientFactory {
  static create(data?: Partial<IClient>): Client {

    if (!data) return new Client()
    
    const client = {
      id: data?.id == "" ? uuidv4() : data?.id ?? "",      
      createdAt: new Date(data?.createdAt ?? Date.now()),
      details: data.details ? new Details(data.details).getDetails : new Details(data.details).getDetails,
      products: Array.isArray(data?.products)
        ? data.products.map((prop) => new Products(prop).getProducts)
        : [],
      address: data?.address ? new Address(data.address).getAddress : new Address().getAddress,
      riskProfile: data?.riskProfile
        ? new RiskProfile(data.riskProfile).getRiskProfile
        : new RiskProfile().getRiskProfile,
      documents: Array.isArray(data?.documents)
        ? new Files(data.documents).getFiles
        : new Files([]).getFiles
    }
      

    return new Client(client)
  }
}
