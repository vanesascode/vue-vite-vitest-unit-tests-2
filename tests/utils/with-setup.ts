import { createApp } from 'vue';

// we create this, because the usePokemonGame composable uses an onMounted hook

export const withSetup = (composable: () => any) => {
  let result: any;

  const app = createApp({
    setup() {
      result = composable();

      return () => {};
    },
  });

  app.mount(document.createElement('div'));

  return [result, app] as const;
};
