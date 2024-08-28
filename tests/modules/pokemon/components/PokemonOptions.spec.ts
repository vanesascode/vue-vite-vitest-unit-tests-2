import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];
const pinia = createPinia();
setActivePinia(pinia);

describe('<PokemonOptions/>', () => {
  it('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      globals: {
        plugins: [pinia],
      },
      props: {
        options,
        blockOptions: false,
        correctAnswer: 1,
      },
    });

    console.log(wrapper.html());

    const buttons = wrapper.findAll('[data-test-id="pokemon-option"]');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index].name);
    });
  });

  it('should emit selectedOption event when button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      globals: {
        plugins: [pinia],
      },
      props: {
        options,
        blockOptions: false,
        correctAnswer: 1,
      },
    });

    const [b1, b2, b3] = wrapper.findAll('[data-test-id="pokemon-option"]');

    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');

    expect(wrapper.emitted().selectedOption).toHaveLength(3); // it has been triggered 3 times
  });

  it('should disable buttons when blockOptions prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      globals: {
        plugins: [pinia],
      },
      props: {
        options,
        blockOptions: true,
        correctAnswer: 1,
      },
    });

    console.log(wrapper.html());

    const buttons = wrapper.findAll('[data-test-id="pokemon-option"]');

    buttons.forEach((button) => {
      expect(button.attributes().disabled).toBe('true');
    });
  });

  it('should apply correct class when blockOptions prop is true', () => {
    const correctAnswer = 2;
    const wrapper = mount(PokemonOptions, {
      globals: {
        plugins: [pinia],
      },
      props: {
        options,
        blockOptions: true,
        correctAnswer,
      },
    });

    console.log(wrapper.html());

    const buttons = wrapper.findAll('[data-test-id="pokemon-option"]');

    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
    });
  });
});
