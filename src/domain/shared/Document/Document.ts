<<<<<<< HEAD
=======

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
// Definição do tipo e da classe Document:

export type IFiles = {
  name: string;
  size: number;
  content: string;
<<<<<<< HEAD
  type: string;
=======
  type: string
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
};

export class Files {
  private _data: IFiles[];

  constructor(data?: IFiles[]) {
<<<<<<< HEAD
    if (data) this.validate(data);

    this._data =
      data?.map((doc) => ({
        size: doc.size ?? 0,
        content: doc.content ?? new File([], ""),
        name: doc.name ?? "",
        type: doc.type ?? "",
      })) || [];
=======
    if(data) this.validate(data);

    this._data = data?.map((doc) => ({
      size: doc.size ?? 0,
      content: doc.content ?? new File([], ''),
      name: doc.name ?? '',
      type: doc.type ?? ''
    })) || [];
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  }

  public validate(data: IFiles[]) {
    data.forEach((doc) => {
<<<<<<< HEAD
      if (doc.size > 5 * 1024 * 1024) throw new Error("Arquivo maior que 5MB");
=======
      if (doc.size > 5 * 1024 * 1024) throw new Error('Arquivo maior que 5MB');
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    });
  }

  get getFiles(): IFiles[] {
    return this._data;
  }

  public addFiles(files: IFiles): void {
    this._data.push(files);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
