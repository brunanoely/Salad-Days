
    const carrosselContainer = document.querySelector('.carrossel-container');
    const cards = document.querySelectorAll('.card');
    const botaoAnterior = document.getElementById('anterior');
    const botaoProximo = document.getElementById('proximo');

    let index = 0;
    const maxVisivel = 4; // Quantidade máxima de cards visíveis por vez
    const totalCards = cards.length;

    const atualizarCarrossel = () => {
      const larguraCard = cards[0].offsetWidth;
      carrosselContainer.style.transform = `translateX(-${index * larguraCard}px)`;
    };

    botaoProximo.addEventListener('click', () => {
      if (index < totalCards - maxVisivel) {
        index++;
        atualizarCarrossel();
      }
    });

    botaoAnterior.addEventListener('click', () => {
      if (index > 0) {
        index--;
        atualizarCarrossel();
      }
    });
