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

// 3. Kalkulator Chi-Square & Odds Ratio
function calculateChiSquare() {
    const a = parseFloat(document.getElementById('cellA').value);
    const b = parseFloat(document.getElementById('cellB').value);
    const c = parseFloat(document.getElementById('cellC').value);
    const d = parseFloat(document.getElementById('cellD').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a < 0 || b < 0 || c < 0 || d < 0) {
        alert("Silakan isi semua sel A, B, C, dan D dengan angka non-negatif!");
        return;
    }

    const N = a + b + c + d;
    if (N === 0) {
        alert("Jumlah total sampel tidak boleh nol!");
        return;
    }

    // Rumus Chi-Square 2x2: N * (ad - bc)^2 / ((a+b)(c+d)(a+c)(b+d))
    const numerator = N * Math.pow((a * d) - (b * c), 2);
    const denominator = (a + b) * (c + d) * (a + c) * (b + d);
    
    let chi2 = 0;
    if (denominator !== 0) {
        chi2 = numerator / denominator;
    }

    // Odds Ratio (OR) = (a * d) / (b * c)
    let OR = "Tak Hingga";
    if (b * c !== 0) {
        OR = ((a * d) / (b * c)).toFixed(2);
    }

    // Relative Risk (RR) = [a / (a + b)] / [c / (c + d)]
    let RR = "Tak Hingga";
    if ((a + b) > 0 && (c + d) > 0 && c > 0) {
        RR = ((a / (a + b)) / (c / (c + d))).toFixed(2);
    }

    document.getElementById('outChi2').innerText = chi2.toFixed(3);
    document.getElementById('outOR').innerText = OR;
    document.getElementById('outRR').innerText = RR;

    document.getElementById('chiResult').style.display = 'block';
}
