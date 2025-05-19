export interface IAddress {
  address: string
  number: string
  complement: string
  city: string
  state: string
  zipcode: string
}

export class Address {
  private readonly _data: IAddress;
 
  constructor(data?: IAddress) {
     if(data) this.validate(data)

    this._data = { 
      address: data?.address ?? '',
      city: data?.city ?? '',
      complement: data?.complement ?? '',
      number: data?.number ?? '',
      state: data?.state ?? '',
      zipcode: data?.zipcode ?? ''
    }
  }
  
  get getAddress(): IAddress {
    return this._data;
  }

  private validate (data: IAddress) {
    // if (!data.address || !data.city || !data.zipcode) {
    //   throw new Error('Endereço, cidade e CEP são obrigatórios.')
    // }
  }

  public format (): string {
    return `${this._data.address}, ${this._data.number} - ${this._data.city}/${this._data.state}`
  }
}
