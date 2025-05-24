import type { IClient } from "@/modules/Clients/interfaces/IClient";
import type { IProduct } from "@/modules/Clients/interfaces/IProducts";

function generateClients(): IClient[] {
  const clients: IClient[] = [];
  const possibleStatus = ["1", "2", "3"];
  const currentYear = new Date().getFullYear();

  let clientIdCounter = 1;

  // Alterado de month = 0 a month = -1 para incluir janeiro
  for (let month = -1; month < 12; month++) {
    const clientsCount = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

    for (let i = 0; i < clientsCount; i++) {
      const endDate = new Date(currentYear, month + 1, 15 + i); // Ajustado para mês correto

      const policiesCount = Math.floor(Math.random() * 5) + 1;
      const policies: IProduct[] = [];

      for (let p = 0; p < policiesCount; p++) {
        const tipo = `${Math.floor(Math.random() * 7) + 1}`;
        const company = `${Math.floor(Math.random() * 5) + 1}`;
        const price = Math.floor(Math.random() * 1000) + 300;
        const status = possibleStatus[Math.floor(Math.random() * possibleStatus.length)];
        const start = new Date(currentYear, month + 1, Math.floor(Math.random() * 28) + 1); // Ajustado
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);

        policies.push({
          tipo,
          company,
          description: `Apólice ${p + 1} do Cliente ${clientIdCounter}`,
          start: start.toISOString(),
          end: end.toISOString(),
          price,
          status,
          files: [],
        });
      }

      clients.push({
        id: `client-${clientIdCounter}-${Math.random().toString(36).slice(2, 9)}`,
        createdAt: new Date(Date.now() - clientIdCounter * 86400000),
        details: {
          name: `Cliente Mock ${clientIdCounter}`,
          cpf: `000.000.000-0${clientIdCounter % 10}`,
          rg: `11.111.111-${clientIdCounter}`,
          email: `client${clientIdCounter}@email.com`,
          phone: `(11) 90000-00${clientIdCounter < 10 ? "0" + clientIdCounter : clientIdCounter}`,
          birthday: `19${70 + (clientIdCounter % 30)}-0${(clientIdCounter % 9) + 1}-15`,
          status: possibleStatus[clientIdCounter % possibleStatus.length],
        },
        address: {
          address: `Rua Exemplo ${clientIdCounter}`,
          number: `${100 + clientIdCounter}`,
          complement: `Apto ${clientIdCounter + 1}`,
          city: clientIdCounter % 2 === 0 ? "São Paulo" : "Rio de Janeiro",
          state: clientIdCounter % 2 === 0 ? "SP" : "RJ",
          zipcode: `01${(clientIdCounter % 90) + 10}00-0${clientIdCounter}`,
        },
        documents: [],
        products: policies,
        riskProfile: {
          driverAge: `${25 + (clientIdCounter % 40)}`,
          driverGender: clientIdCounter % 2 === 0 ? "Masculino" : "Feminino",
          maritalStatus: clientIdCounter % 3 === 0 ? "Casado" : "Solteiro",
          hasGarage: clientIdCounter % 3 === 0 ? "Sim" : "Não",
          hasMinorChildren: clientIdCounter % 4 === 0,
          hasSecurity: clientIdCounter % 5 === 0,
          hasYoungDriver: clientIdCounter % 7 === 0 ? "Sim" : "",
          wantsGlassCoverage: clientIdCounter % 4 === 0,
          wantsReserveCar: clientIdCounter % 3 !== 0,
          wantsAssistance: clientIdCounter % 2 === 0,
          franchiseType: clientIdCounter % 2 === 0 ? "Reduzida" : "Completa",
          kmPerMonth: `${800 + clientIdCounter * 25}`,
          vehicleCount: clientIdCounter % 3,
          vehicleUse: clientIdCounter % 2 === 0 ? "Trabalho" : "Lazer",
          parkingLocation: clientIdCounter % 2 === 0 ? "Garagem coberta" : "Na rua",
          weeklyUse: clientIdCounter % 4 === 0 ? "Diariamente" : "Fins de semana",
          coverageType: clientIdCounter % 3 === 0 ? "Completa" : "Parcial",
        },
      });

      clientIdCounter++;
    }
  }

  return clients;
}

export const mockClient = generateClients();
