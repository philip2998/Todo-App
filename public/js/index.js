import { login, logout } from './login.js';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
