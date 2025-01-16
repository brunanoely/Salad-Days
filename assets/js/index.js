let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function show() {
  image.style.setProperty('--rotate', rotate + 'deg');
  contents.forEach((content, key) => {
    if (key == active){
      content.classList.add('active');
    }else{
      content.classList.remove('active');
    }
  })
}

function nextSlider(){
  active = active + 1 > countItem - 1 ? 0 : active + 1;
  rotate = rotate + rotateAdd;
  show();
}
next.onclick = nextSlider;

function prevSlider(){
  active = active - 1 < 0 ? countItem - 1 : active -1;
  rotate = rotate - rotateAdd;
  show();
}
prev.onClick = prevSlider;
//auto play in nextSlider
const autoNext = setInterval(nextSlider, 5000); //3s

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header'); // Seleciona o elemento <header>
  let lastScrollPosition = 0; // Última posição do scroll
  let isMouseMoving = false; // Flag para rastrear movimento do mouse

  // Função para ocultar ou mostrar o cabeçalho ao rolar a página
  window.addEventListener('scroll', () => {
      const currentScrollPosition = window.scrollY; // Obtém a posição atual do scroll
      if (currentScrollPosition > lastScrollPosition) {
          // Se rolando para baixo, oculta o cabeçalho
          header.classList.add('hidden');
      } else {
          // Se rolando para cima, mostra o cabeçalho
          header.classList.remove('hidden');
      }
      lastScrollPosition = currentScrollPosition;
  });

  // Função para mostrar o cabeçalho ao mover o mouse
  document.addEventListener('mousemove', () => {
      if (!isMouseMoving) {
          header.classList.remove('hidden'); // Mostra o cabeçalho
          isMouseMoving = true;

          // Após 2 segundos sem movimento do mouse, oculta o cabeçalho novamente
          setTimeout(() => {
              isMouseMoving = false;
              if (window.scrollY > 0) {
                  header.classList.add('hidden');
              }
          }, 2000);
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.caixa-menu-principal'); // Seleciona o menu principal
  let lastScrollPosition = 0; // Armazena a última posição do scroll
  let hasScrolledDown = false; // Flag para verificar se o usuário rolou a página

  // Detecta o scroll
  window.addEventListener('scroll', () => {
      const currentScrollPosition = window.scrollY;

      // Verifica se o usuário rolou para baixo
      if (currentScrollPosition > 0) {
          hasScrolledDown = true;
      } else {
          hasScrolledDown = false;
          menu.classList.remove('transparent'); // Remove a transparência ao voltar ao topo
      }

      lastScrollPosition = currentScrollPosition;
  });

  document.addEventListener('mousemove', () => {
      if (hasScrolledDown) {
          menu.classList.add('transparent');
      }
  });
});
