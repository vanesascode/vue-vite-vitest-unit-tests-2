<template>
  <div>
    <h3 class="text-center">Escoge nivel:</h3>
    <div class="d-flex justify-center ga-3 mt-2">
      <v-btn
        color="black"
        size="small"
        v-for="(level, index) in levels"
        @click="$emit('optionsNumber', optionsNumber[index])"
        :key="level"
        style="min-width: 5rem; color: white"
        >{{ level }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const levels = ['fácil', 'medio', 'difícil'];
const optionsNumber = [2, 4, 6];

defineEmits<{
  optionsNumber: [optionsNumber: number];
}>();
</script>

<style scoped></style>
