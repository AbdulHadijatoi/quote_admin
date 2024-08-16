<script setup lang="ts">
import { ref } from 'vue';
import { postData } from '@/utils/api';
import { SearchIcon } from 'vue-tabler-icons';

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
    
    allRows.value = response.data;
    totalRows.value = response.total;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    isLoading.value = false;
  }
};

const rowDetails = ref<RowModel>();
const selectedRow = ref<RowModel | undefined>();
const viewDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const handleEdit = (row: RowModel) => {
  selectedRow.value = row;
  editDialog.value = true;
};

const handleUpdate = async () => {
  if (selectedRow.value) {
    try {
      const formData = new FormData();
      formData.append('id', selectedRow.value.id.toString());
      formData.append('name', selectedRow.value.name);
      formData.append('email', selectedRow.value.email);
      formData.append('address', selectedRow.value.address);
      formData.append('phone', selectedRow.value.phone);

      const response = await postData('/subscriber/update', formData);

      if (response.success) {
        console.log('Update successful:', response.message);
        editDialog.value = false;
        fetchData(); // Refresh the data
      } else {
        console.error('Update failed:', response.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  }
};


const handleDelete = (row: RowModel) => {
  selectedRow.value = row;
  deleteDialog.value = true;
};

const confirmDelete = (row: RowModel) => {
  //
};

const handleView = (row: RowModel) => {
  if (row) {
    rowDetails.value = row;
    viewDialog.value = true;
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
                  label="Search by Email"
                  variant="outlined"
                  @keydown.enter="fetchData"
                >
                  <template v-slot:append-inner>
                    <SearchIcon size="20" class="mr-2" />
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="emailFilter"
                  label="Search by Email"
                  variant="outlined"
                  @keydown.enter="fetchData"
                >
                  <template v-slot:append-inner>
                    <SearchIcon size="20" class="mr-2" />
                  </template>
                </v-text-field>
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
              
              <v-btn icon @click="handleView(item)" elevation="0">
                <EyeIcon size="20"/>
                <v-tooltip activator="parent" location="start">View</v-tooltip>
              </v-btn>
              
              <v-btn icon @click="handleEdit(item)" elevation="0">
                <EditIcon size="20"/>
                <v-tooltip activator="parent" location="start">Edit</v-tooltip>
              </v-btn>
              
              <v-btn icon @click="handleDelete(item)" elevation="0">
                <TrashIcon size="20"/>
                <v-tooltip activator="parent" location="start">Delete</v-tooltip>
              </v-btn>

            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- View Details Dialog -->
  <v-dialog v-model="viewDialog" max-width="600">
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
        <v-btn @click="viewDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Edit Details Dialog -->
  <!-- Edit Details Dialog -->
  <v-dialog v-model="editDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span>Edit Details</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field

              label="Name"
              
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field

              label="Email"
              
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field

              label="Address"
              
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field

              label="Phone"
              
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="handleUpdate">Save</v-btn>
        <v-btn @click="editDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <!-- Dialog for Confirming Deletion -->
  <v-dialog v-model="deleteDialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Are you sure you want to delete this record?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        <v-btn @click="deleteDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
