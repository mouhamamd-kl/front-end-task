document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.querySelector('.recommendation-swiper .swiper-wrapper');
    const cardTemplate = document.querySelector('.recommendation-swiper .swiper-wrapper .card');

    for (let i = 0; i < 10; i++) {
        // Clone the card element
        const cardClone = cardTemplate.cloneNode(true);
        
        // Append the clone to the swiper-wrapper
        swiperWrapper.appendChild(cardClone);
    }
});
