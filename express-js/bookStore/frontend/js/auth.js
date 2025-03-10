
import { registerUser, loginUser } from '../services/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    }
    try {
        const response = await registerUser(userData);
        console.log(response);
        alert('registration successful')
       
        
    } catch (error) {
        console.error(error);
        alert('registration failed')
        
    }
})

//handling user login

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value

    };

    try {
        const response = await loginUser(credentials);
        console.log('user logged in', response);
        alert('login successful')
        
    } catch (error) {
        console.error(error);
        alert('login failed')
        
    }
})