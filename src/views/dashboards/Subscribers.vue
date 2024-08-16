<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TrashIcon } from 'vue-tabler-icons';

// Placeholder data
const subscribers = ref([
  { id: 1, name: 'John Doe', phone: '123-456-7890', address: '123 Main St', email: 'john.doe@example.com', status: 1 },
  { id: 2, name: 'Jane Smith', phone: '987-654-3210', address: '456 Elm St', email: 'jane.smith@example.com', status: 0 },
]);

const isLoading = ref(false);
const dialog = ref(false);
const subscriberToDelete = ref<number>(0);
// const toast = useToast();

const deleteSubscriber = () => {
  if (subscriberToDelete.value !== null) {
    // Simulate deleting from the data
    subscribers.value = subscribers.value.filter(subscriber => subscriber.id !== subscriberToDelete.value);
    // toast.success('Subscriber deleted successfully.');
    dialog.value = false;
  } else {
    // toast.error('No subscriber selected for deletion.');
  }
};

const openDeleteDialog = (id: number) => {
  subscriberToDelete.value = id;
  dialog.value = true;
};

const closeDeleteDialog = () => {
  dialog.value = false;
};

onMounted(() => {
  // Placeholder for any initial setup
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card-title>Subscribers List</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            :headers="[
              { title: 'Name', key: 'name' },
              { title: 'Phone', key: 'phone' },
              { title: 'Address', key: 'address' },
              { title: 'Email', key: 'email' },
              { title: 'Status', key: 'status' },
              { title: 'Actions', key: 'actions' }
            ]"
            :items="subscribers"
            :loading="isLoading"
            item-key="id"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status === 1 ? 'green' : 'red'" dark>
                {{ item.status === 1 ? 'Active' : 'Inactive' }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              
              <TrashIcon size="18" @click="openDeleteDialog(item.id)"/>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this subscriber?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDeleteDialog">Cancel</v-btn>
        <v-btn color="red" text @click="deleteSubscriber">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
