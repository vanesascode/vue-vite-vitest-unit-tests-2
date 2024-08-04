import { defineStore } from 'pinia';

export const usePointsStore = defineStore('points', {
  state: () => ({
    timesPlayed: 0,
    wins: 0,
    loses: 0,
  }),
  actions: {
    incrementTimesPlayed() {
      this.timesPlayed++;
    },
    incrementWins() {
      this.wins++;
    },
    incrementLoses() {
      this.loses++;
    },
  },
  getters: {
    getTimesPlayed: (state) => state.timesPlayed,
    getWins: (state) => state.wins,
    getLoses: (state) => state.loses,
  },
});
