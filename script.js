function calculateDescriptive() {
    const rawInput = document.getElementById('dataInput').value;
    
    // Parsing input menjadi array angka
    const data = rawInput
        .split(/[\s,]+/)
        .map(Number)
        .filter(n => !isNaN(n));

    if (data.length === 0) {
        alert("Silakan masukkan set angka yang valid!");
        return;
    }

    // Sort data untuk hitung median
    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;

    // Mean
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // Median
    let median = 0;
    const mid = Math.floor(n / 2);
    if (n % 2 === 0) {
        median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        median = sorted[mid];
    }

    // Standar Deviasi (Sample SD)
    let sd = 0;
    if (n > 1) {
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
        sd = Math.sqrt(variance);
    }

    // Min & Max
    const min = sorted[0];
    const max = sorted[n - 1];

    // Tampilkan Hasil
    document.getElementById('outN').innerText = n;
    document.getElementById('outMean').innerText = mean.toFixed(2);
    document.getElementById('outMedian').innerText = median.toFixed(2);
    document.getElementById('outSD').innerText = sd.toFixed(2);
    document.getElementById('outMin').innerText = min;
    document.getElementById('outMax').innerText = max;

    document.getElementById('result').style.display = 'block';
}
