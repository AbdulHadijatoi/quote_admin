<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import Vue3TagsInput from 'vue3-tags-input';

const tags = ref(['tdaadsdest1','tdsaddest2']);
const files = ref();
const expiration_days = ref();
const expiration_notice_days = ref();

function handleChangeTag(tags) {
  this.tags = tags;
}

</script>

<template>

  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex flex-row align-center justify-space-between">
            <v-row justify="space-between">
              <v-col cols="6">
                <v-card-title>Settings Page</v-card-title>
              </v-col>
              <v-col cols="12" md="2">
                  <v-btn color="secondary" :loading="isSubmitting" block variant="flat">
                    Save Settings
                  </v-btn>
              </v-col>
            </v-row>
            
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <h2 class="mb-4">Form Dropdowns Data</h2>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <h5 class="mb-2">Port Of Origin</h5>
              <vue3-tags-input :tags="tags" placeholder="Type and hit enter" @on-tags-changed="handleChangeTag"/>
            </v-col>
                        
            <v-col cols="12" md="6">
              <h5 class="mb-2">Incoterm</h5>
              <vue3-tags-input :tags="tags" placeholder="Type and hit enter" @on-tags-changed="handleChangeTag"/>
            </v-col>
            
            <v-col cols="12" md="6">
              <h5 class="mb-2">Type Of Merchandise</h5>
              <vue3-tags-input :tags="tags" placeholder="Type and hit enter" @on-tags-changed="handleChangeTag"/>
            </v-col>

            <v-col cols="12" md="6">
              <h5 class="mb-2">Destination Location</h5>
              <vue3-tags-input :tags="tags" placeholder="Type and hit enter" @on-tags-changed="handleChangeTag"/>
            </v-col>

            <v-col cols="12" md="6">
              <h5 class="mb-2">Unit Of Measurement</h5>
              <vue3-tags-input :tags="tags" placeholder="Type and hit enter" @on-tags-changed="handleChangeTag"/>
            </v-col>
        
          </v-row>
        </v-card-text>
        
        <v-card-text>
          <h2 class="my-4">File Upload</h2>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <h5 class="mb-3">Choose front page background</h5>
              
              <v-file-input
                v-model="files"
                :show-size="1000"
                color="deep-purple-accent-4"
                label="Select Image"
                placeholder="Selected Image"
                variant="outlined"
                counter
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(fileName, index) in fileNames" :key="fileName">
                    <v-chip
                      v-if="index < 2"
                      class="me-2"
                      color="deep-purple-accent-4"
                      size="small"
                      label
                    >
                      {{ fileName }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="text-overline text-grey-darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </template>
              </v-file-input>

            </v-col>
                        
            
        
          </v-row>
        </v-card-text>
        
        <v-card-text>
          <h2 class="my-4">Quote Expiration Days</h2>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <h5 class="mb-3">Expiration Days</h5>
              <v-text-field
                v-model="expiration_days"
                label="Expiration Days"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <h5 class="mb-3">Expiration Notice Days</h5>
              <v-text-field
                v-model="expiration_days"
                label="Expiration Notice Days"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
              ></v-text-field>
            </v-col>
        
          </v-row>
        </v-card-text>




      </v-card>
    </v-col>
  </v-row>
</template>
