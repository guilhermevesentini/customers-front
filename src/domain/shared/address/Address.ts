export interface IAddress {
<<<<<<< HEAD
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipcode: string;
=======
  address: string
  number: string
  complement: string
  city: string
  state: string
  zipcode: string
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
}

export class Address {
  private readonly _data: IAddress;
<<<<<<< HEAD

  constructor(data?: IAddress) {
    if (data) this.validate(data);

    this._data = {
      address: data?.address ?? "",
      city: data?.city ?? "",
      complement: data?.complement ?? "",
      number: data?.number ?? "",
      state: data?.state ?? "",
      zipcode: data?.zipcode ?? "",
    };
  }

=======
 
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
  
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  get getAddress(): IAddress {
    return this._data;
  }

<<<<<<< HEAD
  private validate(data: IAddress) {
=======
  private validate (data: IAddress) {
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    // if (!data.address || !data.city || !data.zipcode) {
    //   throw new Error('Endereço, cidade e CEP são obrigatórios.')
    // }
  }

<<<<<<< HEAD
  public format(): string {
    return `${this._data.address}, ${this._data.number} - ${this._data.city}/${this._data.state}`;
=======
  public format (): string {
    return `${this._data.address}, ${this._data.number} - ${this._data.city}/${this._data.state}`
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  }
}
