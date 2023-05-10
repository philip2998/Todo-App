export default class AlertsHandler {
  static showAlert(type, message) {
    const markup = `<div class="alert alert--${type}">${message}</div>`;
    document.querySelector('body').prepend(markup);
    window.setTimeout(Alerts.hideAlert, 5000);
  }

  static hideAlert() {
    const element = document.querySelector('.alert');
    if (element) element.parentElement.removeChild(element);
  }
}
