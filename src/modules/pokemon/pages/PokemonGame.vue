<template>
  <section v-if="isLoading || randomPokemon.id === null">
    <h1>Espere por favor</h1>
    <h3>Cargando Pokémons</h3>
  </section>

  <section v-else class="d-flex justify-center align-center flex-column">
    <h1>¿Quién es este pokémon?</h1>
    <h3>{{ randomPokemon }}</h3>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.playing"
    />

    <PokemonOptions :options="options" @selected-option="onSelectedOption" />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { randomPokemon, isLoading, gameStatus, pokemonOptions: options } = usePokemonGame();

const onSelectedOption = (id: number) => {
  if (gameStatus.value === GameStatus.playing) {
    if (id === randomPokemon.value.id) {
      gameStatus.value = GameStatus.won;
    } else {
      gameStatus.value = GameStatus.lost;
    }
  }
};
</script>

<style scoped></style>
