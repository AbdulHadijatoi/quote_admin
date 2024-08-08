<template>
  <div class="logo">
    <RouterLink to="/dashboard">
        <text style="font-family: sans-serif; font-weight: bold; color: #212121; font-size: 18px;">Admin Panel</text>
      
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
