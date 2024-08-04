import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
import { useLevelStore } from '@/stores/useLevelStore';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const levelStore = useLevelStore();

  //it is computed to create a reactive property that automatically updates its value based on the state of other reactive properties—in this case, pokemons:
  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
  const level = computed(() => levelStore.level);

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

  const getNextRound = (howMany: number = level.value) => {
    gameStatus.value = GameStatus.playing;
    // The ones we are showing:
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    // The rest to play after this round:
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.won;
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.6 },
      });
      return;
    }
    gameStatus.value = GameStatus.lost;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    getNextRound,
    checkAnswer,
  };
};
