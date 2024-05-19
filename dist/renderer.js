"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_js_1 = require("chart.js");
chart_js_1.Chart.register(...chart_js_1.registerables);
const ctx = document.getElementById('liveChart');
let chart = new chart_js_1.Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Initialize with empty labels
        datasets: [{
                label: 'Live Data',
                data: [], // Initialize with empty data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
        }
    }
});
// Simulate live data updates
setInterval(() => {
    const now = Date.now();
    const value = Math.random() * 100; // Simulate a random data value
    updateChart({ time: now, value: value });
}, 1000); // Update every second
function updateChart(data) {
    const labels = chart.data.labels;
    const dataset = chart.data.datasets[0].data;
    labels.push(data.time);
    dataset.push(data.value);
    if (labels.length > 50) { // Keep only the last 50 data points
        labels.shift();
        dataset.shift();
    }
    chart.update();
}
