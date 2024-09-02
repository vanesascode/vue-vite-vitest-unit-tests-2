import { describe, it, expect } from 'vitest';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { createPinia, setActivePinia } from 'pinia';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../../../data/fake-pokemons';
import confetti from 'canvas-confetti';

const pinia = createPinia();
setActivePinia(pinia);

const mockPokemonApi = new MockAdapter(pokemonApi); //pokemonApi is our instance of axios in the pokemonApi file

// now we are mocking the getPokemons method in the composable. We get the data we want of what we see if we make the call in thunderClient or Postman:
mockPokemonApi.onGet('?limit=151').reply(200, {
  results: pokemonListFake,
});

//The vi.mock function is used to mock a specific module or library during testing.
vi.mock('canvas-confetti', () => ({
  //object representing the mocked module:
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  it('should initialize correctly with default values', async () => {
    const [results] = withSetup(() => usePokemonGame());

    expect(results.gameStatus.value).toBe(GameStatus.playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toHaveLength(0);
    expect(results.randomPokemon.value).toBeUndefined();

    // flushPromises makes sure all promises are finished:
    await flushPromises();

    expect(results.gameStatus.value).toBe(GameStatus.playing);
    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value).toHaveLength(2);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  it('should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    results.gameStatus.value = GameStatus.won;

    results.getNextRound(3);

    expect(results.gameStatus.value).toBe(GameStatus.playing);
    expect(results.pokemonOptions.value).toHaveLength(3);
  });

  it('should correctly handle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const initialPokemonOptions = [...results.pokemonOptions.value];

    results.getNextRound();

    const newPokemonOptions = results.pokemonOptions.value;

    expect(newPokemonOptions).not.toEqual(initialPokemonOptions);

    //initialPokemonOptions: Uses [] to initialize as an empty array.
    // newPokemonOptions: Does not use [] because it is assigned a value from another source, such as a function or variable.
  });

  it('should correctly handle an incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.playing);

    checkAnswer(100000000000);

    expect(gameStatus.value).toBe(GameStatus.lost);
  });

  it('should correctly handle an correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.playing);

    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 },
    });

    //This will give a warning, which will be solved by mocking the canvas-confetti module:
    expect(gameStatus.value).toBe(GameStatus.won);
  });
});
