<template>
  <section v-if="isLoading || randomPokemon.id === null">
    <h1>Espere por favor</h1>
    <h3>Cargando Pokémons</h3>
  </section>

  <section v-else class="d-flex justify-center align-center flex-column">
    <h1 v-if="gameStatus === GameStatus.playing">¿Quién es este pokémon?</h1>
    <div v-else>
      <h1 v-if="gameStatus === GameStatus.won" class="text-capitalize">
        ¡Correcto! ¡Es {{ randomPokemon.name }}!
      </h1>

      <h1 v-else-if="gameStatus === GameStatus.lost" class="text-capitalize">
        Perdiste... Es {{ randomPokemon.name }}
      </h1>
    </div>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.playing"
    />

    <PokemonOptions
      :options="options"
      @selected-option="checkAnswer"
      :block-options="gameStatus !== GameStatus.playing"
      :correct-answer="randomPokemon.id"
    />

    <div class="mt-5">
      <v-btn
        v-if="gameStatus !== GameStatus.playing"
        @click="getNextRound()"
        class="text-capitalize w-100"
        style="min-width: 10.5rem"
        >Juega otra vez
      </v-btn>
    </div>
    <div class="d-flex justify-center align-start ga-6 flex-wrap mt-8 mb-3 px-4">
      <GameLevels @options-number="changeLevel" />
      <PointsBox :wins="wins" :loses="loses" :times-played="timesPlayed" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useLevelStore } from '@/stores/useLevelStore';
import { usePointsStore } from '@/stores/usePointsStore';
import PokemonPicture from '@pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@pokemon/components/PokemonOptions.vue';
import GameLevels from '@pokemon/components/GameLevels.vue';
import { usePokemonGame } from '@pokemon/composables/usePokemonGame';
import { GameStatus } from '../interfaces';
import PointsBox from '../components/PointsBox.vue';

const levelStore = useLevelStore();
const pointsStore = usePointsStore();

const wins = computed(() => pointsStore.wins);
const loses = computed(() => pointsStore.loses);
const timesPlayed = computed(() => pointsStore.timesPlayed);

const changeLevel = (level: number) => {
  levelStore.setLevel(level);
  getNextRound(level);
};
const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

watch(gameStatus, (newStatus) => {
  if (newStatus === GameStatus.won) {
    pointsStore.incrementWins();
  } else if (newStatus === GameStatus.lost) {
    pointsStore.incrementLoses();
  }
});
</script>

<style scoped></style>
