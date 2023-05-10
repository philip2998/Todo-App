import axios from 'axios';
import AlertsHandler from './AlertsHandler.js';

export default class AuthenticationHandler {
  static async login(email, password) {
    try {
      const result = await axios({
        method: 'POST',
        utl: 'http://127.0.0.1:5000/api/users/login',
        data: {
          email,
          password,
        },
      });

      if (result.data.status === 'success') {
        AlertsHandler.showAlert('success', 'Logged in successfully');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      AlertsHandler.showAlert('error', err.response.data.message);
    }
  }

  static async logout() {
    try {
      const result = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/users/logout',
      });
      if (result.data.status == 'success') location.reload(true);
    } catch (err) {
      console.log(err.response);
      AlertsHandler.showAlert('error', 'Error logging out! Try again!');
    }
  }
}
