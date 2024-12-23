
window.addEventListener('load', function() {

    // Get the current date :
    var date = new Date();
    // Compare to the date of the event (here 2024-12-25-00:00:00) :
    var eventDate = new Date('2024-12-23T00:00:00');
    // Calculate the difference in milliseconds :
    var diff = eventDate - date;

    if (diff > 0) { 
        document.getElementById('countdown-container').style.display = 'block';
        setInterval(updateCountdown, 1000);
    }
       else {
        document.getElementById('wrapped-container').style.display = 'flex';
    }
});


function updateCountdown() {
    var date = new Date();
    var eventDate = new Date('2024-12-25T00:00:00');
    var diff = eventDate - date;    
    if (diff <= 0) {
        clearInterval(updateCountdown); // Arrête le compte à rebours
        document.getElementById('countdown-container').classList.add('hidden');
        document.getElementById('wrapped-container').classList.remove('hidden');
        return;
    }
     var days = Math.floor(diff / (1000 * 60 * 60 * 24));
     var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((diff % (1000 * 60)) / 1000);
     document.getElementById('countdown').innerHTML = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
}
const flyingTreesContainer = $("#flying-trees")[0]

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

function showChartresSlide() {
    const galleryImages = $('#chartres-slide .gallery img');

    // Animation pour les images
    gsap.fromTo(
        galleryImages,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2, // Décalage entre les images
        }
    );
}



$(document).ready(function () {
    const slides = $('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        if (currentSlide === 0) {
            showChartresSlide();
        }
        // Assure-toi que toutes les slides sont cachées sauf la suivante
        slides.each((i, slide) => {
            if (i === index) {
                $(slide).css('display', 'flex');
            } else {
                $(slide).css('display', 'none');
            }
        });

        // Anime l'entrée de la nouvelle slide
        gsap.fromTo(
            slides[index],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
     
        // Anime la sortie de la slide actuelle
        gsap.to(slides[currentSlide], {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                $(slides[currentSlide]).css('display', 'none');
                // Montre la slide suivante une fois la sortie terminée
                currentSlide = nextIndex;
                showSlide(currentSlide);
            },
        });
    }

    // Initialise la première slide
    showSlide(currentSlide);

    // Change de slide toutes les 5 secondes
    setInterval(nextSlide, 5000);

    // Lecture audio automatique sur la deuxième slide
    slides.each((i, slide) => {
        if (i === 1) {
            $(slide).find('audio')[0].play();
        }
    });
});
