// Lançamentos
document.addEventListener('DOMContentLoaded', () => {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const conjuntos = document.querySelectorAll('.conjunto');

    let currentIndex = 0;

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

    // Inicializa o carrossel
    updateCarousel();
});

// Videos
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.video-card');
    const dots = document.querySelectorAll('.dot');
    const backgroundVideo = document.getElementById('background-video');

    let activeIndex = 0;

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

    // Inicializa o carrossel
    updateCarousel(activeIndex);
});