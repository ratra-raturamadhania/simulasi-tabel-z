// 1. Kalkulator Statistik Deskriptif
function calculateDescriptive() {
    const rawInput = document.getElementById('dataInput').value;
    const data = rawInput.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));

    if (data.length === 0) {
        alert("Silakan masukkan set angka yang valid!");
        return;
    }

    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    let median = 0;
    const mid = Math.floor(n / 2);
    if (n % 2 === 0) {
        median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        median = sorted[mid];
    }

    let sd = 0;
    if (n > 1) {
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
        sd = Math.sqrt(variance);
    }

    document.getElementById('outN').innerText = n;
    document.getElementById('outMean').innerText = mean.toFixed(2);
    document.getElementById('outMedian').innerText = median.toFixed(2);
    document.getElementById('outSD').innerText = sd.toFixed(2);
    document.getElementById('outMin').innerText = sorted[0];
    document.getElementById('outMax').innerText = sorted[n - 1];

    document.getElementById('result').style.display = 'block';
}

// 2. Kalkulator Z-Score
function calculateZ() {
    const z = parseFloat(document.getElementById('zInput').value);

    if (isNaN(z)) {
        alert("Silakan masukkan nilai Z yang valid!");
        return;
    }

    function normCDF(x) {
        const t = 1 / (1 + 0.2316419 * Math.abs(x));
        const d = 0.3989423 * Math.exp(-x * x / 2);
        let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (x > 0) prob = 1 - prob;
        return prob;
    }

    const probLeft = normCDF(z);
    const probRight = 1 - probLeft;
    const twoTail = 2 * normCDF(-Math.abs(z));

    document.getElementById('outZ').innerText = z;
    document.getElementById('outProbLeft').innerText = probLeft.toFixed(4) + ` (${(probLeft * 100).toFixed(2)}%)`;
    document.getElementById('outProbRight').innerText = probRight.toFixed(4) + ` (${(probRight * 100).toFixed(2)}%)`;
    document.getElementById('outTwoTail').innerText = twoTail.toFixed(4);

    document.getElementById('zResult').style.display = 'block';
}
