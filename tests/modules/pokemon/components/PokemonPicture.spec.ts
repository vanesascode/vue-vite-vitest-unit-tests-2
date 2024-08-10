import { mount } from '@vue/test-utils';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

const mountPokemonPictureComponent = (pokemonId: number, showPokemon: boolean) => {
  return mount(PokemonPicture, {
    props: {
      pokemonId,
      showPokemon,
    },
  });
};

describe('<PokemonPicture />', () => {
  it('should render the hidden image when showPokemon prop is false', () => {
    const wrapper = mountPokemonPictureComponent(1, false);
    expect(wrapper.find('.pokemon__dark').exists()).toBe(true);
  });

  it('should render the visible image when showPokemon prop is true', () => {
    const wrapper = mountPokemonPictureComponent(1, true);
    expect(wrapper.find('.fade-in').exists()).toBe(true);
  });

  it('should render the id in the pokemonImage source and the rest of the image attributes', () => {
    const pokemonId = 25;
    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: false },
    });

    console.log(wrapper.html());

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        src: imageSource,
        alt: 'pokemon image',
        class: 'pokemon pokemon__dark mt-2',
      }),
    );
  });
});
