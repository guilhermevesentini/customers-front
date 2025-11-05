import type { IClient, IProduct } from "@/modules/Clients/@types/types";
import type { ISeguradoraParser } from "../interfaces/ISeguradoraParser";
import { EStatus, tipoOpt } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";

/**
 * Classe base abstrata para parsers de seguradoras
 * Template Method Pattern: define a estrutura comum do parsing
 */
export abstract class BaseSeguradoraParser implements ISeguradoraParser {
  /**
   * Cria a estrutura base de dados do cliente
   */
  protected createBaseClientData(): Partial<IClient> {
    return {
      details: {
        name: "",
        cpf: "",
        rg: "",
        phone: "",
        birthday: "",
        status: EStatus.pending,
        email: "",
      },
      address: {
        address: "",
        number: "",
        complement: "",
        city: "",
        state: "",
        zipcode: "",
      },
      products: [],
      documents: [],
    };
  }

  /**
   * Extrai nome do arquivo (formato comum: Apolice_XXXXX_nome-cliente.pdf)
   */
  protected extractNameFromFileName(fileName: string): string | null {
    const fileNameMatch = fileName.match(/Apolice_([^_]+)_(.+)\.pdf/i);
    if (fileNameMatch && fileNameMatch[2]) {
      return fileNameMatch[2]
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
    return null;
  }

  /**
   * Cria um produto básico a partir do número da apólice
   */
  protected createProductFromApoliceNumber(
    apoliceNumber: string,
    clientName?: string,
    company?: string,
  ): IProduct {
    return createProductData(
      {
        tipo: tipoOpt.find((tipo) => tipo.title === "Automóvel")?.value || "",
        description: `Apólice ${apoliceNumber}`,
        status: EStatus.active,
        company: company || "0",
      } as IProduct,
      clientName || "",
    );
  }

  /**
   * Métodos abstratos que devem ser implementados pelas classes filhas
   */
  abstract canParse(text: string, fileName: string): boolean;
  abstract parse(text: string, fileName: string): Partial<IClient>;
}
