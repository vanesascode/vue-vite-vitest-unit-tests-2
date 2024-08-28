import { describe, it, expect } from 'vitest';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { createPinia, setActivePinia } from 'pinia';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../../../data/fake-pokemons';

const pinia = createPinia();
setActivePinia(pinia);

const mockPokemonApi = new MockAdapter(pokemonApi); //pokemonApi is our instance of axios in the pokemonApi file

// now we are mocking the getPokemons method in the composable. We get the data we want of what we see if we make the call in thunderClient or Postman:
mockPokemonApi.onGet('?limit=151').reply(200, {
  results: pokemonListFake,
});

describe('usePokemonGame', () => {
  it('should initialize correctly with default values', async () => {
    const [results, app] = withSetup(() => usePokemonGame());

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
});
