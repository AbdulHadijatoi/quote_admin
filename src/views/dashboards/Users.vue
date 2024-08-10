<script setup lang="ts">
import { ref } from 'vue';
import { EyeIcon, TrashIcon, EditIcon } from 'vue-tabler-icons';

// Table headers
const headers = [
  { key: 'name', title: 'Name', align: 'start' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'Phone' },
  { key: 'dob', title: 'Date of Birth' },
  { key: 'address', title: 'Address' },
  { key: 'actions', title: 'Actions', align: 'end', sortable: false },
];

// Placeholder data for employees
const items = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', dob: '1990-01-01', address: '123 Main St' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', dob: '1985-05-15', address: '456 Oak St' },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', phone: '555-666-7777', dob: '1992-08-22', address: '789 Pine St' },
  // Add more placeholder data as needed
]);

const totalItems = ref(items.value.length);
const search = ref('');
const pagination = ref({
  page: 1,
  itemsPerPage: 10,
});

const viewDialog = ref(false);
const editDialog = ref(false);
const addDialog = ref(false);
const deleteDialog = ref(false);
const selectedEmployee = ref(null);

// For editing/adding employee details
const editName = ref('');
const editEmail = ref('');
const editPhone = ref('');
const editDob = ref('');
const editAddress = ref('');
const editPassword = ref('');
const confirmPassword = ref('');

// Action handlers
function handleView(item) {
  selectedEmployee.value = item;
  viewDialog.value = true;
}

function handleDelete(item) {
  selectedEmployee.value = item;
  deleteDialog.value = true;
}

function confirmDelete() {
  // Proceed with deletion
  console.log('Delete employee:', selectedEmployee.value);
  items.value = items.value.filter(employee => employee.id !== selectedEmployee.value.id);
  totalItems.value = items.value.length;
  deleteDialog.value = false;
}

function handleEdit(item) {
  selectedEmployee.value = item;

  // Populate the edit fields with the selected employee's data
  editName.value = item.name;
  editEmail.value = item.email;
  editPhone.value = item.phone;
  editDob.value = item.dob;
  editAddress.value = item.address;

  editDialog.value = true;
}

function handleAddEmployee() {
  // Clear the fields for new employee
  editName.value = '';
  editEmail.value = '';
  editPhone.value = '';
  editDob.value = '';
  editAddress.value = '';
  editPassword.value = '';
  confirmPassword.value = '';

  addDialog.value = true;
}

function saveEdit() {
  if (selectedEmployee.value) {
    // Update existing employee
    selectedEmployee.value.name = editName.value;
    selectedEmployee.value.email = editEmail.value;
    selectedEmployee.value.phone = editPhone.value;
    selectedEmployee.value.dob = editDob.value;
    selectedEmployee.value.address = editAddress.value;

    if (editPassword.value && editPassword.value === confirmPassword.value) {
      console.log('Password updated');
    } else if (editPassword.value !== confirmPassword.value) {
      console.error('Passwords do not match');
      return;
    }

    editDialog.value = false;
  } else {
    // Add new employee
    const newEmployee = {
      id: items.value.length + 1, // Simple ID generation for example
      name: editName.value,
      email: editEmail.value,
      phone: editPhone.value,
      dob: editDob.value,
      address: editAddress.value,
    };

    items.value.push(newEmployee);
    totalItems.value = items.value.length;
    addDialog.value = false;
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-row justify="space-between" align="center">
            <v-col cols="auto">
              <span class="text-h6">Employees Listing</span>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" @click="handleAddEmployee">Add Employee</v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            class="mb-4"
          ></v-text-field>

          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="pagination.itemsPerPage"
            :page.sync="pagination.page"
            :server-items-length="totalItems"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <EyeIcon size="18" class="mr-2 cursor-pointer" @click="handleView(item)" />
              <EditIcon size="18" class="cursor-pointer" @click="handleEdit(item)" />
              <TrashIcon size="18" class="cursor-pointer" @click="handleDelete(item)" />
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <!-- Dialog for Viewing Employee Details -->
      <v-dialog v-model="viewDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span>Employee Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedEmployee.name"
                  label="Name"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedEmployee.email"
                  label="Email"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedEmployee.phone"
                  label="Phone"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="selectedEmployee.dob"
                  label="Date of Birth"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selectedEmployee.address"
                  label="Address"
                  readonly
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="viewDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for Editing Employee Details -->
      <v-dialog v-model="editDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span>Edit Employee Details</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editName"
                  label="Name"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editEmail"
                  label="Email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editPhone"
                  label="Phone"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editDob"
                  label="Date of Birth"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editAddress"
                  label="Address"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveEdit">Save</v-btn>
            <v-btn @click="editDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for Adding Employee -->
      <v-dialog v-model="addDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span>Add New Employee</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editName"
                  label="Name"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editEmail"
                  label="Email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editPhone"
                  label="Phone"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editDob"
                  label="Date of Birth"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editAddress"
                  label="Address"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveEdit">Save</v-btn>
            <v-btn @click="addDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for Confirming Deletion -->
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card>
          <v-card-title class="headline">Confirm Delete</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Are you sure you want to delete this employee?
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="confirmDelete">Delete</v-btn>
            <v-btn @click="deleteDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
