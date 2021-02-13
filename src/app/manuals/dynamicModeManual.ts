// in the play in the dynamic mode, until mode modal has option to choose
// dynamic mode
// in the file: src/app/ViewController
// in the lines: 41-63 (the launchGame method)
// UNCOMMENT AND INSERT INSTEAD:

// launchGame(players: PlayerDTO[], isModeDynamic?: boolean): void {
//   const config: Configuration = new Configuration(
//     dynamicGameConfiguration,
//   );
//   if (true) {
//     const numberOfPlayers = players.length;
//     config.livestockConfig = config.livestockConfig.map(
//       (animal) => {
//         if (animal.name === AnimalNames.RABBIT)
//           animal.bankInitialStock -= numberOfPlayers;
//         return animal;
//       },
//     );
//   }
//   config.playersConfig = players;
//   this.gameController = new GameController(this, config);
//   this.startGame(
//     this.gameController.theGame.thePlayers,
//     this.gameController.theGame.theCurrentPlayer,
//     this.gameController.theGame.theBank,
//   );
// }
