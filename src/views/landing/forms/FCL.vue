

<template>
  <v-form ref="Regform" lazy-validation class="mt-6 loginForm">

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
              v-model="dni_ruc_option"
              :items="DNI_RUC"
              density="compact"
              variant="filled"
              placeholder="DNI or RUC (As applicable)"
              label="DNI or RUC (As applicable)"
              auto-select-first
              item-title="name"
              item-value="name"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="12">
          <v-text-field
            v-model="dni_ruc_value"
            label="Enter your DNI or RUC"
            required
            density="compact"
            variant="filled"
            type="number"
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
          <v-autocomplete
              v-model="measurement_unit"
              :items="measurementUnits"
              class="mx-auto"
              density="compact"
              placeholder="Unidad de medida TEU"
              label="Unidad de medida TEU:"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="code"
              item-props
              hide-details="auto"
              return-object
            ></v-autocomplete>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="type_of_merchandise"
              :items="merchandiseTypes"
              class="mx-auto"
              density="compact"
              placeholder="Tipo de mercancía"
              label="Tipo de mercancía:"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="product_category_id"
              item-props
              hide-details="auto"
              return-object
            ></v-autocomplete>
        </v-col>
      
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-text-field
            v-model="invoice_price"
            density="compact"
            hide-details="auto"
            type="number"
            variant="filled"
            color="secondary"
            label="Precio de la factura (USD):"
          ></v-text-field>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="origin_port"
              :items="originPorts"
              class="mx-auto"
              density="compact"
              placeholder="Puerto de origen (POL)"
              label="Puerto de origen (POL)"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="code"
              item-props
              hide-details="auto"
              return-object
            ></v-autocomplete>
        </v-col>
      
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="first_import"
              :items="first_imports"
              class="mx-auto"
              density="compact"
              placeholder="Primera importación"
              label="Tipo de mercancía:"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="id"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="destination_location"
              :items="destinationLocations"
              class="mx-auto"
              density="compact"
              placeholder="Ubicación en Perú"
              label="Ubicación en Perú"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="zone_id"
              item-props
              hide-details="auto"
              return-object
            ></v-autocomplete>
        </v-col>
      
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="incoterm"
              :items="incoterms"
              class="mx-auto"
              density="compact"
              placeholder="Incoterm"
              label="Incoterm"
              theme="light"
              variant="filled"
              auto-select-first
              item-title="name"
              item-value="code"
              item-props
              hide-details="auto"
              return-object
            ></v-autocomplete>
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

// 
const downloadPdf = async () => {
  const formData = new FormData();
  
  formData.append('form_tab', '2');
  formData.append('guest_name', guest_name.value);
  formData.append('guest_email', guest_email.value);
  formData.append('guest_phone', guest_phone.value);
  formData.append('guest_address', guest_address.value);
  formData.append('dni_ruc_option', dni_ruc_option.value);
  formData.append('dni_or_ruc_value', dni_ruc_value.value);
  formData.append('invoice_price', invoice_price.value);
  if(first_import.value){
    formData.append('first_import', first_import.value.toString());
  }
  
  if (type_of_merchandise.value) {
    formData.append('type_of_merchandise', type_of_merchandise.value.product_category_id.toString());
    formData.append('type_of_merchandise_id', type_of_merchandise.value.id.toString());
    formData.append('type_of_merchandise_name', type_of_merchandise.value.name);
  }
  
  if (origin_port.value) {
    formData.append('origin_port', origin_port.value.id.toString());
    formData.append('origin_port_name', origin_port.value.name);
  }

  if (incoterm.value) {
    formData.append('incoterm', incoterm.value.id.toString());
    formData.append('incoterm_name', incoterm.value.name);
  }

  if (destination_location.value) {
    formData.append('destination_location', destination_location.value.zone_id);
    formData.append('destination_location_id', destination_location.value.id.toString());
    formData.append('destination_location_name', destination_location.value.name);
  }

  if (measurement_unit.value) {
    formData.append('measurement_unit', measurement_unit.value.id);
    formData.append('measurement_unit_code', measurement_unit.value.code);
    formData.append('measurement_unit_name', measurement_unit.value.name);
  }
  await postPdf('/shipping-quotes/create', formData);
  // const response = await postData<any>('/shipping-quotes/create', formData);
};

const getConstantsData = async () => {
  try {
    const response = await getData<any>('/get-constants');
    incoterms.value = response.incoterms;
    measurementUnits.value = response.measurementUnits;
    originPorts.value = response.originPorts;
    destinationLocations.value = response.destinationLocations;
    merchandiseTypes.value = response.merchandiseTypes;
  } catch (error) {
    console.error("Error fetching constants data:", error);
  }
};


interface Constant1 {
  id: string;
  code: string;
  name: string;
}

interface MerchandiseType {
  id: number;
  name: string;
  product_category_id: number;
  product_category_name: number;
}

interface DestinationLocation {
  id: number;
  name: string;
  zone_id: string;
  zone_name: string;
}

interface SettingItem {
  key: string;
  value: string;
}

const step = ref(1);
const guest_email = ref<string>('');
const guest_name = ref<string>('');
const guest_phone = ref<string>('');
const guest_address = ref<string>('');
const dni_ruc_option = ref<string>('');
const dni_ruc_value = ref<string>('');
const DNI_RUC = ref([
  {id: 1, name: 'DNI'},
  {id: 2, name: 'RUC'},
]);


const invoice_price = ref<string>('');
const type_of_merchandise = ref<MerchandiseType | null>(null);
const first_import = ref<Constant1 | null>(null);
const origin_port = ref<Constant1 | null>(null);
const incoterm = ref<Constant1 | null>(null);
const destination_location = ref<DestinationLocation | null>(null);
const measurement_unit = ref<Constant1 | null>(null);

const incoterms = ref<Constant1[]>([]);
const measurementUnits = ref<Constant1[]>([]);
const originPorts = ref<Constant1[]>([]);
const destinationLocations = ref<DestinationLocation[]>([]);
const merchandiseTypes = ref<DestinationLocation[]>([]);

const first_imports = ref<Constant1[]>([
  {id: 1, name: 'SI', code: ''},
  {id: 2, name: 'NO', code: ''},
]);

const Regform = ref();
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate() {
  Regform.value.validate();
}


onMounted(() => {
  getConstantsData();
});
</script>


<style>
.v-field--variant-filled .v-field__overlay{
  background: none;
  border-radius: 3px;
}
</style>