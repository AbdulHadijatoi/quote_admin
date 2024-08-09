<template>
  <v-form ref="Regform" lazy-validation class="loginForm mt-6">

    <!-- STEP#1 FIELDS -->
    <template v-if="step === 1">
      <v-row>
        <v-col style="padding: 5px; margin: 0px" cols="6">
          <v-text-field
            v-model="full_name"
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
            v-model="email"
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
            v-model="phone"
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
            v-model="address"
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
              v-model="port_of_origin"
              :items="port_of_origins"
              density="compact"
              variant="filled"
              placeholder="Puerto de origen (POL)"
              label="Puerto de origen (POL)"
              auto-select-first
              item-title="name"
              item-value="id"
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
              item-value="id"
              item-props
              hide-details="auto"
            ></v-autocomplete>
        </v-col>
    
        <v-col style="padding: 5px" cols="12" sm="6">
          <v-autocomplete
              v-model="type_of_merchandise"
              :items="type_of_merchandises"
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
          <v-text-field
            v-model="destination_location"
            density="compact"
            variant="filled"
            hide-details="auto"
            color="secondary"
            label="Ubicación en Perú"
          ></v-text-field>
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

const step = ref(1);
const email = ref('');
const full_name = ref('');
const phone = ref('');
const address = ref('');
const dni_ruc_value = ref('');
const DNI_RUC = ref([
  {id: 1, name: 'DNI'},
  {id: 2, name: 'RUC'},
]);

const volume = ref('');
const total_weight = ref('');
const invoice_price = ref('');
const type_of_merchandise = ref('');
const first_import = ref('');
const port_of_origin = ref('');
const incoterm = ref('');
const destination_location = ref('');

const first_imports = ref([
  {id: 'SI', name: 'SI'},
  {id: 'NO', name: 'NO'},
]);

const incoterms = ref([
  {id: 'FOB', name: 'FOB'}
]);

const type_of_merchandises = ref([
  { id: "Maquinaria", name: 'Tractores agricolas' },
  { id: "Maquinaria", name: 'Maquinaria de linea amarilla' },
  { id: "Maquinaria", name: 'Maquina cnc láser' },
  { id: "Maquinaria", name: 'Maquina de construccion' },
  { id: "Maquinaria", name: 'Bordadora computarizada' },
  { id: "Maquinaria", name: 'Tornos' },
  { id: "Maquinaria", name: 'Plataforma elevadora autopropulsada' },
  { id: "Maquinaria", name: 'Demas maquina metalmecánica' },
  { id: "Maquinaria", name: 'Demas maquinas agricolas' },
  { id: "Maquinaria", name: 'Martillo hidraulico' },
  { id: "Maquinaria", name: 'Maquinas tejedoras' },
  { id: "Maquinaria", name: 'Maquina sopladora de botella' },
  { id: "Maquinaria", name: 'Maquina de inyección' },
  { id: "Maquinaria", name: 'Maquina Paletizadora' },
  { id: "Maquinaria", name: 'Montacarga' },
  { id: "Maquinaria", name: 'Maquinas para melamina' },
  { id: "Maquinaria", name: 'Maquinas para mineria' },

  { id: "Productos textiles", name: 'Medias y ropa interior' },
  { id: "Productos textiles", name: 'Sabanas' },
  { id: "Productos textiles", name: 'Telas' },
  { id: "Productos textiles", name: 'ropa en general' },
  { id: "Productos textiles", name: 'zapatillas de capellada textil' },
  { id: "Productos textiles", name: 'Edredones' },
  { id: "Productos textiles", name: 'Otros textiles' },

  { id: "Mercancia general", name: 'Articulos plasticos y su manufacturas' },
  { id: "Mercancia general", name: 'Moldes de silicona' },
  { id: "Mercancia general", name: 'Articulos de vidrio y su manufacturas' },
  { id: "Mercancia general", name: 'papeleria' },
  { id: "Mercancia general", name: 'manualidades y derivados ' },
  { id: "Mercancia general", name: 'cera de soya' },
  { id: "Mercancia general", name: 'Hilos' },
  { id: "Mercancia general", name: 'Maquina de coser' },
  { id: "Mercancia general", name: 'pantallas Led' },
  { id: "Mercancia general", name: 'Tv' },
  { id: "Mercancia general", name: 'Llantas' },
  { id: "Mercancia general", name: 'Porcelanato' },
  { id: "Mercancia general", name: 'Cuchillas para cortar' },
  { id: "Mercancia general", name: 'accesorios para celular' },
  { id: "Mercancia general", name: 'Tuberias de gas y accesorios' },
  { id: "Mercancia general", name: 'Cerraduras' },
  { id: "Mercancia general", name: 'Articulos de librería' },
  { id: "Mercancia general", name: 'accesorios para coches' },
  { id: "Mercancia general", name: 'Maquina de produccion de hielo' },
  { id: "Mercancia general", name: 'Repuestos de maquinaria , coches , motos' },
  { id: "Mercancia general", name: 'Rodajes' },
  { id: "Mercancia general", name: 'manufacturas de metales ' },
  { id: "Mercancia general", name: 'Demas auriculares' },
  { id: "Mercancia general", name: 'electrodos de soldadura' },
  { id: "Mercancia general", name: 'Imanes' },
  { id: "Mercancia general", name: 'Perfiles' },
  { id: "Mercancia general", name: 'Articulos deportivos' },
  { id: "Mercancia general", name: 'Maquinas de soldadura' },
  { id: "Mercancia general", name: 'carritos a bateria' },
  { id: "Mercancia general", name: 'Motocicletas' },
  { id: "Mercancia general", name: 'Cuatrimotos' },
  { id: "Mercancia general", name: 'Maquina cnc chorro plasma' },
  { id: "Mercancia general", name: 'otros productos en general' },
]);

