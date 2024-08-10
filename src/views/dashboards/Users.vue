<script setup lang="ts">
import { ref, shallowRef } from 'vue';

const headers = [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Dessert (100g serving)',
          },
          { key: 'calories', title: 'Calories' },
          { key: 'fat', title: 'Fat (g)' },
          { key: 'carbs', title: 'Carbs (g)' },
          { key: 'protein', title: 'Protein (g)' },
          { key: 'iron', title: 'Iron (%)' },
        ];
        const items = [
    {
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
    // ... more items
  ]
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-data-table :items="items"></v-data-table>
    </v-col>
  </v-row>
</template>
