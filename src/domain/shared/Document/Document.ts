// Definição do tipo e da classe Document:

export type IFiles = {
  name: string;
  size: number;
  content: string;
  type: string;
};

export class Files {
  private _data: IFiles[];

  constructor(data?: IFiles[]) {
    if (data) this.validate(data);

    this._data =
      data?.map((doc) => ({
        size: doc.size ?? 0,
        content: doc.content ?? new File([], ""),
        name: doc.name ?? "",
        type: doc.type ?? "",
      })) || [];
  }

  public validate(data: IFiles[]) {
    data.forEach((doc) => {
      if (doc.size > 5 * 1024 * 1024) throw new Error("Arquivo maior que 5MB");
    });
  }

  get getFiles(): IFiles[] {
    return this._data;
  }

  public addFiles(files: IFiles): void {
    this._data.push(files);
  }
}
