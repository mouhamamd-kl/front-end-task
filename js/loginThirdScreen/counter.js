// Select all qty containers
const qtyContainers = document.querySelectorAll('.qty');

qtyContainers.forEach(container => {
    const countInput = container.querySelector('.count'); // Find the input in the current container
    const up = container.querySelector('.plus'); // Find the plus button in the current container
    const down = container.querySelector('.minus'); // Find the minus button in the current container

    // Function to get the current value
    function getCountValue() {
        return parseInt(countInput.value); // Ensure value is an integer
    }

    // Listen for changes in the input field
    countInput.addEventListener('input', () => {
        console.log("Updated count value:", getCountValue());
    });

    // Handle plus button click
    up.addEventListener('click', () => {
        let currentValue = getCountValue();
        countInput.value = currentValue + 1; // Increment value
        console.log("Increased count value:", getCountValue());
    });

    // Handle minus button click
    down.addEventListener('click', () => {
        let currentValue = getCountValue();
        if (currentValue > 1) { // Prevent going below 1
            countInput.value = currentValue - 1;
        }
        console.log("Decreased count value:", getCountValue());
    });
});
