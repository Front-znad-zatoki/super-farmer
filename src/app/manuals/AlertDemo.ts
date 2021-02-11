import { AlertType } from '../../Enums/AlertEnum';
import { Alert } from '../components/Alert';
import { Render } from '../utils/Render';

// to run this demo use AlertDemo.playDemo() in App.ts

export class AlertDemo {
  static playDemo(): void {
    Render.render('#sf-app', Alert.createElement());
    Alert.updateAlert('Lorem ipsum dolor sei', AlertType.INFO);
    setTimeout(
      () =>
        Alert.updateAlert('The time is running out!', AlertType.WARN),
      5000,
    );
    setTimeout(
      () => Alert.updateAlert('Turn has passed!', AlertType.CRITICAL),
      10000,
    );
  }
}
