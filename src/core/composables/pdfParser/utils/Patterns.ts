/**
 * Padrões regex reutilizáveis para extração de dados de PDFs
 * Organizados por tipo de dado e seguradora
 */

// ==================== PADRÕES COMUNS ====================

export const CommonPatterns = {
  // CPF em diferentes formatos
  cpf: [/CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i, /CPF[:\s]+(\d{11})/i],

  // RG em diferentes formatos
  rg: /RG[:\s]+(\d{1,2}\.?\d{3}\.?\d{3}-?\d{0,2})/i,

  // Data de nascimento
  birthday: /Data de nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i,

  // Email
  email: /Email[:\s]+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,

  // CEP
  cep: /CEP[:\s]+(\d{5}-?\d{3})/i,

  // UF (estados brasileiros)
  uf: /\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i,
} as const;

// ==================== PADRÕES HDI ====================

export const HdiPatterns = {
  // Indicadores de identificação
  indicators: [/HDI SEGUROS S\.A\./i, /HDI SEGUROS/i, /Hdi Auto Perfil/i, /www\.hdi\.com\.br/i],

  // Nome (seção principal)
  name: [
    /Nome de Registro do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
    /Nome Social do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome de Registro|CPF|$)/i,
    /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
  ],

  // Nome do Condutor (seção do condutor - fallback)
  condutorName: [
    /Condutor[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|Data|$)/i,
    /Nome Social do Condutor[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Condutor|CPF|$)/i,
  ],

  // CPF do Condutor (seção do condutor - fallback)
  condutorCpf: [
    /Condutor[:\s]+[A-ZÁÉÍÓÚÂÊÔÇ\s]+CPF[:\s]+(\d{11})/i,
    /Condutor[:\s]+[A-ZÁÉÍÓÚÂÊÔÇ\s]+CPF[:\s]+(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/i,
  ],

  // Data de nascimento do Condutor (seção do condutor - fallback)
  condutorBirthday: [
    /Data de Nasc\.?[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Data de Nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Condutor[:\s]+[A-ZÁÉÍÓÚÂÊÔÇ\s]+CPF[:\s]+\d+[:\s]+Data de Nasc\.?[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
  ],

  // Telefone/Celular
  phone: [
    /Celular[:\s]+\(?(\d{2,3})\)?\s*(\d{4,5}-?\d{4}|\d{8,9})/i,
    /Celular[:\s]+(\d{10,11})/i,
    /Telefone[:\s]+\(?(\d{2,3})\)?\s*(\d{4,5}-?\d{4})/i,
    /Telefone[:\s]+(\d{10,11})/i,
  ],

  // Endereço
  address: [
    /Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|Celular|$)/i,
    /Endereço[:\s]+(.+?)(?:\s+Bairro)/i,
  ],

  // Bairro
  bairro: [
    /Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s()]+?)(?:\s+CEP|Cidade|Celular|$)/i,
    /Bairro[:\s]+(.+?)(?:\s+Cidade)/i,
  ],

  // Cidade
  cidade: [
    /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)\s*-\s*([A-Z]{2})/i,
    /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|$)/i,
  ],

  // Apólice
  apolice: [/Apólice[:\s]+(\d{2}\.\d{3}\.\d{3}\.\d{6})/i, /Apólice[:\s]+(\d+)/i],

  // Vigência
  vigencia: [
    /Vigência[:\s]+das 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?às 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Vigência[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i,
  ],

  // Prêmio
  premio: [/Prêmio Total[:\s]+([\d.,]+)/i, /Prêmio total[:\s]+([\d.,]+)/i],
} as const;

// ==================== PADRÕES MAPFRE ====================

export const MapfrePatterns = {
  // Indicadores de identificação
  indicators: [/MAPFRE SEGUROS GERAIS/i, /MAPFRE/i, /Código na SUSEP:.*6238/i],

  // Nome (dentro da seção DADOS DO SEGURADO)
  name: /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome Social|Tipo|CPF|$)/i,

  // Telefone (dentro da seção DADOS DO SEGURADO)
  phone: [
    /DADOS DO SEGURADO[\s\S]*?Telefone\s+celular[:\s]+(\d{10,11})/i,
    /DADOS DO SEGURADO[\s\S]*?Telefone\s+residencial[:\s]+(\d{10,11})/i,
    /DADOS DO SEGURADO[\s\S]*?Telefone\s+comercial[:\s]+(\d{10,11})/i,
  ],

  // CPF (dentro da seção DADOS DO SEGURADO)
  cpf: /DADOS DO SEGURADO[\s\S]*?CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i,

  // Endereço (dentro da seção DADOS DO SEGURADO)
  address:
    /DADOS DO SEGURADO[\s\S]*?Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|$)/i,

  // Bairro (dentro da seção DADOS DO SEGURADO)
  bairro: /DADOS DO SEGURADO[\s\S]*?Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|Cidade|$)/i,

  // Cidade (dentro da seção DADOS DO SEGURADO)
  cidade: /DADOS DO SEGURADO[\s\S]*?Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|UF|$)/i,

  // CEP (dentro da seção DADOS DO SEGURADO)
  cep: /DADOS DO SEGURADO[\s\S]*?CEP[:\s]+(\d{5}-?\d{3})/i,

  // UF (dentro da seção DADOS DO SEGURADO)
  uf: /DADOS DO SEGURADO[\s\S]*?UF[:\s]+([A-Z]{2})/i,

  // Apólice
  apolice: /Nº Apólice[:\s]+(\d+)/i,

  // Vigência
  vigencia:
    /Vigência início 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?Término 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i,

  // Data de nascimento
  birthdayPatterns: /Data de nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i,

  // Prêmio
  premio: /Prêmio Total[:\s]+([\d.,]+)/i,
} as const;
