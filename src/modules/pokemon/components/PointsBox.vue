<template>
  <div>
    <h3 class="text-center">Escoge nivel:</h3>
    <div class="d-flex flex-column justify-center ga-3 mt-2">
      <v-btn style="min-width: 10.5rem; background-color: white" variant="outlined"
        >Has jugado {{ timesPlayed }} {{ timesPlayed === 1 ? 'vez' : 'veces' }}.
      </v-btn>
      <v-btn style="min-width: 10.5rem; background-color: white" variant="outlined"
        >Has ganado {{ wins }} {{ wins === 1 ? 'vez' : 'veces' }}.
      </v-btn>
      <v-btn style="min-width: 10.5rem; background-color: white" variant="outlined"
        >Has perdido {{ loses }} {{ loses === 1 ? 'vez' : 'veces' }}.
      </v-btn>
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

<style scoped></style>
