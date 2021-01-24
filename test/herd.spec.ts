
describe('Herds method', () => {
  describe('addAnimal, given mock data', () => {
    const testedHerd = new Herd();
    testedHerd.addAnimals('sheep', 2);
    it('should increment the number of specific animal', () => {
      expect(testedHerd.animals[0][1]).toBe(2);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(10,10,10,10,10);
    testedHerd.cullAnimals('fox');
    // const expectedResult = [
    //   [new Sheep(), 10],
    //   [new Cow(), 10],
    //   [new Horse(), 10],
    //   [new Pig(), 10],
    //   [new Rabbit(), 0],
    //   [new SmallDog(), 0],
    //   [new BigDog(), 0],
    // ];
    const expectedResult = new testedHerd(10,10,10,10,0);
    it('should modify the number of specific animal', () => {
      expect(testedHerd.animals).toEqual(expectedResult);
    });
    it('should modify the number of specific animal', () => {
      expect(testedHerd.animals[4][1]).toBe(0);
    });
  });
});

