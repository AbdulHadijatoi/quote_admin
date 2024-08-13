<template>
  <v-form ref="Regform" lazy-validation class="loginForm mt-6">

    <!-- STEP#1 FIELDS -->
    <template v-if="step === 1">
      <v-row>
        <v-col style="padding: 5px; margin: 0px" cols="6">
          <v-text-field
            v-model="guest_name"
            label="Full Name or Company Name"
            required
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
          ></v-text-field>
        </v-col>
    
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              :items="DNI_RUC"
              density="compact"
              variant="filled"
              placeholder="DNI or RUC (As applicable)"
              label="DNI or RUC (As applicable)"
              auto-select-first
              item-title="name"
              item-value="id"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
        <v-col style="padding: 5px" cols="12">
          <v-text-field
            v-model="dni_or_ruc_value"
            label="Enter your DNI or RUC"
            required
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
          ></v-text-field>
        </v-col>
     
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="guest_email"
            :rules="emailRules"
            label="Email Address / Username"
            required
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
          ></v-text-field>
        </v-col>
        
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="guest_phone"
            label="Enter your phone number"
            required
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
          ></v-text-field>
        </v-col>
  
        <v-col style="padding: 5px;" cols="12">
          <v-text-field
            v-model="guest_address"
            label="Enter your address"
            required
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>

    <!-- STEP#2 FIELDS -->
    <template v-else-if="step === 2">
      <v-row>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="volume"
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
            label="Volumen de la carga (m3)"
          ></v-text-field>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="first_import"
              :items="first_imports"
              density="compact"
              variant="filled"
              placeholder="Primera importación"
              label="Primera importación"
              auto-select-first
              item-title="name"
              item-value="id"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
     
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="total_weight"
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
            label="Precio de la factura (USD)"
          ></v-text-field>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="origin_port"
              :items="originPorts"
              density="compact"
              variant="filled"
              placeholder="Puerto de origen (POL)"
              label="Puerto de origen (POL)"
              auto-select-first
              item-title="name"
              item-value="code"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
    
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="invoice_price"
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
            label="Primera importación"
          ></v-text-field>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="incoterm"
              :items="incoterms"
              density="compact"
              variant="filled"
              placeholder="Incoterm"
              label="Incoterm"
              auto-select-first
              item-title="name"
              item-value="code"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
    
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="type_of_merchandise"
              :items="merchandiseTypes"
              density="compact"
              variant="filled"
              placeholder="Tipo Mercancia"
              label="Tipo Mercancia"
              auto-select-first
              item-title="name"
              item-value="id"
              hide-details="auto"
              item-props
            ></v-autocomplete>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="destination_location"
              :items="destinationLocations"
              density="compact"
              variant="filled"
              placeholder="Ubicación en Perú"
              label="Ubicación en Perú"
              auto-select-first
              item-title="name"
              item-value="id"
              hide-details="auto"
              item-props
            />
        </v-col>
      </v-row>
    </template>

    <v-row justify="space-between" class="mt-4">
      <v-col cols="6" v-if="step === 2">
        <v-btn color="secondary" block variant="flat" size="large" @click="step--">Back</v-btn>
      </v-col>
      <v-col cols="12" v-if="step === 1">
        <v-btn color="secondary" block variant="flat" size="large" @click="step++">Next</v-btn>
      </v-col>
      <v-col cols="6" v-if="step === 2">
        <v-btn color="secondary" block variant="flat" size="large" @click="downloadPdf()">Calcular</v-btn>
      </v-col>
    </v-row>

  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getData, postData, getPdf, postPdf } from '@/utils/api';

const downloadPdf = async () => {
  const formData = new FormData();
  
  formData.append('guest_name', guest_name.value);
  formData.append('guest_email', guest_email.value);
  formData.append('guest_phone', guest_phone.value);
  formData.append('guest_address', guest_address.value);
  formData.append('dni_or_ruc_value', dni_or_ruc_value.value);
  formData.append('volume', volume.value);
  formData.append('total_weight', total_weight.value);
  formData.append('first_import', first_import.value);
  formData.append('type_of_merchandise', type_of_merchandise.value);
  formData.append('origin_port', origin_port.value);
  formData.append('incoterm', incoterm.value);
  formData.append('destination_location', destination_location.value);
  
  await postPdf('/shipping-quotes/create', formData);
};

const getConstantsData = async () => {
  try {
    const response = await getData<any>('/get-constants');
    incoterms.value = response.incoterms;
    originPorts.value = response.originPorts;
    destinationLocations.value = response.destinationLocations;
    merchandiseTypes.value = response.merchandiseTypes;
  } catch (error) {
    console.error("Error fetching constants data:", error);
  }
};

const step = ref(1);
const guest_email = ref('');
const guest_name = ref('');
const guest_phone = ref('');
const guest_address = ref('');
const dni_or_ruc_value = ref('');
const DNI_RUC = ref([
  {id: 1, name: 'DNI'},
  {id: 2, name: 'RUC'},
]);

const volume = ref('');
const total_weight = ref('');
const invoice_price = ref('');
const type_of_merchandise = ref('');
const first_import = ref('');
const origin_port = ref('');
const incoterm = ref('');
const destination_location = ref('');

const first_imports = ref([
  {id: 1, name: 'SI'},
  {id: 2, name: 'NO'},
]);

const incoterms = ref([]);
const originPorts = ref([]);
const destinationLocations = ref([]);
const merchandiseTypes = ref([]);


const Regform = ref();
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);


onMounted(() => {
  getConstantsData();
});

function validate() {
  Regform.value.validate();
}
</script>

<style>
.v-field--variant-filled .v-field__overlay{
  background: none;
  border-radius: 3px;
}
</style>