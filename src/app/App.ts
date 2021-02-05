import { logGameObject } from './manuals/dynamicModeManual';

export class App {
  init(): string {
    logGameObject();
    return 'hello world';
  }
}
