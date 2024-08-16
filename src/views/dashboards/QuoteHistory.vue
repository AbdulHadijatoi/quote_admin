<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter hook
import { CalendarIcon, DownloadIcon, DetailsIcon, LiveViewIcon, View360Icon, ViewfinderIcon, EyeIcon, PlusIcon } from 'vue-tabler-icons'; // Importing icons from vue-tabler-icons
// Import your postData function
import { postData } from '@/utils/api';

interface Quote {
  id: number;
  employee_name: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_address: string;
  quote_reference: string;
  valid_until: string;
  generated_by_employee: string;
  dni_ruc_option: string;
  dni_or_ruc_value: string;
  volume: number;
  total_weight: number;
  invoice_price: number;
  first_import: string;
  incoterm: string;
  measurement_unit: string;
  origin_port: string;
  type_of_merchandise: string;
  destination_location: string;
}

const quotes = ref<Quote[]>([]);
const isLoading = ref(false);
const dateRange = ref({ start: '', end: '' });
const nameFilter = ref('');
const emailFilter = ref('');
const perPage = ref(10); // Default number of results per page
const page = ref(1); // Default page number
const totalItems = ref(0); // Total number of items from the API

// Function to fetch shipping quotes
const fetchData = async () => {
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

const router = useRouter(); // Get the router instance

const createQuote = () => {
  router.push('/dashboard/quotes/create'); // Navigate to the create quote page
};

const dialog = ref(false);
const quoteDetails = ref<any[]>([]);
const selectedQuote = ref(null);

const closeDialog = () => {
  dialog.value = false;
};

const deleteQuote = (id: number) => {
  quotes.value = quotes.value.filter(quote => quote.id !== id);
  console.log('Quote deleted successfully.');
};

// Function to view quote details
const viewQuoteDetails = (quoteId: number) => {
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
            <v-card-title>Shipping Quotes List</v-card-title>
            <v-btn color="secondary" @click="createQuote"><PlusIcon size="20" class="mr-2"/>Create Quote</v-btn>
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


            :items-length="totalItems"

            v-model:items-per-page="perPage"
            v-model:page="page"
            @update:options="fetchData"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn icon @click="viewQuoteDetails(item.id)" elevation="0"><EyeIcon size="20"/>
                <v-tooltip activator="parent" location="top">View</v-tooltip>
              </v-btn>
              <v-btn icon @click="viewQuoteDetails(item.id)" elevation="0"><DownloadIcon size="20"/>
                <v-tooltip activator="parent" location="top">Download</v-tooltip>
              </v-btn>
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
              <v-list-item-title>{{ key}}:</v-list-item-title>
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
