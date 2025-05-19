<template>
  <v-card class="mb-5" title="Automobile Risk Questionnaire">
    <v-form v-model="valid" lazy-validation>
      <v-container v-if="form">
        <v-row>
          <!-- LOCAL DE PERNOITE -->
          <v-col cols="12">
            <h3>Pernoite</h3>
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.hasGarage"
              :items="['Sim', 'Não']"
              label="O veículo dorme em garagem fechada?"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.parkingLocation"
              :items="['Residência', 'Empresa', 'Via pública']"
              label="Local onde o veículo pernoita"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              v-model="form.riskProfile.vehicleCount"
              label="Quantos veículos dormem no local?"
              required
              type="number"
            />
          </v-col>
          <v-col cols="12" md="6">
            <Switch v-model="form.riskProfile.hasSecurity" label="Há segurança ou vigilância 24h?"/>
          </v-col>

          <!-- CONDUTOR -->
          <v-col cols="12">
            <h3>Condutor Principal</h3>
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              v-model="form.riskProfile.driverAge"
              label="Idade do condutor principal"
              required
              type="number"
            />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.driverGender"
              :items="['Masculino', 'Feminino', 'Outro']"
              label="Sexo"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.maritalStatus"
              :items="['Solteiro', 'Casado', 'Divorciado', 'Viúvo']"
              label="Estado civil"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <Switch v-model="form.riskProfile.hasMinorChildren" label="Possui filhos menores de 18 anos?"/>
          </v-col>

          <!-- USO DO VEÍCULO -->
          <v-col cols="12">
            <h3>Uso do Veículo</h3>
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.vehicleUse"
              :items="['Trabalho', 'Passeio', 'Aplicativo', 'Frotista']"
              label="Utilização do veículo"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.hasYoungDriver"
              :items="['Sim', 'Não']"
              label="Alguém com menos de 26 anos dirige o veículo?"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              v-model="form.riskProfile.weeklyUse"
              label="Quantos dias por semana usa o carro?"
              required
              type="number"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              v-model="form.riskProfile.kmPerMonth"
              label="Quantos km em média por mês?"
              required
              type="number"
            />
          </v-col>

          <!-- COBERTURA -->
          <v-col cols="12">
            <h3>Cobertura Desejada</h3>
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.coverageType"
              :items="['Completa', 'Roubo e furto', 'Incêndio', 'Terceiros']"
              label="Tipo de cobertura"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <Select
              v-model="form.riskProfile.franchiseType"
              :items="['Reduzida', 'Normal', 'Ampliada']"
              label="Tipo de franquia"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <Switch v-model="form.riskProfile.wantsAssistance" label="Assistência 24h"/>
          </v-col>
          <v-col cols="12" md="4">
            <Switch v-model="form.riskProfile.wantsReserveCar" label="Carro reserva"/>
          </v-col>
          <v-col cols="12" md="4">
            <Switch v-model="form.riskProfile.wantsGlassCoverage" label="Cobertura de vidros" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
  import type { IClient } from '@/modules/Clients/interfaces/IClient';
  import InputText from '@/shared/components/ui/inputs/InputText.vue';
  import Select from '@/shared/components/ui/selects/Select.vue';
import Switch from '@/shared/components/ui/switches/Switch.vue';
  import { ref } from 'vue'
  
  const valid = ref(false)

  const form = inject<IClient>('clientForm')
</script>
