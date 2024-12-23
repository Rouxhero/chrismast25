// Countdown Timer
const countdownContainer = document.getElementById("countdown-container");
const slidesContainer = document.getElementById("slides-container");
const countdownElement = document.getElementById("countdown");

const targetDate = new Date("December 22, 2024 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        // Show slides
        countdownContainer.classList.add("hidden");
        slidesContainer.classList.remove("hidden");
        startSlides();
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }
}

setInterval(updateCountdown, 1000);

// Slides Transition
function startSlides() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.add("hidden");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove("hidden");
    }

    slides[currentSlide].classList.remove("hidden");
    setInterval(showNextSlide, 5000);
}

const flyingTreesContainer = document.getElementById('flying-trees');

function createTree() {
    const tree = document.createElement('div');
    tree.classList.add('tree');
    
    // Position horizontale aléatoire
    tree.style.left = Math.random() * 100 + 'vw';
    tree.style.top = Math.random() * 100 + 'vh';
    
    // Taille aléatoire
    const size = Math.random() * 30 + 20; // Entre 20px et 50px
    tree.style.width = size + 'px';
    tree.style.height = size + 'px';
    
    flyingTreesContainer.appendChild(tree);
    
    // Supprime l'arbre une fois l'animation terminée
    setTimeout(() => {
        tree.remove();
    }, 10000); // Durée de l'animation floatTree
}

// Crée des sapins à intervalles réguliers
setInterval(createTree, 500);
