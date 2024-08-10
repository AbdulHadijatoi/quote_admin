<script setup lang="ts">
import { ref, computed } from 'vue';

const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editor' },
  { id: 3, name: 'Viewer' },
]);

const headers = [
  { key: 'name', title: 'Permission' },
  { key: 'assigned', title: 'Assigned' },
];


const permissions = ref([
  { id: 1, name: 'View Dashboard', assignedRoles: [1, 2] },
  { id: 2, name: 'Edit Content', assignedRoles: [1, 2] },
  { id: 3, name: 'Delete Content', assignedRoles: [1] },
  { id: 4, name: 'Manage Users', assignedRoles: [1] },
]);

const selectedRole = ref(null);

// Function to check if a permission is assigned to the selected role
const filteredPermissions = computed(() => {
  if (!selectedRole.value) return permissions.value;
  return permissions.value.map((permission) => ({
    ...permission,
    assigned: permission.assignedRoles.includes(selectedRole.value.id),
  }));
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card-title>Select Role</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-select
            v-model="selectedRole"
            :items="roles"
            item-value="id"
            item-title="name"
            label="Select Role"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card variant="flat">
        <v-card-title>Permissions</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="filteredPermissions"
            item-key="id"
          >
            <template v-slot:item.assigned="{ item }">
              <v-checkbox
                v-model="item.assigned"
                :disabled="true"
              ></v-checkbox>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
