

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
        <v-col style="padding: 5px" cols="12" sm="12">
          <v-text-field
            v-model="dni_ruc_value"
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
          <v-autocomplete
              v-model="measurement_unit"
              :items="unit_of_measurements"
              class="mx-auto"
              density="compact"
              placeholder="Unidad de medida TEU"
              label="Unidad de medida TEU:"
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
              v-model="type_of_merchandise"
              :items="type_of_merchandises"
              class="mx-auto"
              density="compact"
              placeholder="Tipo de mercancía"
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
          <v-text-field
            v-model="total_weight"
            density="compact"
            hide-details="auto"
            variant="filled"
            color="secondary"
            label="Precio de la factura (USD):"
          ></v-text-field>
        </v-col>
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="origin_port"
              :items="port_of_origins"
              class="mx-auto"
              density="compact"
              placeholder="Puerto de origen (POL)"
              label="Puerto de origen (POL)"
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
              :items="destination_locations"
              class="mx-auto"
              density="compact"
              placeholder="Ubicación en Perú"
              label="Ubicación en Perú"
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
              item-value="id"
              item-props
              hide-details="auto"
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
        <v-btn color="secondary" block variant="flat" size="large" @click="validate()">Calcular</v-btn>
      </v-col>
    </v-row>
  </v-form>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getData, postData, getPdf, postPdf } from '@/utils/api';

const step = ref(1);
const guest_email = ref('');
const guest_name = ref('');
const guest_phone = ref('');
const guest_address = ref('');
const dni_ruc_value = ref('');
const DNI_RUC = ref([
  {id: 1, name: 'DNI'},
  {id: 2, name: 'RUC'},
]);


const total_weight = ref('');
const type_of_merchandise = ref('');
const first_import = ref('');
const origin_port = ref('');
const incoterm = ref('');
const destination_location = ref('');
const measurement_unit = ref('');

const unit_of_measurements = ref([
  {id: '20', name: '20 ST'},
  {id: '40', name: '40 ST/HQ'},
  {id: '40', name: '40 NOR'},
]);

const first_imports = ref([
  {id: 1, name: 'SI'},
  {id: 2, name: 'NO'},
]);

const incoterms = ref([
  {id: 'FOB', name: 'FOB'}
]);

const type_of_merchandises = ref([
  { id: 1, name: 'Tractores agricolas' },
  { id: 1, name: 'Maquinaria de linea amarilla' },
  { id: 1, name: 'Maquina cnc láser' },
  { id: 1, name: 'Maquina de construccion' },
  { id: 1, name: 'Bordadora computarizada' },
  { id: 1, name: 'Tornos' },
  { id: 1, name: 'Plataforma elevadora autopropulsada' },
  { id: 1, name: 'Demas maquina metalmecánica' },
  { id: 1, name: 'Demas maquinas agricolas' },
  { id: 1, name: 'Martillo hidraulico' },
  { id: 1, name: 'Maquinas tejedoras' },
  { id: 1, name: 'Maquina sopladora de botella' },
  { id: 1, name: 'Maquina de inyección' },
  { id: 1, name: 'Maquina Paletizadora' },
  { id: 1, name: 'Montacarga' },
  { id: 1, name: 'Maquinas para melamina' },
  { id: 1, name: 'Maquinas para mineria' },

  { id: 2, name: 'Medias y ropa interior' },
  { id: 2, name: 'Sabanas' },
  { id: 2, name: 'Telas' },
  { id: 2, name: 'ropa en general' },
  { id: 2, name: 'zapatillas de capellada textil' },
  { id: 2, name: 'Edredones' },
  { id: 2, name: 'Otros textiles' },

  { id: 3, name: 'Articulos plasticos y su manufacturas' },
  { id: 3, name: 'Moldes de silicona' },
  { id: 3, name: 'Articulos de vidrio y su manufacturas' },
  { id: 3, name: 'papeleria' },
  { id: 3, name: 'manualidades y derivados ' },
  { id: 3, name: 'cera de soya' },
  { id: 3, name: 'Hilos' },
  { id: 3, name: 'Maquina de coser' },
  { id: 3, name: 'pantallas Led' },
  { id: 3, name: 'Tv' },
  { id: 3, name: 'Llantas' },
  { id: 3, name: 'Porcelanato' },
  { id: 3, name: 'Cuchillas para cortar' },
  { id: 3, name: 'accesorios para celular' },
  { id: 3, name: 'Tuberias de gas y accesorios' },
  { id: 3, name: 'Cerraduras' },
  { id: 3, name: 'Articulos de librería' },
  { id: 3, name: 'accesorios para coches' },
  { id: 3, name: 'Maquina de produccion de hielo' },
  { id: 3, name: 'Repuestos de maquinaria , coches , motos' },
  { id: 3, name: 'Rodajes' },
  { id: 3, name: 'manufacturas de metales ' },
  { id: 3, name: 'Demas auriculares' },
  { id: 3, name: 'electrodos de soldadura' },
  { id: 3, name: 'Imanes' },
  { id: 3, name: 'Perfiles' },
  { id: 3, name: 'Articulos deportivos' },
  { id: 3, name: 'Maquinas de soldadura' },
  { id: 3, name: 'carritos a bateria' },
  { id: 3, name: 'Motocicletas' },
  { id: 3, name: 'Cuatrimotos' },
  { id: 3, name: 'Maquina cnc chorro plasma' },
  { id: 3, name: 'otros productos en general' },
]);

