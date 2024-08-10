<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style>
.v-field--variant-filled .v-field__overlay{
  background: none;
  border-radius: 3px;
}

.v3ti{
  border: 1px solid rgba(0,0,0,0.2) !important;
  padding: 5px;
}

.v3ti .v3ti-tag{
  background-color: rgb(var(--v-theme-lightprimary)) !important;
  color: rgb(var(--v-theme-secondary)) !important;
  border-radius: 20px !important;
  padding: 15px !important;
}

.v3ti--focus{
  border: 0.5px solid rgb(var(--v-theme-secondary)) !important;
}

.v3ti-remove-tag{
  color: rgb(var(--v-theme-secondary)) !important;
  opacity: 1 !important;
}
</style>