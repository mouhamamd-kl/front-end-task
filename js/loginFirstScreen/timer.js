document.addEventListener('DOMContentLoaded', function () {
    // Countdown Timer
    let timeLeft = 299; // 4:59 in seconds
    const timerElement = document.getElementById('timer');

    function startTimer() {
        const timerInterval = setInterval(function () {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
            }

            timeLeft--;
        }, 1000);
    }

    startTimer();

    // Resend Link functionality
    const resendLink = document.getElementById('resendLink');
    resendLink.addEventListener('click', function (e) {
        e.preventDefault();
        timeLeft = 299;
        startTimer();
    });

    // Input focus management
    const inputs = document.querySelectorAll('.code-input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length > 0 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });
});
