<template>
  <section class="d-flex flex-column ga-3 mt-3">
    <v-btn
      v-for="{ name, id } in options"
      :key="id"
      size="large"
      @click="$emit('selectedOption', id)"
      >{{ name }}</v-btn
    >
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface PokemonOptionsProps {
  options: Pokemon[];
}

defineProps<PokemonOptionsProps>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped></style>
