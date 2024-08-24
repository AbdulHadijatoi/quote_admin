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

            <!-- <v-col cols="12">
              <h5 class="mb-3">TextEditor</h5>
              <QuillEditor
                theme="snow"
                toolbar="full"
              />
            </v-col> -->
          </v-row>
        </v-card-text>


        
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2)" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Ports of Origin</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEdit(createItem,'Port of Origin','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in originPorts"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                      <template v-slot:append>
                        <v-btn icon elevation="0" @click="handleEdit(item,'Port of Origin','Edit')"><PencilIcon size="20" /></v-btn>
                      </template>
                    </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Destination Location</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEditDestination(createItem,'Destination Location','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in destinationLocations"
                      :key="item.id"
                      :subtitle="item.zone_name"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEditDestination(item,'Destination Location','Edit')"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Type Of Merchandise</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEditMerchandise(createItem,'Type Of Merchandise','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in merchandiseTypes"
                      :key="item.id"
                      :subtitle="item.product_category_name"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEditMerchandise(item,'Type Of Merchandise','Edit')"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.35)" :loading="loading">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Incoterm</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEdit(createItem,'Incoterm','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in incoterms"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEdit(item,'Incoterm','Edit')"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Unit of Measurement</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEdit(createItem,'Unit of Measurement','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in measurementUnits"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEdit(item,'Unit of Measurement','Edit')"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Product Categories</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEdit(createItem,'Product Category','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in productCategories"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEdit(item,'Product Category','Edit')"><PencilIcon size="20" /></v-btn>
                    </template>
                  </v-list-item>
  
                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </v-col>

           
            <v-col cols="12" md="3">
              <v-card variant="outlined" rounded="0" style="border: 1px solid rgba(0,0,0,0.2);" :loading="loading" color="secondary">
                <v-toolbar color="#f2f2f2" density="compact">
                  <v-toolbar-title>Zones</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="handleEdit(createItem,'Zone','Create')"><PlusIcon size="20" /></v-btn>
                </v-toolbar>
                <v-list lines="two" height="300px" style="overflow: scroll;">
                    <v-list-item
                      v-for="item in zones"
                      :key="item.id"
                      :subtitle="item.code"
                      :title="item.name"
                    >
                    <template v-slot:append>
                      <v-btn icon elevation="0" @click="handleEdit(item,'Zone','Edit')"><PencilIcon size="20" /></v-btn>
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

  <!-- Edit Dialog for Constant Data -->
  <v-dialog v-model="editDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span> {{ dialogAction + ' ' + dialogTitle }} Details</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="selectedItem.name" label="Name" />
          </v-col>
          <v-col cols="12" v-if="dialogTitle != 'Type Of Merchandise' && dialogTitle != 'Destination Location' && dialogTitle != 'Product Category' && dialogTitle != 'Zone'">
            <v-text-field v-model="selectedItem.code" label="Code" />
          </v-col>

          <!-- Add zone selection for Destination Location -->
          <v-col v-if="dialogTitle === 'Destination Location'" cols="12">
            <v-select
              v-model="selectedItem.zone_id"
              :items="zones"
              item-title="name"
              item-value="id"
              label="Select Zone"

            ></v-select>
          </v-col>

          <!-- Add product category selection for Merchandise Type -->
          <v-col v-if="dialogTitle === 'Type Of Merchandise'" cols="12">
            <v-select
              v-model="selectedItem.product_category_id"
              :items="productCategories"
              item-title="name"
              item-value="id"
              label="Select Product Category"

            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="handleSave">Save</v-btn>
        <v-btn @click="editDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getData, uploadImage, postData, showSuccess, showError } from '@/utils/api';
import { webUrl } from '@/utils/config';
import { PlusIcon, PencilIcon } from 'vue-tabler-icons';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

interface Constant1 {
  id: number;
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
  zone_id: number;
  zone_name: string;
}

interface SettingItem {
  key: string;
  value: string;
}

const editOriginPortDialog = ref(false);
const selectedOriginPort = ref<Constant1>({
  id: 0,
  code: '',
  name: '',
});

const selectedItem = ref<any>({
  id: 0,
  code: '',
  name: '',
  zone_id: 0,
  product_category_id: 0,
});

const editDialog = ref(false);
const dialogTitle = ref('');
const dialogAction = ref('');

const createItem = ref<any>({
  id: 0,
  code: '',
  name: '',
});

const constantType = ref('');

const handleEditDestination = (item: any, title: string, action: string) => {
  selectedItem.value = {
    ...item,
    zone_id: item.zone_id || 0, // Ensure default value is set if undefined
  };
  dialogTitle.value = title;
  dialogAction.value = action;
  editDialog.value = true;
  constantType.value = title;
};

const handleEditMerchandise = (item: any, title: string, action: string) => {
  selectedItem.value = {
    ...item,
    product_category_id: item.product_category_id || 0, // Ensure default value is set if undefined
  };
  dialogTitle.value = title;
  dialogAction.value = action;
  editDialog.value = true;
  constantType.value = title;
};

const handleEdit = async (row: Constant1, type: string, action: string) => {
  editDialog.value = true;
  selectedItem.value = row;
  dialogAction.value = action;
  constantType.value = type;
  dialogTitle.value = type;
};

const handleSave = async () => {
  loading.value = true;
  try {
    // Create a new FormData instance
    const formData = new FormData();

    // Append your data to the FormData instance
    Object.keys(selectedItem.value).forEach(key => {
      formData.append(key, selectedItem.value[key]);
    });
    formData.append('zone_id', selectedItem.value.zone_id);
    formData.append('product_category_id', selectedItem.value.product_category_id);

    let url = '';
    switch (constantType.value) {
      case 'Port of Origin':
        url = selectedItem.value.id ? '/constants/update-origin-port' : '/constants/create-origin-port';
        break;
      case 'Destination Location':
        url = selectedItem.value.id ? '/constants/update-destination-location' : '/constants/create-destination-location';
        break;
      case 'Type Of Merchandise':
        url = selectedItem.value.id ? '/constants/update-merchandise-type' : '/constants/create-merchandise-type';
        break;
      case 'Incoterm':
        url = selectedItem.value.id ? '/constants/update-incoterm' : '/constants/create-incoterm';
        break;
      case 'Measurement Unit':
        url = selectedItem.value.id ? '/constants/update-measurement-unit' : '/constants/create-measurement-unit';
        break;
      case 'Product Category':
        url = selectedItem.value.id ? '/constants/update-product-category' : '/constants/create-product-category';
        break;
      case 'Zone':
        url = selectedItem.value.id ? '/constants/update-zone' : '/constants/create-zone';
        break;
      default:
        return;
    }

    const response = await postData(url, formData);
    showSuccess(response.message);
    getConstantsData();
    console.log('Save successful:', response.message);
    editDialog.value = false;
  } catch (error) {
    console.error('Error saving data:', error);
  } finally {
    loading.value = false;
  }
};

const incoterms = ref<Constant1[]>([]);
const measurementUnits = ref<Constant1[]>([]);
const originPorts = ref<Constant1[]>([]);
const destinationLocations = ref<DestinationLocation[]>([]);
const merchandiseTypes = ref<MerchandiseType[]>([]);
const zones = ref<Constant1[]>([]);
const productCategories = ref<Constant1[]>([]);

const front_background = ref<File | null>(null);
const expiration_days = ref<string | null>('');
const expiration_notice_days = ref<string | null>('');
const allSetting = ref<SettingItem[]>([]);
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
