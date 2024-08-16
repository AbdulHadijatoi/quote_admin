<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">

        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="6">
              <h2 class="my-4">Settings Page</h2>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="secondary" :loading="loading" @click="saveSetting" block variant="flat">
                Save Setting & Upload Image
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Expiration Days</h5>
              <v-text-field
                v-model="expiration_days"
                label="Expiration Days"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                :loading="loading"
                color="secondary"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <h5 class="mb-3">Expiration Notice Days</h5>
              <v-text-field
                v-model="expiration_notice_days"
                label="Expiration Notice Days"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                :loading="loading"
                color="secondary"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <h5 class="mb-3">Choose front page background</h5>
              <v-file-input
                v-model="front_background"
                :show-size="1000"
                color="secondary"
                label="Select Image"
                placeholder="Selected Image"
                variant="outlined"
                density="compact"
                
                :loading="loading"
                counter
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(fileName, index) in fileNames" :key="fileName">
                    <v-chip v-if="index < 2" class="me-2" color="secondary" size="small" label>
                      {{ fileName }}
                    </v-chip>
                    <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                      +{{ front_background.length - 2 }} File(s)
                    </span>
                  </template>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Preview</h5>
              <v-card v-if="backgroundImage" class="d-flex align-items-center justify-center" style="height: 150px; overflow: hidden;" flat>
                <v-img :src="backgroundImage" alt="Selected Image" cover />
              </v-card>
              <v-card v-else class="d-flex align-items-center justify-center" style="height: 150px; background-color: #f5f5f5;" flat>
                <span>No image selected</span>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>


        
        <v-divider></v-divider>
        <v-card-text>
          <!-- <h2 class="mb-4">Constants Data</h2> -->
          <!-- <v-divider class="mb-4"></v-divider> -->
          <v-row>
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2)" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Ports of Origin</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in originPorts"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Destination Location</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in destinationLocations"
                      :key="item.id"
                      :subtitle="item.zone_name"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Type Of Merchandise</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in merchandiseTypes"
                      :key="item.id"
                      :subtitle="item.product_category_name"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.35)" :loading="loading">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Incoterm</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in incoterms"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Unit of Measurement</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in measurementUnits"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Product Categories</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in productCategories"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#FFF" density="compact">
                  <v-toolbar-title>Zones</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in zones"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn elevation="0"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           

           

            
          </v-row>
        </v-card-text>

        
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getData, uploadImage } from '@/utils/api';
import { webUrl } from '@/utils/config';
import { PlusIcon, PencilIcon } from 'vue-tabler-icons';

const portHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const incotermHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const merchandiseTypeHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const destinationLocationHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const unitHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const productCategoryHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];

const zoneHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' }
];


const incoterms = ref([]);
const measurementUnits = ref([]);
const originPorts = ref([]);
const destinationLocations = ref([]);
const merchandiseTypes = ref([]);
const zones = ref([]);
const productCategories = ref([]);

const front_background = ref<File | null>(null);
const expiration_days = ref<number | null>(null);
const expiration_notice_days = ref<number | null>(null);
const allSetting = ref([]);
const backgroundImage = ref<string>('');
const loading = ref<boolean>(false);

const getConstantsData = async () => {
  try {
    const response = await getData<any>('/get-constants');
    incoterms.value = response.incoterms;
    measurementUnits.value = response.measurementUnits;
    originPorts.value = response.originPorts;
    destinationLocations.value = response.destinationLocations;
    merchandiseTypes.value = response.merchandiseTypes;
    zones.value = response.zones;
    productCategories.value = response.productCategories;
  } catch (error) {
    console.error("Error fetching constants data:", error);
  }
};

const getSettings = async () => {
  loading.value = true;
  try {
    allSetting.value = await getData<any>('/get-all-setting');
      loading.value = false;
    if (allSetting.value.length > 0) {
      backgroundImage.value = `${webUrl}${getValueByKey('front_background')}`;
      expiration_days.value = getValueByKey('expiration_days');
      expiration_notice_days.value = getValueByKey('expiration_notice_days');
    }
  } catch (error) {
    console.error("Error fetching settings data:", error);
  }
};

const saveSetting = async () => {
  loading.value = true;
  const formData = new FormData();
  
  if (front_background.value) {
    formData.append('front_background', front_background.value);
  }
  if (expiration_days.value) {
    formData.append('expiration_days', expiration_days.value.toString());
  }
  if (expiration_notice_days.value) {
    formData.append('expiration_notice_days', expiration_notice_days.value.toString());
  }

  try {
    const response = await uploadImage<any>('/update-settings', formData);
    allSetting.value = response.settingData;
    backgroundImage.value = `${webUrl}${getValueByKey('front_background')}`;
    expiration_days.value = getValueByKey('expiration_days');
    expiration_notice_days.value = getValueByKey('expiration_notice_days');
    console.log('Successfully updated settings:', response);
  } catch (error) {
    console.error('Error updating settings:', error);
  } finally {
    loading.value = false;
  }
};

const getValueByKey = (key: string) => {
  const setting = allSetting.value.find(item => item.key === key);
  return setting ? setting.value : null;
};

onMounted(() => {
  getSettings();
  getConstantsData();
});
</script>
