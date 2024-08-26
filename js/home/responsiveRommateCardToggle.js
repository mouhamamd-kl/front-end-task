document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.available-rommate .rommate-swiper .card');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            // For small screens, toggle the active class
            if (window.innerWidth <= 768) {
                // If the clicked card is already active, remove the active class
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    // Remove active class from all other cards
                    cards.forEach(c => c.classList.remove('active'));

                    // Add active class to the clicked card
                    this.classList.add('active');
                }
            }
        });
    });

    // Optional: handle resizing to ensure active state is removed when resizing to larger screens
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            cards.forEach(c => c.classList.remove('active'));
        }
    });
});
