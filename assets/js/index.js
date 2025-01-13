document.addEventListener("DOMContentLoaded", () => {
  const carouselItems = document.querySelector(".carousel-items");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;

  // Função para carregar o JSON (substitua o caminho pelo arquivo JSON real ou uma API)
  async function fetchData() {
    const response = await fetch("receitas.json");
    const data = await response.json();
    return data;
  }

  // Função para criar os itens do carrossel
  function createCarouselItems(data) {
    data.forEach((item) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.nome;

      const nome = document.createElement("p");
      nome.textContent = item.nome;

      carouselItem.appendChild(img);
      carouselItem.appendChild(nome);
      carouselItems.appendChild(carouselItem);
    });
  }

  // Função para atualizar o carrossel
  function updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const itemWidth = items[0].clientWidth;
    carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  // Botões de navegação
  prevButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".carousel-item");
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".carousel-item");
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Carregar os dados e inicializar o carrossel
  fetchData()
    .then((data) => {
      createCarouselItems(data);
    })
    .then(() => {
      updateCarousel();
    })
    .catch((error) => console.error("Erro ao carregar o JSON:", error));
});

