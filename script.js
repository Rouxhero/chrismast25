window.addEventListener('load', function () {
    // Récupération de la date actuelle
    const date = new Date();
    const eventDate = new Date('2024-12-23T00:00:00');
    const diff = eventDate - date;

    if (diff > 0) {
        document.getElementById('countdown-container').style.display = 'block';
        setInterval(updateCountdown, 1000);
    } else {
        document.getElementById('wrapped-container').style.display = 'flex';
    }
});

// Mise à jour du compte à rebours
function updateCountdown() {
    const date = new Date();
    const eventDate = new Date('2024-12-23T00:00:00');
    const diff = eventDate - date;

    if (diff <= 0) {
        clearInterval(updateCountdown);
        document.getElementById('countdown-container').classList.add('hidden');
        document.getElementById('wrapped-container').classList.remove('hidden');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds
    `;
}

// Création des sapins volants
const flyingTreesContainer = document.getElementById('flying-trees');

function createTree() {
    const tree = document.createElement('div');
    tree.classList.add('tree');

    // Position et taille aléatoires
    tree.style.left = Math.random() * 100 + 'vw';
    tree.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 30 + 20;
    tree.style.width = `${size}px`;
    tree.style.height = `${size}px`;

    flyingTreesContainer.appendChild(tree);

    // Suppression de l'arbre après l'animation
    setTimeout(() => tree.remove(), 10000);
}

setInterval(createTree, 500); // Création des sapins toutes les 500 ms

// Animation spécifique pour la slide "Chartres"
function showChartresSlide() {
    const galleryImages = $('#chartres-slide .gallery img');

    gsap.fromTo(
        galleryImages,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
        }
    );
}

// Gestion des slides
$(document).ready(function () {
    const slides = $('.slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (currentSlide === 1) {
            showChartresSlide();
        }

        slides.each((i, slide) => {
            $(slide).css('display', i === index ? 'flex' : 'none');
        });

        gsap.fromTo(
            slides[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;

        gsap.to(slides[currentSlide], {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                $(slides[currentSlide]).css('display', 'none');
                currentSlide = nextIndex;
                showSlide(currentSlide);
            },
        });
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 8000);
        const audio = $(slides[currentSlide]).find('audio')[0];
        if (audio) audio.play();
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
        const audio = $(slides[currentSlide]).find('audio')[0];
        if (audio) audio.pause();
    }

    $('#control-pause').click(function () {
        $(this).hide();
        $('#control-play').show();
        stopSlideShow();
    });

    $('#control-play').click(function () {
        $(this).hide();
        $('#control-pause').show();
        startSlideShow();
    });

    // Initialisation
    showSlide(currentSlide);
    startSlideShow();
});
