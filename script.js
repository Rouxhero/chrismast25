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

$(document).ready(function () {
    const slides = $('.slide');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // Durée de chaque slide en ms

    function showSlide(index) {
        slides.each((i, slide) => {
            if (i === index) {
                $(slide).css('display', 'flex');
                // Add a random color background radian
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
                $(slide).css('background', `linear-gradient(45deg, #${randomColor}, #${randomColor2})`);
                // Make appear the <p> after 2 sec
                setTimeout(() => {
                    $(slide).find('p').css('opacity', '1');
                }, 1000);
                animateProgressBar(slide);
            } else {
                $(slide).css('display', 'none');
                resetProgressBar(slide);
            }
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
        slideInterval = setInterval(nextSlide, slideDuration);
        const audio = $(slides[currentSlide]).find('audio')[0];
        if (audio) audio.play();
    }

    function stopSlideShow() {
        
        resetProgressBar($('.slide')[currentSlide]);
        clearInterval(slideInterval);
        const audio = $(slides[currentSlide]).find('audio')[0];
        if (audio) audio.pause();
    }

    function animateProgressBar(slide) {
        const progressBar = $(slide).find('.progress-bar');
        gsap.fromTo(
            progressBar,
            { width: '0%' },
            { width: '100%', duration: slideDuration / 1000, ease: 'linear' }
        );
    }

    function resetProgressBar(slide) {
        const progressBar = $(slide).find('.progress-bar');
        gsap.set(progressBar, { width: '0%' });
    }

    // Gestion des boutons de contrôle
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
