$(document).ready(function() {
    new mdb.Animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.about-our-app .image');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((image, i) => {
            image.classList.remove('active');
            image.style.zIndex = i === index ? 3 : (i < index ? 2 : 1); // Adjust z-index based on the order
        });
        images[index].classList.add('active');
    }

    document.querySelector('.carousel-prev').addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    document.querySelector('.carousel-next').addEventListener('click', function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Initially show the first image
    showImage(currentIndex);
});