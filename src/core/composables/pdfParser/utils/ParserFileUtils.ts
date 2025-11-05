export default function ParserFileUtils() {
  const namePatterns = [
    /Nome de Registro do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
    /Nome Social do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome de Registro|CPF|$)/i,
    /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
  ];

  const phonePatterns = [
    // Formato: Celular: (011)976421351 ou Celular: (011) 976421351
    /Celular[:\s]+\(?(\d{2,3})\)?\s*(\d{4,5}-?\d{4}|\d{8,9})/i,
    // Formato: Celular: 11976421351 (sem parênteses)
    /Celular[:\s]+(\d{10,11})/i,
    // Formato: Telefone: (011) 97642-1351
    /Telefone[:\s]+\(?(\d{2,3})\)?\s*(\d{4,5}-?\d{4})/i,
    // Formato: Telefone: 11976421351
    /Telefone[:\s]+(\d{10,11})/i,
  ];

  const cpfPatterns = [/CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i, /CPF[:\s]+(\d{11})/i];

  const rgPattern = /RG[:\s]+(\d{1,2}\.?\d{3}\.?\d{3}-?\d{0,2})/i;

  const birthdayPattern = /Data de nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i;

  const addressPatterns = [
    /Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|Celular|$)/i,
    /Endereço[:\s]+(.+?)(?:\s+Bairro)/i,
  ];

  const bairroPatterns = [
    /Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s()]+?)(?:\s+CEP|Cidade|Celular|$)/i,
    /Bairro[:\s]+(.+?)(?:\s+Cidade)/i,
  ];

  const cidadePatterns = [
    /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)\s*-\s*([A-Z]{2})/i,
    /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|$)/i,
  ];

  const cepPattern = /CEP[:\s]+(\d{5}-?\d{3})/i;

  const ufPattern =
    /\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i;

  const emailPattern = /Email[:\s]+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;

  const apolicePatterns = [/Apólice[:\s]+(\d{2}\.\d{3}\.\d{3}\.\d{6})/i, /Apólice[:\s]+(\d+)/i];

  const vigenciaPatterns = [
    /Vigência[:\s]+das 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?às 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    /Vigência[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i,
  ];

  const premioPatterns = [/Prêmio Total[:\s]+([\d.,]+)/i, /Prêmio total[:\s]+([\d.,]+)/i];

  const mpafre = {
    namePatterns: /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome Social|Tipo|CPF|$)/i,
    phonePatterns: [
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+celular[:\s]+(\d{10,11})/i,
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+residencial[:\s]+(\d{10,11})/i,
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+comercial[:\s]+(\d{10,11})/i,
    ],
    cpfPatterns: /DADOS DO SEGURADO[\s\S]*?CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i,
    birthdayPatterns: /Data de nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    addressPatterns:
      /DADOS DO SEGURADO[\s\S]*?Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|$)/i,
    bairroPatterns: /DADOS DO SEGURADO[\s\S]*?Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|Cidade|$)/i,
    cidadePatterns: /DADOS DO SEGURADO[\s\S]*?Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|UF|$)/i,
    cepPattern: /DADOS DO SEGURADO[\s\S]*?CEP[:\s]+(\d{5}-?\d{3})/i,
    ufPattern: /DADOS DO SEGURADO[\s\S]*?UF[:\s]+([A-Z]{2})/i,
    apolicePatterns: /Nº Apólice[:\s]+(\d+)/i,
    vigenciaPatterns:
      /Vigência início 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?Término 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
    premioPatterns: premioPatterns[0],
  };

  const hdi = {
    namePatterns: namePatterns,
    phonePatterns: phonePatterns,
    cpfPatterns: cpfPatterns,
    birthdayPatterns: birthdayPattern,
    addressPatterns: addressPatterns,
    bairroPatterns: bairroPatterns,
    cidadePatterns: cidadePatterns,
    cepPattern: cepPattern,
    ufPattern: ufPattern,
    emailPattern: emailPattern,
    apolicePatterns: apolicePatterns,
    vigenciaPatterns: vigenciaPatterns,
    premioPatterns: premioPatterns,
  };

  return {
    phonePatterns,
    namePatterns,
    cpfPatterns,
    rgPattern,
    birthdayPattern,
    addressPatterns,
    bairroPatterns,
    cidadePatterns,
    cepPattern,
    ufPattern,
    emailPattern,
    apolicePatterns,
    vigenciaPatterns,
    premioPatterns,
    mpafre,
    hdi,
  };
}
