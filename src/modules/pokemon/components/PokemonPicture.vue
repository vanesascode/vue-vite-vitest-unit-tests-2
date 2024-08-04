<template>
  <section>
    <img
      v-if="!showPokemon"
      :src="pokemonImage"
      alt="pokemon image"
      class="pokemon pokemon__dark mt-2"
    />
    <img v-else :src="pokemonImage" alt="pokemon image" class="pokemon fade-in" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PokemonPictureProps {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<PokemonPictureProps>(), {
  showPokemon: false,
});

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style scoped>
.pokemon {
  width: 200px;
  height: 200px;
}

.pokemon__dark {
  filter: brightness(0);

  /* so user cannot drag image:  */
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
