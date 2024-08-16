<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { CalendarIcon } from 'vue-tabler-icons'; // Importing icons from vue-tabler-icons
// Import your postData function
import { postData } from '@/utils/api';

const quotes = ref([]);
const isLoading = ref(false);
const dateRange = ref({ start: '', end: '' });
const nameFilter = ref('');
const emailFilter = ref('');
var perPage = ref(10); // Default number of results per page
var page = ref(1); // Default page number
const totalItems = ref(0); // Total number of items from the API

// Function to fetch shipping quotes
const fetchShippingQuotes = async () => {
  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append('search', nameFilter.value || emailFilter.value || '');
    formData.append('startDate', dateRange.value.start || '');
    formData.append('endDate', dateRange.value.end || '');
    formData.append('perPage', perPage.value.toString());
    formData.append('page', page.value.toString());
    
    // Call the API to fetch the quotes
    const response = await postData('/shipping-quotes', formData);
    
    // Update quotes data with the response
    quotes.value = response.shipping_quotes;
    totalItems.value = response.total; // Set the total items count
  } catch (error) {
    console.error('Failed to fetch shipping quotes:', error);
  } finally {
    isLoading.value = false;
  }
};

// Call fetchShippingQuotes on component mount to load data initially
onMounted(() => {
  // fetchShippingQuotes();
});

// Watchers to re-fetch data whenever filters or page changes
watch([nameFilter, emailFilter, dateRange, page], () => {
  fetchShippingQuotes();
});

const createQuote = () => {
  // Logic to create a new quote
  console.log('Create Quote button clicked.');
};

const dialog = ref(false);
const quoteDetails = ref<any[]>([]);
const selectedQuote = ref(null);

const closeDialog = () => {
  dialog.value = false;
};

const deleteQuote = (id) => {
  quotes.value = quotes.value.filter(quote => quote.id !== id);
  console.log('Quote deleted successfully.');
};

// Function to view quote details
const viewQuoteDetails = (quoteId) => {
  const quote = quotes.value.find((q) => q.id === quoteId);
  if (quote) {
    quoteDetails.value = [quote];
    dialog.value = true;
  }
};

</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-btn color="secondary" @click="createQuote">Create Quote</v-btn>
            <v-btn color="primary" @click="fetchShippingQuotes">Search</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="nameFilter"
                  label="Filter by Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="emailFilter"
                  label="Filter by Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.start"
                      label="Start Date"

                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateRange.start"
                    @input="$refs.endDatePicker.open()"
                  ></v-date-picker>
                </v-menu>
                <v-menu
                  
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      ref="endDatePicker"
                      v-model="dateRange.end"
                      label="End Date"

                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateRange.end"

                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>

          <v-data-table-server
            :headers="[
              { title: 'Quote Reference', key: 'quote_reference' },
              { title: 'Name', key: 'guest_name' },
              { title: 'Email', key: 'guest_email' },
              { title: 'Total Cost', key: 'total_cost' },
              { title: 'Valid Until', key: 'valid_until' },
              { title: 'Actions', key: 'actions' }
            ]"
            :items="quotes"
            :loading="isLoading"
            item-key="id"

            :page.sync="page"
            :items-length="totalItems"

            v-model:items-per-page="perPage"
            @update:options="fetchShippingQuotes()"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn @click="viewQuoteDetails(item.id)" color="secondary">View Details</v-btn>
              <!-- <v-btn @click="deleteQuote(item.id)" color="red">Delete</v-btn> -->
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- View Quote Details Dialog -->
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">Quote Details</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(detail, key) in quoteDetails[0]" :key="key">
            <v-list-item-content>
              <v-list-item-title>{{ key.replace(/_/g, ' ') }}:</v-list-item-title>
              <v-list-item-subtitle>{{ detail }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
