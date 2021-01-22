interface IHerd {
  rabbits: number;
  sheep: number;
  pigs: number;
  horses: number;
  smallDogs: number;
  bigDogs: number;
}

class Herd implements IHerd {
  rabbits = 0;
  sheep = 0;
  pigs = 0;
  horses = 0;
  smallDogs = 0;
  bigDogs = 0;
}

function createHerd(): IHerd {
  return new Herd();
}

export default createHerd;
