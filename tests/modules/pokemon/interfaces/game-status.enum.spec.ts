import { GameStatus } from '@/modules/pokemon/interfaces';

describe('GameStatus enum', () => {
  it('should have a value of playing', () => {
    expect(GameStatus.playing).toBe('playing');
  });

  it('should have a value of won', () => {
    expect(GameStatus.won).toBe('won');
  });

  it('should have a value of lost', () => {
    expect(GameStatus.lost).toBe('lost');
  });
});