const port_of_origins = ref([
  { id: 'QINGDAO', name: 'Qingdao - (QINGDAO)'},
  { id: 'SHENZHEN', name: 'Shenzhen - (SHENZHEN)'},
  { id: 'SHANGHAI', name: 'Shanghai - (SHANGHAI)'},
  { id: 'NINGBO', name: 'Ningbo - (NINGBO)'},
]);

const destination_locations = ref([
  { id: 1, name: 'Callao'},
  { id: 1, name: 'Carmen de La Legua'},
  { id: 1, name: 'San Miguel'},
  { id: 1, name: 'La Perla'},
  { id: 1, name: 'Bellavista'},
  { id: 1, name: 'La Punta'},
  { id: 2, name: 'Magdalena'},
  { id: 2, name: 'Pueblo Libre'},
  { id: 2, name: 'Lince'},
  { id: 2, name: 'Cercado de Lima'},
  { id: 2, name: 'Breña'},
  { id: 2, name: 'Jesús María'},
  { id: 2, name: 'La Victoria'},
  { id: 2, name: 'San Martin de Porres'},
  { id: 2, name: 'Independencia'},
  { id: 2, name: 'Rímac'},
  { id: 2, name: 'Los Olivos'},
  { id: 2, name: 'Pro'},
  { id: 3, name: 'Ventanilla'},
  { id: 3, name: 'San Isidro'},
  { id: 3, name: 'San Borja'},
  { id: 3, name: 'San Luis'},
  { id: 3, name: 'Miraflores'},
  { id: 3, name: 'Surquillo'},
  { id: 3, name: 'Barranco'},
  { id: 3, name: 'Surco'},
  { id: 3, name: 'Ate'},
  { id: 3, name: 'Sta. Clara'},
  { id: 3, name: 'Comas'},
  { id: 3, name: 'Puente Piedra'},
  { id: 3, name: 'El Agustino'},
  { id: 3, name: 'Santa Anita'},
  { id: 3, name: 'San Juan de Lurigancho'},
  { id: 4, name: 'Ancón'},
  { id: 4, name: 'Chorrillos'},
  { id: 4, name: 'Villa El Salvador'},
  { id: 4, name: 'Villa Maria del Triunfo'},
  { id: 4, name: 'San Juan de Miraflores'},
  { id: 4, name: 'Carabayllo'},
  { id: 4, name: 'La Molina'},
  { id: 4, name: 'Cajamarquilla'},
  { id: 5, name: 'Lurín'},
  { id: 5, name: 'Pachacamac'},
  { id: 5, name: 'Chosica'},
  { id: 5, name: 'Huarochiri'},
  { id: 5, name: 'Huachipa'},
]);

const Regform = ref();
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

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