$(document).ready(function () { // Get the input element
    const countInput = document.querySelector('.qty .count');

    // Function to get the current value
    function getCountValue() {
        return countInput.value;
    }

    // Example usage: you can call this function when you need to get the value
    console.log("Count value:", getCountValue()); // This will print the current value of the input field

    // Optionally, you can also listen to changes in the input
    countInput.addEventListener('input', () => {
        console.log("Updated count value:", getCountValue());
    });
    $('.count').prop('disabled', true);
    $(document).on('click', '.plus', function () {
        $('.count').val(parseInt($('.count').val()) + 1);
        console.log("Decreased count value:", getCountValue());

    });
    $(document).on('click', '.minus', function () {
        $('.count').val(parseInt($('.count').val()) - 1);
        if ($('.count').val() == 0) {
            $('.count').val(1);
            console.log("Increased count value:", getCountValue());
        }
    });
});