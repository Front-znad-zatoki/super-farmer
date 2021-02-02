import { BankBoard } from '../app/components/BanksBoard';

export class App {
  init(): string {
    const view = new BankBoard().renderBankBoard();
    return 'hello world';
  }
}
