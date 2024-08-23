<script setup lang="ts">
import { ref } from 'vue';
import { postData, showError, showSuccess } from '@/utils/api';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from 'vue-tabler-icons';

interface RowModel {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  image: string;
}

interface CreateModel {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dob: string;
  image: string;
}

const allRows = ref<RowModel[]>([]);
const totalRows = ref(0);
const isLoading = ref(false);
const nameFilter = ref('');
const perPage = ref(10);
const page = ref(1);

const fetchData = async () => {
  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append('search', nameFilter.value);
    formData.append('perPage', perPage.value.toString());
    formData.append('page', page.value.toString());

    const response = await postData('/employees', formData);

    allRows.value = response.data;
    totalRows.value = response.total;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    isLoading.value = false;
  }
};

const selectedRow = ref<RowModel>({
  id: 0,
  name: '',
  email: '',
  address: '',
  phone: '',
  dob: '',
  image: ''
});

const newEmployee = ref<CreateModel>({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  dob: '',
  image: ''
});
const viewDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const createDialog = ref(false);

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
      formData.append('dob', selectedRow.value.dob);
      formData.append('phone', selectedRow.value.phone);
      formData.append('image', selectedRow.value.image);
      formData.append('address', selectedRow.value.address);

      const response = await postData('/employees/update', formData);

      if (response.status) {
        console.log('Update successful:', response.message);
        editDialog.value = false;
        showSuccess(response.message);
        fetchData(); // Refresh the data
      } else {
        console.error('Update failed:', response.message);
        showError(response.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  }
};


const handleCreate = async () => {
  try {
    const formData = new FormData();
    formData.append('name', newEmployee.value.name);
    formData.append('email', newEmployee.value.email);
    formData.append('address', newEmployee.value.address);
    formData.append('password', newEmployee.value.password);
    formData.append('phone', newEmployee.value.phone);
    formData.append('image', newEmployee.value.image);
    formData.append('address', newEmployee.value.address);

    const response = await postData('/employees/create', formData);

    if (response.status) {
      console.log('Create successful:', response.message);
      newEmployee.value = {
        name: '',
        email: '',
        address: '',
        phone: '',
        dob: '',
        image: '',
        password: '' // Add password if used for creation
      };
      createDialog.value = false;
      showSuccess(response.message);
      fetchData(); // Refresh the data
    } else {
      console.error('Create failed:', response.message);
      showError(response.message);
    }
  } catch (error) {
    console.error('Error during create:', error);
  }
};

const handleDelete = (row: RowModel) => {
  selectedRow.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (selectedRow.value) {
    try {
      const formData = new FormData();
      formData.append('id', selectedRow.value.id.toString());

      const response = await postData('/employees/delete', formData);

      if (response.status) {
        console.log('Delete successful:', response.message);
        deleteDialog.value = false;
        showSuccess(response.message);
        fetchData(); // Refresh the data
      } else {
        console.error('Delete failed:', response.message);
        showError(response.message);
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  }
};

const handleView = (row: RowModel) => {
  if (row) {
    selectedRow.value = row;
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
            <v-card-title>Employees List</v-card-title>
            <v-btn @click="createDialog = true" color="secondary">
              <PlusIcon size="20" />
              Create Employee
            </v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="nameFilter"
                  label="Search by Name or Email"
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
              { title: 'DOB', key: 'dob' },
              { title: 'Image', key: 'image' },
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

  <!-- Create Employee Dialog -->
  <v-dialog v-model="createDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span>Create New Employee</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.name" label="Name" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.email" label="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.address" label="Address" />
            </v-col>
            <v-col cols="12">
              <v-text-field type="password" v-model="newEmployee.password" label="Password" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.phone" label="Phone" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.dob" label="Date of Birth" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newEmployee.image" label="Image URL" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="handleCreate">Create</v-btn>
        <v-btn @click="createDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- View Details Dialog -->
  <v-dialog v-model="viewDialog" max-width="600">
    <v-card>
      <v-card-title class="headline">Employee Details</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(detail, key) in selectedRow" :key="key">
            <v-list-item-content>
              <v-list-item-title>{{ key }}:</v-list-item-title>
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

  <!-- Edit Employee Dialog -->
  <v-dialog v-model="editDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span>Edit Employee</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.name" label="Name" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.email" label="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.address" label="Address" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.phone" label="Phone" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.dob" label="Date of Birth" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="selectedRow.image" label="Image URL" />
            </v-col>
          </v-row>
        </v-form>
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

<style>
.v-field--variant-filled .v-field__overlay {
  background: none;
  border-radius: 3px;
}
</style>
