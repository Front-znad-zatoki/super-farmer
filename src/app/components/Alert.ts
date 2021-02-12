import { AlertType } from '../../Enums/AlertEnum';
import { Render } from '../utils/Render';

export class Alert {
  private static alert: HTMLElement;

  /**
   * Creates and returns Alert component
   * Usage: Alert.createElement()
   */
  static createElement(): HTMLElement {
    if (!this.alert) {
      this.alert = Render.elementFactory('div', {
        id: 'alert-component',
        className: 'alert',
      });
    }
    return this.alert;
  }

  /**
   * Updates Alert component with given message and alert level
   * Usage: Alert.updateAlert(message, alertType)
   * @param message accepts string with message to be displayed
   * @param alertType accepts AlertType enum with correct level (INFO, WARN, CRITICAL)
   */
  static updateAlert(message: string, alertType: AlertType): void {
    if (!this.alert) {
      throw Error('Alert component not initialized');
    }
    Render.removeAllChildren(this.alert);
    switch (alertType) {
      case AlertType.INFO:
        this.alert.style.backgroundColor = '#3E8Ed0';
        break;
      case AlertType.WARN:
        this.alert.style.backgroundColor = '#FFE08A';
        break;
      case AlertType.CRITICAL:
        this.alert.style.backgroundColor = '#F14668';
        break;
      default:
        this.alert.style.backgroundColor = 'transparent';
        break;
    }
    const icon = Render.elementFactory('img', {
      className: 'alert__icon',
      src: `./static/images/ui/${alertType}.png`,
      alt: `${alertType}-alert`,
    });
    const text = Render.elementFactory(
      'div',
      { className: 'alert__text' },
      `${message}`,
    );
    Render.childrenInjector(this.alert, icon, text);
  }
}
