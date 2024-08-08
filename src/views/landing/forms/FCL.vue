

<template>
  <v-form ref="Regform" lazy-validation class="mt-7 loginForm">
    <v-row>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="unidad_de_medida_teu"
            :items="unidad_de_medida_teus"
            class="mx-auto"
            density="compact"
            placeholder="Unidad de medida TEU"
            label="Unidad de medida TEU:"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="tipo_mercancia"
            :items="tipo_mercancias"
            class="mx-auto"
            density="compact"
            placeholder="Tipo de mercancía"
            label="Tipo de mercancía:"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="precio_factura"
          density="compact"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="Precio de la factura (USD):"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="puerto_origen"
            :items="puerto_origens"
            class="mx-auto"
            density="compact"
            placeholder="Puerto de origen (POL)"
            label="Puerto de origen (POL)"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="primera_importacion"
            :items="primera_importacions"
            class="mx-auto"
            density="compact"
            placeholder="Primera importación"
            label="Tipo de mercancía:"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="ubicacion_destino"
            :items="ubicacion_destinos"
            class="mx-auto"
            density="compact"
            placeholder="Ubicación en Perú"
            label="Ubicación en Perú"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6">
        <v-autocomplete
            v-model="incoterm"
            :items="incoterms"
            class="mx-auto"
            density="compact"
            placeholder="Incoterm"
            label="Incoterm"
            theme="light"
            variant="outlined"
            auto-select-first
            item-title="name"
            item-value="id"
            item-props
          ></v-autocomplete>
      </v-col>

    </v-row>





    <!-- <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email Address / Username"
      class="mt-4 mb-4"
      required
      density="compact"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field> -->
    
    <v-btn color="primary" block class="mt-2" variant="flat" size="large" @click="validate()">Calcular</v-btn>
  </v-form>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';

const precio_factura = ref('');
const tipo_mercancia = ref('');
const primera_importacion = ref('');
const puerto_origen = ref('');
const incoterm = ref('');
const ubicacion_destino = ref('');
const unidad_de_medida_teu = ref('');

const unidad_de_medida_teus = ref([
  {id: '20', name: '20 ST'},
  {id: '40', name: '40 ST/HQ'},
  {id: '40', name: '40 NOR'},
]);

const primera_importacions = ref([
  {id: 'SI', name: 'SI'},
  {id: 'NO', name: 'NO'},
]);

const incoterms = ref([
  {id: 'FOB', name: 'FOB'}
]);

const tipo_mercancias = ref([
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

const puerto_origens = ref([
  { id: 'QINGDAO', name: 'Qingdao - (QINGDAO)'},
  { id: 'SHENZHEN', name: 'Shenzhen - (SHENZHEN)'},
  { id: 'SHANGHAI', name: 'Shanghai - (SHANGHAI)'},
  { id: 'NINGBO', name: 'Ningbo - (NINGBO)'},
]);

const ubicacion_destinos = ref([
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
// const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate() {
  Regform.value.validate();
}
</script>