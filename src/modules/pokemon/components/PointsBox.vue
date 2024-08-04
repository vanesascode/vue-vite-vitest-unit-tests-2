<template>
  <div class="d-flex flex-column justify-center align-center">
    <h3 class="text-center">Tu puntuación:</h3>

    <div class="text-capitalize button mt-2 w-100 text-center partidas-color">
      Partidas: {{ timesPlayed }}
    </div>
    <div class="d-flex justify-center ga-3 mt-2">
      <div class="text-capitalize button">
        Has ganado {{ wins }} {{ wins === 1 ? 'vez' : 'veces' }}
      </div>
      <div class="text-capitalize button">
        Has perdido {{ loses }} {{ loses === 1 ? 'vez' : 'veces' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PointsBoxProps {
  wins: number;
  loses: number;
  timesPlayed: number;
}

defineProps<PointsBoxProps>();
</script>

<style scoped>
.partidas-color {
  background-color: rgb(83, 165, 83) !important;
}

.button {
  min-width: 5rem;
  background-color: rgb(120, 118, 118);
  font-size: 0.7rem;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  color: white;
}
</style>
