<template>
  <section class="d-flex flex-column ga-3 mt-3">
    <v-btn
      data-test-id="pokemon-option"
      v-for="{ name, id } in options"
      :key="id"
      size="large"
      @click="handleOptionClick(id)"
      :class="[
        'text-capitalize w-100',
        {
          correct: correctAnswer === id && blockOptions,
          incorrect: correctAnswer !== id && blockOptions,
        },
      ]"
      style="min-width: 10.5rem"
      :disabled="blockOptions"
      >{{ name }}</v-btn
    >
  </section>
</template>

<script setup lang="ts">
import { usePointsStore } from '@/stores/usePointsStore';
import type { Pokemon } from '../interfaces';

const pointsStore = usePointsStore();

interface PokemonOptionsProps {
  options: Pokemon[];
  blockOptions?: boolean;
  correctAnswer: number;
}

defineProps<PokemonOptionsProps>();

const emit = defineEmits<{
  selectedOption: [id: number];
}>();

const handleOptionClick = (id: number) => {
  pointsStore.incrementTimesPlayed();
  emit('selectedOption', id);
};
</script>

<style scoped>
.correct {
  background-color: rgb(4, 170, 4) !important;
  color: rgb(250, 240, 240);
}

.incorrect {
  background-color: rgb(48, 43, 43);
  color: white;
}
</style>
