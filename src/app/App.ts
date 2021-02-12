import { BankBoard } from './components/BankBoard';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class App {
  init(): void {
    const bank = new BankBoard();
    const bankView = bank.renderBankBoard(new Bank());
    Render.render('#sf-app', bankView);
    // const view = new ViewController();
    // view.displayMenuView();
  }
}