const port_of_origins = ref([
  { id: 'QINGDAO', name: 'Qingdao - (QINGDAO)'},
  { id: 'SHENZHEN', name: 'Shenzhen - (SHENZHEN)'},
  { id: 'SHANGHAI', name: 'Shanghai - (SHANGHAI)'},
  { id: 'NINGBO', name: 'Ningbo - (NINGBO)'},
]);

const destination_locations = ref([
  { id: 'zone1', name: 'Callao'},
  { id: 'zone1', name: 'Carmen de La Legua'},
  { id: 'zone1', name: 'San Miguel'},
  { id: 'zone1', name: 'La Perla'},
  { id: 'zone1', name: 'Bellavista'},
  { id: 'zone1', name: 'La Punta'},
  { id: 'zone2', name: 'Magdalena'},
  { id: 'zone2', name: 'Pueblo Libre'},
  { id: 'zone2', name: 'Lince'},
  { id: 'zone2', name: 'Cercado de Lima'},
  { id: 'zone2', name: 'Breña'},
  { id: 'zone2', name: 'Jesús María'},
  { id: 'zone2', name: 'La Victoria'},
  { id: 'zone2', name: 'San Martin de Porres'},
  { id: 'zone2', name: 'Independencia'},
  { id: 'zone2', name: 'Rímac'},
  { id: 'zone2', name: 'Los Olivos'},
  { id: 'zone2', name: 'Pro'},
  { id: 'zone3', name: 'Ventanilla'},
  { id: 'zone3', name: 'San Isidro'},
  { id: 'zone3', name: 'San Borja'},
  { id: 'zone3', name: 'San Luis'},
  { id: 'zone3', name: 'Miraflores'},
  { id: 'zone3', name: 'Surquillo'},
  { id: 'zone3', name: 'Barranco'},
  { id: 'zone3', name: 'Surco'},
  { id: 'zone3', name: 'Ate'},
  { id: 'zone3', name: 'Sta. Clara'},
  { id: 'zone3', name: 'Comas'},
  { id: 'zone3', name: 'Puente Piedra'},
  { id: 'zone3', name: 'El Agustino'},
  { id: 'zone3', name: 'Santa Anita'},
  { id: 'zone3', name: 'San Juan de Lurigancho'},
  { id: 'zone4', name: 'Ancón'},
  { id: 'zone4', name: 'Chorrillos'},
  { id: 'zone4', name: 'Villa El Salvador'},
  { id: 'zone4', name: 'Villa Maria del Triunfo'},
  { id: 'zone4', name: 'San Juan de Miraflores'},
  { id: 'zone4', name: 'Carabayllo'},
  { id: 'zone4', name: 'La Molina'},
  { id: 'zone4', name: 'Cajamarquilla'},
  { id: 'zone5', name: 'Lurín'},
  { id: 'zone5', name: 'Pachacamac'},
  { id: 'zone5', name: 'Chosica'},
  { id: 'zone5', name: 'Huarochiri'},
  { id: 'zone5', name: 'Huachipa'},
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