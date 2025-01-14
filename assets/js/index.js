document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.querySelector('.carrossel-items');
  const btnNext = document.querySelector('.next');
  const btnPrev = document.querySelector('.prev');

  let offset = 0;
  const itemWidth = 220; // Largura do item + gap
  const totalItems = carrossel.children.length; // Total de itens
  const visibleItems = 3; // Quantidade de itens visíveis ao mesmo tempo

  btnNext.addEventListener('click', () => {
    const maxOffset = -(itemWidth * (totalItems - visibleItems));
    if (offset > maxOffset) {
      offset -= itemWidth;
      carrossel.style.transform = `translateX(${offset}px)`;
    }
  });

  btnPrev.addEventListener('click', () => {
    if (offset < 0) {
      offset += itemWidth;
      carrossel.style.transform = `translateX(${offset}px)`;
    }
  });
});
