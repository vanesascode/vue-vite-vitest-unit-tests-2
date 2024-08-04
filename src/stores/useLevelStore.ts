import { defineStore } from 'pinia';

export const useLevelStore = defineStore('level', {
  state: () => ({
    level: 4,
  }),
  actions: {
    setLevel(level: number) {
      this.level = level;
    },
  },
  getters: {
    getLevel: (state) => state.level,
  },
});
