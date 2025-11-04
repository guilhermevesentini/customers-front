# PDF Parser - Sistema Modular de Parsing por Seguradora

Este módulo implementa um sistema extensível para extrair dados de clientes a partir de PDFs de apólices de seguro, usando **Design Patterns** para garantir código limpo e manutenível.

## 🏗️ Arquitetura

### Design Patterns Utilizados

1. **Strategy Pattern**: Cada seguradora tem sua própria estratégia de parsing
2. **Factory Pattern**: Factory cria o parser adequado automaticamente
3. **Template Method Pattern**: Classe base define estrutura comum
4. **Open/Closed Principle**: Fácil adicionar novas seguradoras sem modificar código existente

## 📁 Estrutura de Pastas

```
pdfParser/
├── interfaces/
│   └── ISeguradoraParser.ts      # Interface base para parsers
├── base/
│   └── BaseSeguradoraParser.ts   # Classe base abstrata
├── factories/
│   └── SeguradoraParserFactory.ts # Factory para criar parsers
├── mapfre/
│   └── MapfreParser.ts           # Parser específico da Mapfre
└── PdfParser.ts                  # Orquestrador principal
```

## 🚀 Como Adicionar uma Nova Seguradora

### Passo 1: Criar pasta da seguradora

```bash
mkdir src/core/composables/pdfParser/portoseguro
```

### Passo 2: Criar o parser

```typescript
// src/core/composables/pdfParser/portoseguro/PortoSeguroParser.ts
import { BaseSeguradoraParser } from "../base/BaseSeguradoraParser";
import type { IClient } from "@/modules/Clients/@types/types";

export class PortoSeguroParser extends BaseSeguradoraParser {
  canParse(text: string, fileName: string): boolean {
    // Identificar se é Porto Seguro
    return /PORTO SEGURO/i.test(text) || 
           /Código SUSEP.*6239/i.test(text);
  }

  parse(text: string, fileName: string): Partial<IClient> {
    const clientData = this.createBaseClientData();
    
    // Implementar lógica específica da Porto Seguro
    // ...
    
    return clientData;
  }
}
```

### Passo 3: Registrar no Factory

```typescript
// src/core/composables/pdfParser/factories/SeguradoraParserFactory.ts
import { PortoSeguroParser } from "../portoseguro/PortoSeguroParser";

export class SeguradoraParserFactory {
  private static parsers: ISeguradoraParser[] = [
    new MapfreParser(),
    new PortoSeguroParser(), // ← Adicionar aqui
  ];
  // ...
}
```

**Pronto!** O sistema agora identifica e processa PDFs da Porto Seguro automaticamente.

## 🔍 Como Funciona

1. **Extração de Texto**: `extractTextFromPdf()` extrai o texto do PDF
2. **Identificação**: `SeguradoraParserFactory.getParser()` identifica a seguradora
3. **Parsing**: O parser específico extrai os dados do cliente
4. **Fallback**: Se nenhuma seguradora for identificada, usa parser genérico

## 📝 Exemplo de Uso

```typescript
import { processPdfToClient } from "@/core/composables/pdfParser/PdfParser";

const pdfFile: IFiles = {
  name: "Apolice_123456_joao-silva.pdf",
  content: "data:application/pdf;base64,...",
  size: 12345,
  type: "application/pdf"
};

const clientData = await processPdfToClient(pdfFile);
// clientData contém todos os dados extraídos do PDF
```

## ✨ Benefícios

- ✅ **Separação de Responsabilidades**: Cada seguradora tem seu próprio parser
- ✅ **Extensibilidade**: Adicionar novas seguradoras é simples
- ✅ **Manutenibilidade**: Código organizado e fácil de manter
- ✅ **Testabilidade**: Cada parser pode ser testado isoladamente
- ✅ **Type Safety**: TypeScript garante tipagem correta

## 🎯 Princípios SOLID Aplicados

- **S**ingle Responsibility: Cada parser tem uma única responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Parsers podem ser substituídos via interface
- **I**nterface Segregation: Interface simples e focada
- **D**ependency Inversion: Depende de abstrações (ISeguradoraParser)

