<script setup lang="ts">
import LCL_FORM from './forms/LCL.vue';
</script>

<template>
  <v-row class="h-screen" no-gutters>
    <v-col cols="12" class="d-flex align-center bg-lightprimary">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="0" class="quoteForm">
                <v-card variant="outlined">
                  <v-card-text class="pa-9">
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <h2 class="text-secondary text-h2 mt-8">Sign up</h2>
                        <h4 class="text-disabled text-h4 mt-3">Enter credentials to continue</h4>
                      </v-col>
                    </v-row>

                    <LCL_FORM />
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.quoteForm {
  max-width: 475px;
  margin: 0 auto;
}
</style>
