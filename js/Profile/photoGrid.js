document.addEventListener("DOMContentLoaded", function () {
    const photoGrid = document.getElementById("photo-grid");
    const photoItems = photoGrid.querySelectorAll(".photo-item");
    const maxVisibleImages = 4;

    photoItems.forEach((item, index) => {
        if (index >= maxVisibleImages) {
            item.style.display = 'none';
        }

        // Handle the "view more" overlay if there are more than 4 images
        if (index === maxVisibleImages - 1 && photoItems.length > maxVisibleImages) {
            const viewMoreOverlay = document.createElement('div');
            viewMoreOverlay.classList.add('view-more');
            viewMoreOverlay.innerHTML = `+${photoItems.length - maxVisibleImages}`;
            viewMoreOverlay.addEventListener('click', () => openCarousel(photoItems, maxVisibleImages));
            item.appendChild(viewMoreOverlay);
        }
    });

    // Determine the layout class based on the number of images
    switch (photoItems.length) {
        case 1:
            photoGrid.classList.add('one-image');
            break;
        case 2:
            photoGrid.classList.add('two-images');
            break;
        case 3:
            photoGrid.classList.add('three-images');
            break;
        default:
            photoGrid.classList.add('four-plus-images');
            break;
    }

    // Carousel functionality
    const carousel = document.getElementById("carousel");
    const carouselInner = document.getElementById("carousel-inner");
    const closeBtn = document.getElementsByClassName("carousel-close")[0];

    function openCarousel(photoItems, startFrom) {
        carouselInner.innerHTML = ''; // Clear any existing images
        photoItems.forEach((item, index) => {
            if (index >= startFrom) {
                const imgClone = item.querySelector('img').cloneNode();
                carouselInner.appendChild(imgClone);
            }
        });
        carousel.style.display = "flex";
    }

    // Close carousel
    closeBtn.onclick = function () {
        carousel.style.display = "none";
    }

    // Close carousel when clicking outside the image
    carousel.onclick = function (event) {
        if (event.target === carousel) {
            carousel.style.display = "none";
        }
    }
});