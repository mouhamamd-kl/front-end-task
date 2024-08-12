document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.carousel-image');
  const buttons = document.querySelectorAll('.carousel-buttons button');
  let currentIndex = 0;
  let autoPlayInterval;

  function showImage(index) {
      images.forEach((image, i) => {
          image.style.opacity = i === index ? '1' : '0';
      });
      currentIndex = index;
  }

  function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % images.length;
          showImage(nextIndex);
      }, 3000); // Change image every 3 seconds
  }

  function stopAutoPlay() {
      clearInterval(autoPlayInterval);
  }

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          stopAutoPlay(); // Stop auto-play when manually controlled
          const index = parseInt(button.getAttribute('data-index'));
          showImage(index);
          startAutoPlay(); // Restart auto-play after manual control
      });
  });

  // Initialize the first image
  showImage(currentIndex);
  startAutoPlay(); // Start auto-play on page load
});
