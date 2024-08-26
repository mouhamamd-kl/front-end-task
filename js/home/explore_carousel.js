document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.carousel-inner .city-card');
    const nextButton = document.querySelector('.carousel-control.next');
    const prevButton = document.querySelector('.carousel-control.prev');
    let itemsPerPage = window.innerWidth <= 768 ? 1 : 3; // 1 item for small screens, 3 for larger screens
    let currentIndex = 0;

    function showItems(startIndex) {
        // Hide all items first
        items.forEach((item, index) => {
            item.style.display = 'none';
            item.style.opacity = 0;
        });

        // Show the required number of items with a smooth fade-in effect
        for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
            if (items[i]) {
                items[i].style.display = 'block';
                setTimeout(() => {
                    items[i].style.opacity = 1;
                }, 100); // Slightly longer delay for smoother transition
            }
        }
    }

    function updateIndex(newIndex) {
        const maxIndex = Math.max(0, items.length - itemsPerPage);
        currentIndex = Math.min(Math.max(newIndex, 0), maxIndex);
        showItems(currentIndex);
    }

    nextButton.addEventListener('click', () => {
        updateIndex(currentIndex + itemsPerPage);
    });

    prevButton.addEventListener('click', () => {
        updateIndex(currentIndex - itemsPerPage);
    });

    // Initialize the first set of items
    showItems(currentIndex);

    // Update itemsPerPage dynamically on window resize
    window.addEventListener('resize', function () {
        itemsPerPage = window.innerWidth <= 768 ? 1 : 3;
        updateIndex(0); // Reset to the first items on resize
    });
});
