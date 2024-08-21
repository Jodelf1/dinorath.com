// Videos Carrousel
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.video-card');
    const dots = document.querySelectorAll('.dot');
    const backgroundVideo = document.getElementById('background-video');
    const videoContainer = document.querySelector('.videos-section');

    let activeIndex = 0;
    let startX = 0;
    let endX = 0;

    function updateCarousel(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Transição suave da opacidade
        backgroundVideo.style.opacity = 0; // Tornar o vídeo atual invisível
        setTimeout(() => {
            const bgVideo = cards[index].dataset.bg;
            backgroundVideo.src = bgVideo;
            backgroundVideo.load();
            backgroundVideo.oncanplay = () => {
                backgroundVideo.style.opacity = 1; // Tornar o novo vídeo visível
            };
        }, 500); // Espera pela duração da transição
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activeIndex = index;
            updateCarousel(index);
        });
    });

    // Adiciona eventos de toque ao contêiner específico de vídeos
    videoContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    videoContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    videoContainer.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            // Deslizou para a esquerda
            activeIndex = (activeIndex < cards.length - 1) ? activeIndex + 1 : 0;
        } else if (startX < endX - 50) {
            // Deslizou para a direita
            activeIndex = (activeIndex > 0) ? activeIndex - 1 : cards.length - 1;
        }
        updateCarousel(activeIndex);
    });

    // Inicializa o carrossel
    updateCarousel(activeIndex);
});


// Lançamentos
document.addEventListener('DOMContentLoaded', () => {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const conjuntos = document.querySelectorAll('.conjunto');
    const lancamentosContainer = document.querySelector('.lancamentos-section');

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    function updateCarousel() {
        conjuntos.forEach((conjunto, index) => {
            conjunto.classList.toggle('active', index === currentIndex);
        });
    }

    prevArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : conjuntos.length - 1;
        updateCarousel();
    });

    nextArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex < conjuntos.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Adiciona eventos de toque ao contêiner específico de lançamentos
    lancamentosContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lancamentosContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    lancamentosContainer.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            // Deslizou para a esquerda
            currentIndex = (currentIndex < conjuntos.length - 1) ? currentIndex + 1 : 0;
        } else if (startX < endX - 50) {
            // Deslizou para a direita
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : conjuntos.length - 1;
        }
        updateCarousel();
    });

    // Inicializa o carrossel
    updateCarousel();
});



// premios
document.addEventListener('DOMContentLoaded', () => {
    const prevArrow = document.querySelector('.prev-p');
    const nextArrow = document.querySelector('.next-p');
    const conjuntos = document.querySelectorAll('.premio');
    const premiosContainer = document.querySelector('.premios-container');

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    function updateCarouselP() {
        conjuntos.forEach((conjunto, index) => {
            conjunto.classList.toggle('active', index === currentIndex);
        });
    }

    prevArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : conjuntos.length - 1;
        updateCarouselP();
    });

    nextArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex < conjuntos.length - 1) ? currentIndex + 1 : 0;
        updateCarouselP();
    });

    // Adiciona eventos de toque ao contêiner específico de prêmios
    premiosContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    premiosContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    premiosContainer.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            // Deslizou para a esquerda
            currentIndex = (currentIndex < conjuntos.length - 1) ? currentIndex + 1 : 0;
        } else if (startX < endX - 50) {
            // Deslizou para a direita
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : conjuntos.length - 1;
        }
        updateCarouselP();
    });

    // Inicializa o carrossel
    updateCarouselP();
});

// Ajuste na viewport
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Execute na carga da página
setVh();

// Atualize ao redimensionar a janela
window.addEventListener('resize', setVh);


