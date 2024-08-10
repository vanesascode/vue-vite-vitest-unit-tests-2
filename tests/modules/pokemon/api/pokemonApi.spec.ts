import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';

describe('pokemonApi', () => {
  it('should be configured as expected', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
  });
});
