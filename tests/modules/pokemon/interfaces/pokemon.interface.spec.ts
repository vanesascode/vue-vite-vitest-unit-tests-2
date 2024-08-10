describe('Pokemon interface', () => {
  const pokemon = {
    id: 1,
    name: 'bulbasaur',
  };

  it('should have an id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  it('should have a name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
