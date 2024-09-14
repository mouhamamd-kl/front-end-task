
var priceHistogramCanvas = document.getElementById('priceHistogram');
var ctx = priceHistogramCanvas.getContext('2d');
ctx.imageSmoothingEnabled = true;

// Initialize the slider
var priceSlider = document.getElementById('priceSlider');

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
    var data = [];
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
var binCount = 42;
var minValue = 100;
var maxValue = 500;
var mean = 300; // Mean for normal distribution
var stdDev = 70; // Standard deviation

// Generate data and bin it
var rawData = generateNormalData(1000, mean, stdDev, minValue, maxValue);
var histogramData = Array(binCount).fill(0);

// Bin the data
var binWidth = (maxValue - minValue) / binCount;
for (let i = 0; i < rawData.length; i++) {
    var value = rawData[i];
    var binIndex = Math.floor((value - minValue) / binWidth);
    histogramData[Math.min(binIndex, binCount - 1)]++;
}

// Draw Histogram function
function drawHistogram(minPrice, maxPrice) {
    // Clear the canvas
    ctx.clearRect(0, 0, priceHistogramCanvas.width, priceHistogramCanvas.height);

    // Determine the maximum height of the bars
    var maxBarHeight = priceHistogramCanvas.height;

    // Draw bars
    var barWidth = priceHistogramCanvas.width / histogramData.length;
    var maxDataValue = Math.max(...histogramData);
    var heightScale = maxBarHeight / maxDataValue;

    for (let i = 0; i < histogramData.length; i++) {
        var barHeight = histogramData[i] * heightScale; // Scale bar height to canvas height
        var x = i * barWidth;
        var y = priceHistogramCanvas.height - barHeight;

        // Highlight the bars within the selected price range
        var binLow = minValue + (i * (maxValue - minValue) / binCount);
        var binHigh = minValue + ((i + 1) * (maxValue - minValue) / binCount);
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


