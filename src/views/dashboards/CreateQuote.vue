<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import LCL_FORM from '../landing/forms/LCL.vue';
import FCL_FORM from '../landing/forms/FCL.vue';

const tab = ref('');
</script>

<template>
  <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">

          </div>
        </v-card-item>
        <v-divider></v-divider>
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
