<template>
  <section>
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
      alt="pokemon image"
      class="pokemon-image"
    />
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.pokemon-image {
  width: 200px;
  height: 200px;
  filter: brightness(0);

  /* so user cannot drag image:  */
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
