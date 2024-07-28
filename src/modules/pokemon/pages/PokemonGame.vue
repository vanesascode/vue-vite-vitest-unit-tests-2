<template>
  <section v-if="false">
    <h1>Espere por favor</h1>
    <h3>Cargando Pokémons</h3>
  </section>

  <section class="d-flex justify-center align-center flex-column">
    <h1>¿Quién es este pokémon?</h1>

    <PokemonPicture />

    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';

const { gameStatus } = usePokemonGame();
</script>

<style scoped></style>
