const API_URL = 'http://localhost:3000';

const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");
const showRegisterLink = document.getElementById("show-register");
const showLoginLink = document.getElementById("show-login");

let usuarios = [];

showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
});

showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
});

fetch(`${API_URL}/usuarios`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        usuarios = data; 
        console.log('Dados carregados com sucesso:', usuarios);

        configurarLogin();
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });

function configurarLogin() {
        const loginForm = document.querySelector('#login-box form');
    
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const loginInput = loginForm.querySelector('#login-input').value; 
            const senhaInput = loginForm.querySelector('input[type="password"]').value;
            const senhaHash = CryptoJS.SHA256(senhaInput).toString(CryptoJS.enc.Base64);

            console.log('Login digitado:', loginInput);
            console.log('Senha digitada:', senhaInput);
    
            if (usuarios.length === 0) {
                alert('Os dados ainda não foram carregados. Tente novamente.');
                return;
            }
    
           const user = usuarios.find(user =>
            (user.login === loginInput || user.email === loginInput) &&
             user.senha === senhaHash);

            if (user) {
                localStorage.setItem('usuarioLogado', JSON.stringify(user));
                window.location.href = '/assets/pages/index/index.html';
            } else {
                alert('Login ou senha inválidos!');
            }
        });
    }    

const registerForm = document.querySelector('#register-box form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeInput = registerForm.querySelector('input[name="nome"]').value.trim(); 
    const loginInput = registerForm.querySelector('input[name="login"]').value.trim(); 
    const emailInput = registerForm.querySelector('input[name="email"]').value.trim(); 
    const senhaInput = registerForm.querySelector('input[name="senha"]').value.trim();

    const senhaHash = CryptoJS.SHA256(senhaInput).toString(CryptoJS.enc.Base64);

    if (!nomeInput || !emailInput || !senhaInput || !loginInput) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    fetch(`${API_URL}/usuarios`)
        .then(response => response.json())
        .then(usuarios => {

            const loginExists = usuarios.some(user => user.login === loginInput);
            const emailExists = usuarios.some(user => user.email === emailInput);

            if (loginExists) {
                alert('Este nome de usuário já está em uso!');
                return;
            }

            if (emailExists) {
                alert('Este email já está em uso!');
                return;
            }

            const novoUsuario = {
                id: usuarios.length + 1,
                login: loginInput,
                senha: senhaHash,
                nome: nomeInput,
                email: emailInput
            };

            return fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });
        })
        .then((response) => {
            if (response.ok) {
                const modal = document.getElementById('confirmation-modal');
                modal.style.display = 'flex'; 

                registerForm.reset(); 
                setTimeout(() => {
                    window.location.href = '/assets/pages/index/index.html';
                }, 3000);
            } else {
                alert('Erro ao cadastrar o usuário!');
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});

const inputBoxes = document.querySelectorAll('.input-box input');

inputBoxes.forEach(input => {

    input.addEventListener('focus', () => {
        const label = input.nextElementSibling;  
        label.classList.add('float'); 
    });

    input.addEventListener('blur', () => {
        const label = input.nextElementSibling; 
        if (input.value.trim() === "") {
            label.classList.remove('float'); 
        }
    });
});

const passwordInput = document.querySelector('#senha');
const togglePasswordCheckbox = document.querySelector('#toggle-password');

togglePasswordCheckbox.addEventListener('change', () => {

    passwordInput.type = togglePasswordCheckbox.checked ? 'text' : 'password';
});

