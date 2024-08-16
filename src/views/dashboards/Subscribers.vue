<script setup lang="ts">
import { ref } from 'vue';
import { postData } from '@/utils/api';

interface RowModel {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

// const dateRange = ref({ start: '', end: '' });
const allRows = ref<RowModel[]>([]);
const totalRows = ref(0);
const isLoading = ref(false);
const nameFilter = ref('');
const emailFilter = ref('');
const perPage = ref(10);
const page = ref(1);


const fetchData = async () => {
  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append('search', nameFilter.value || emailFilter.value || '');
    formData.append('perPage', perPage.value.toString());
    formData.append('page', page.value.toString());
    // formData.append('startDate', dateRange.value.start || '');
    // formData.append('endDate', dateRange.value.end || '');
    
    const response = await postData('/subscribers', formData);
    
    allRows.value = response.subscribers;
    totalRows.value = response.total;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    isLoading.value = false;
  }
};

const detailsDialog = ref(false);
const rowDetails = ref<RowModel>();

const closeDetailsDialog = () => {
  detailsDialog.value = false;
};

const deleteRow = (id: number) => {
  allRows.value = allRows.value.filter(row => row.id !== id);
  console.log('Deleted successfully.');
};

const viewRowDetails = (id: number) => {
  const row = allRows.value.find((row) => row.id === id);
  if (row) {
    rowDetails.value = row;
    detailsDialog.value = true;
  }
};

</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Subscribers List</v-card-title>

          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="nameFilter"
                  label="Search by Name"
                  outlined
                  @keydown.enter="fetchData"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="emailFilter"
                  label="Search by Email"
                  outlined
                  @keydown.enter="fetchData"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <v-data-table-server
            :headers="[
              { title: 'Name', key: 'name' },
              { title: 'Email', key: 'email' },
              { title: 'Address', key: 'address' },
              { title: 'Phone', key: 'phone' },
              { title: 'Actions', key: 'actions' }
            ]"
            :items="allRows"
            :items-length="totalRows"
            :loading="isLoading"
            v-model:items-per-page="perPage"
            v-model:page="page"
            @update:options="fetchData"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn @click="viewRowDetails(item.id)" elevation="0"><EyeIcon size="20"/>
                <v-tooltip activator="parent" location="start">View Details</v-tooltip>
              </v-btn>
              <v-btn @click="deleteRow(item.id)" color="red">Delete</v-btn>
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- View Quote Details Dialog -->
  <v-dialog v-model="detailsDialog" max-width="600">
    <v-card>
      <v-card-title class="headline">Quote Details</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(detail, key) in rowDetails" :key="key">
            <v-list-item-content>
              <v-list-item-title>{{ key}}:</v-list-item-title>
              <v-list-item-subtitle>{{ detail }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDetailsDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
