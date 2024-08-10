<script setup lang="ts">
import { ref, computed } from 'vue';
// import { useToast } from 'vue-toastification';

// Placeholder data
const quotes = ref([
  {
    id: 1,
    user_id: 1,
    guest_name: 'John Doe',
    guest_email: 'john.doe@example.com',
    quote_reference: 'Q123',
    valid_until: '2024-08-15 00:00:00',
    total_cost: 150.00,
    generated_by_employee: 0
  },
  // Add more placeholder quotes here
]);

const quoteDetails = ref([]);
const isLoading = ref(false);
const dialog = ref(false);
const selectedQuote = ref(null);
// const toast = useToast();

// Filter data
const dateRange = ref({ start: '', end: '' });
const nameFilter = ref('');
const emailFilter = ref('');

const filteredQuotes = computed(() => {
  return quotes.value.filter(quote => {
    const isDateInRange = !dateRange.value.start || !dateRange.value.end ||
      (new Date(quote.valid_until) >= new Date(dateRange.value.start) &&
       new Date(quote.valid_until) <= new Date(dateRange.value.end));
    const matchesName = !nameFilter.value || quote.guest_name.toLowerCase().includes(nameFilter.value.toLowerCase());
    const matchesEmail = !emailFilter.value || quote.guest_email.toLowerCase().includes(emailFilter.value.toLowerCase());

    return isDateInRange && matchesName && matchesEmail;
  });
});

const viewQuoteDetails = async (id) => {
  // Fetch or filter details based on id
  selectedQuote.value = quotes.value.find(quote => quote.id === id);
  // Simulate fetching details
  quoteDetails.value = [
    {
      volume: '500 m3',
      total_weight: '1000 kg',
      invoice_price: '2000 USD',
      type_of_merchandise: 'Electronics',
      first_import: 'No',
      port_of_origin: 'Port A',
      incoterm: 'FOB',
      destination_location: 'Location B',
      unit_of_measurement: 'TEU'
    }
  ];
  dialog.value = true;
};

const createQuote = () => {
  // Logic to create a new quote
  console.log('Create Quote button clicked.');
};

const closeDialog = () => {
  dialog.value = false;
};

const deleteQuote = (id) => {
  quotes.value = quotes.value.filter(quote => quote.id !== id);
  console.log('Quote deleted successfully.');
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-btn color="secondary" @click="createQuote">Create Quote</v-btn>
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
                  v-model:menu="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.start"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
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
                  v-model:menu="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      ref="endDatePicker"
                      v-model="dateRange.end"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateRange.end"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>

          <v-data-table
            :headers="[
              { title: 'Quote Reference', key: 'quote_reference' },
              { title: 'Name', key: 'guest_name' },
              { title: 'Email', key: 'guest_email' },
              { title: 'Total Cost', key: 'total_cost' },
              { title: 'Valid Until', key: 'valid_until' },
              { title: 'Actions', key: 'actions' }
            ]"
            :items="filteredQuotes"
            :loading="isLoading"
            item-key="id"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn @click="viewQuoteDetails(item.id)" color="secondary">View Details</v-btn>
              <v-btn @click="deleteQuote(item.id)" color="red">Delete</v-btn>
            </template>
          </v-data-table>
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
