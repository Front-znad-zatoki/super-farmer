import { Game } from '../logic/Game';
// TO LOG THE GAME OBJECT ADD  logGameObject() in APP.TS
export function logGameObject(): void {
  const newGame = new Game();
  console.log(newGame);
}
