import { BankBoard } from '../app/components/BankBoard';

export class App {
  init(): string {
    const view = new BankBoard().renderBankBoard();
    return 'hello world';
  }
}
