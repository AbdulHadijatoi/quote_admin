<script setup lang="ts">
import { ref } from 'vue';
import LCL_FORM from './forms/LCL.vue';
import FCL_FORM from './forms/FCL.vue';

const tab = ref('');
</script>

<template>

  <v-row class="bg-lightprimary pa-4" style="background: linear-gradient(to right, navy, transparent), url('/front_bg.jpeg') no-repeat center center fixed; background-size: cover;">
    <v-col cols="12" lg="6" xl="6" md="6" class="text-white d-flex flex-column justify-content-center">
        <div style="margin: auto">
          <h3>Online quoting tool</h3>
          <h1>Looking for a cargo fare quick and easy?</h1>
          <p>Just as if it were a plane ticket, book your import and additional services.</p>
        </div>
    </v-col>
    <v-col cols="12" lg="6" xl="6" md="6" class="d-flex align-items-center justify-content-center">
      <v-card elevation="0" class="quoteForm">
        <v-card-text class="pa-9">
          
          <v-row>
            <v-col cols="12">
              <h2 class="text-h1">Quote your imports</h2>
            </v-col>
          </v-row>

          <v-tabs class="mt-3" v-model="tab" slider-color="secondary">
            <v-tab value="lcl_tab">Carga Suelta (LCL)</v-tab>
            <v-tab value="fcl_tab">Contenedor(es) (FCL)</v-tab>
          </v-tabs>

          <v-divider />

          <v-card-text style="padding: 0px;">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="lcl_tab">
                <h2 class="text-h5 mt-5">Details of your Loose Cargo (LCL)</h2>
                <LCL_FORM />
              </v-tabs-window-item>
              
              <v-tabs-window-item value="fcl_tab">
                <h2 class="text-h5 mt-5">Details of your cargo (FCL)</h2>
                <FCL_FORM />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>

        </v-card-text>

      </v-card>
    </v-col>
  </v-row>

</template>
<style lang="scss">
.quoteForm {
  min-height: 500px;
  max-height: 600px;
  max-width: 600px;
  margin: auto 0;
  overflow: scroll;
}
.v-tab.v-tab.v-btn{
  background: rgba(0,0,0,0.03);
  margin-right: 1px;
}
</style>
