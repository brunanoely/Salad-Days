let usuarios = []; 

fetch('../../db/receitas.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        usuarios = data.usuarios; 
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

        const loginInput = loginForm.querySelector('input[type="email"]').value;
        const senhaInput = loginForm.querySelector('input[type="password"]').value;

        console.log('Login digitado:', loginInput);
        console.log('Senha digitada:', senhaInput);

        if (usuarios.length === 0) {
            alert('Os dados ainda não foram carregados. Tente novamente.');
            return;
        }

        const user = usuarios.find(user => 
            (user.login.toLowerCase() === loginInput.trim().toLowerCase() || 
             user.email.toLowerCase() === loginInput.trim().toLowerCase()) && 
            user.senha === senhaInput.trim() 
        );

        if (user) {
            alert(`Bem-vindo, ${user.nome}!`);
            window.location.href = '/assets/pages/index/index.html';

        } else {
            alert('Login ou senha inválidos!');
        }
    });
}

