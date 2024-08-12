const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp'); // Add class to start animation
      } else {
        entry.target.classList.remove('fadeInUp'); // Remove class to stop animation
      }
    });
  }, { threshold: 0.1 }); // Adjust the threshold as needed
  
  // Select the target section(s) and observe them
  const targetSection = document.querySelector('.your-section-class');
  observer.observe(targetSection);
  
  // If observing multiple sections
  const targetSections = document.querySelectorAll('.your-section-class');
  targetSections.forEach(section => observer.observe(section));
  