import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import PokemonOptions from '../components/PokemonOptions.vue';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  //it is computed to create a reactive property that automatically updates its value based on the state of other reactive properties—in this case, pokemons:
  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? '';

      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.playing;
    // The ones we are showing:
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    // The rest to play after this round:
    pokemons.value = pokemons.value.slice(howMany);
  };

  onMounted(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    pokemons.value = await getPokemons();
    getNextOptions();

    console.log(pokemonOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    getNextOptions,
  };
};
