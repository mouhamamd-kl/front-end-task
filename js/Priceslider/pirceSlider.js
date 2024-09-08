const priceHistogramCanvas = document.getElementById('priceHistogram');
const ctx = priceHistogramCanvas.getContext('2d');

// Initialize the slider
const priceSlider = document.getElementById('priceSlider');

noUiSlider.create(priceSlider, {
    start: [100, 500],
    connect: true,
    range: {
        'min': 100,
        'max': 500
    },
    step: 1,
    tooltips: false, // Disable tooltips
});

// Generate data with a normal distribution
function generateNormalData(count, mean, stdDev, minValue, maxValue) {
    const data = [];
    for (let i = 0; i < count; i++) {
        let value;
        do {
            // Generate a normal distribution value
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = mean + z * stdDev;
        } while (value < minValue || value > maxValue);

        data.push(value);
    }
    return data;
}

// Create 42 bins
const binCount = 42;
const minValue = 100;
const maxValue = 500;
const mean = 300; // Mean for normal distribution
const stdDev = 70; // Standard deviation

// Generate data and bin it
const rawData = generateNormalData(1000, mean, stdDev, minValue, maxValue);
const histogramData = Array(binCount).fill(0);

// Bin the data
const binWidth = (maxValue - minValue) / binCount;
for (let i = 0; i < rawData.length; i++) {
    const value = rawData[i];
    const binIndex = Math.floor((value - minValue) / binWidth);
    histogramData[Math.min(binIndex, binCount - 1)]++;
}

// Draw Histogram function
function drawHistogram(minPrice, maxPrice) {
    // Clear the canvas
    ctx.clearRect(0, 0, priceHistogramCanvas.width, priceHistogramCanvas.height);

    // Determine the maximum height of the bars
    const maxBarHeight = priceHistogramCanvas.height;

    // Draw bars
    const barWidth = priceHistogramCanvas.width / histogramData.length;
    const maxDataValue = Math.max(...histogramData);
    const heightScale = maxBarHeight / maxDataValue;

    for (let i = 0; i < histogramData.length; i++) {
        const barHeight = histogramData[i] * heightScale; // Scale bar height to canvas height
        const x = i * barWidth;
        const y = priceHistogramCanvas.height - barHeight;

        // Highlight the bars within the selected price range
        const binLow = minValue + (i * (maxValue - minValue) / binCount);
        const binHigh = minValue + ((i + 1) * (maxValue - minValue) / binCount);
        if (binHigh >= minPrice && binLow <= maxPrice) {
            ctx.fillStyle = '#292C2D'; // Color for bars within range
        } else {
            ctx.fillStyle = '#ddd'; // Gray color for bars outside range
        }

        ctx.fillRect(x, y, barWidth - 1, barHeight); // Draw bar with full height
    }
}



// Update the histogram when slider or inputs change
function updateHistogram() {
    const minPrice = parseInt(priceSlider.noUiSlider.get()[0]);
    const maxPrice = parseInt(priceSlider.noUiSlider.get()[1]);

    // Update inputs
    document.getElementById('minPriceInput').value = minPrice;
    document.getElementById('maxPriceInput').value = maxPrice;

    drawHistogram(minPrice, maxPrice);
}

// Attach event listener to slider
priceSlider.noUiSlider.on('update', updateHistogram);

// Attach event listeners to inputs
document.getElementById('minPriceInput').addEventListener('input', function () {
    const minPrice = parseInt(this.value);
    const maxPrice = parseInt(document.getElementById('maxPriceInput').value);

    if (minPrice < maxPrice) {
        priceSlider.noUiSlider.set([minPrice, maxPrice]);
    }
});

document.getElementById('maxPriceInput').addEventListener('input', function () {
    const maxPrice = parseInt(this.value);
    const minPrice = parseInt(document.getElementById('minPriceInput').value);

    if (minPrice < maxPrice) {
        priceSlider.noUiSlider.set([minPrice, maxPrice]);
    }
});

// Initial render
updateHistogram();
