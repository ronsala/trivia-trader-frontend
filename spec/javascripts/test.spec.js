function getOpposite(bool) {
  return !bool;
}

describe('Write Your Test Group Descriptions Here', () => {
  it('Write Your Test Expectation Here', () => {
      // arrange
      let bool = false;

      // act
      const result = getOpposite(bool);

      // assert
      expect(result).toBe(true);
  })
});