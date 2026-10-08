window.onload = function() {
    calculateZ();
    generateZTables();
};

// 1. Fungsi CDF Distribusi Normal Standar
function normCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) prob = 1 - prob;
    return prob;
}

// 2. Kalkulator Z
function calculateZ() {
    const z = parseFloat(document.getElementById('zInput').value);

    if (isNaN(z)) {
        alert("Silakan masukkan nilai Z yang valid!");
        return;
    }

    const probLeft = normCDF(z);
    const probRight = 1 - probLeft;
    const twoTail = 2 * normCDF(-Math.abs(z));

    document.getElementById('outZ').innerText = z;
    document.getElementById('outProbLeft').innerText = probLeft.toFixed(4) + ` (${(probLeft * 100).toFixed(2)}%)`;
    document.getElementById('outProbRight').innerText = probRight.toFixed(4) + ` (${(probRight * 100).toFixed(2)}%)`;
    document.getElementById('outTwoTail').innerText = twoTail.toFixed(4);

    drawBellCurve(z);
}

// 3. Visualisasi Kurva Lonceng
function drawBellCurve(zVal) {
    const canvas = document.getElementById('bellCurve');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const meanX = width / 2;
    const scaleX = width / 8;
    const scaleY = height * 0.75;
    const baselineY = height - 35;

    function pdf(x) {
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    }

    // Arsir area kiri nilai Z
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    for (let xPixel = 0; xPixel <= width; xPixel++) {
        let zCurrent = (xPixel - meanX) / scaleX;
        if (zCurrent <= zVal) {
            let yPixel = baselineY - (pdf(zCurrent) * scaleY);
            ctx.lineTo(xPixel, yPixel);
        }
    }
    let zPixelCut = meanX + (zVal * scaleX);
    ctx.lineTo(zPixelCut, baselineY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(39, 174, 96, 0.35)';
    ctx.fill();

    // Garis kurva utama
    ctx.beginPath();
    for (let xPixel = 0; xPixel <= width; xPixel++) {
        let zCurrent = (xPixel - meanX) / scaleX;
        let yPixel = baselineY - (pdf(zCurrent) * scaleY);
        if (xPixel === 0) ctx.moveTo(xPixel, yPixel);
        else ctx.lineTo(xPixel, yPixel);
    }
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sumbu X
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(width, baselineY);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Garis batas Z (Merah)
    if (zPixelCut >= 0 && zPixelCut <= width) {
        ctx.beginPath();
        ctx.moveTo(zPixelCut, baselineY);
        ctx.lineTo(zPixelCut, baselineY - (pdf(zVal) * scaleY));
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`Z = ${zVal}`, zPixelCut - 18, baselineY - (pdf(zVal) * scaleY) - 10);
    }

    // Label Sumbu Z (-3 sampai 3)
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    for (let i = -3; i <= 3; i++) {
        let tickX = meanX + (i * scaleX);
        ctx.fillText(i, tickX - 3, baselineY + 18);
    }
}

// 4. Generate Tabel Z Positif & Negatif Secara Otomatis
function generateZTables() {
    buildMatrixTable('posZTable', 0.0, 3.4, 0.1);
    buildMatrixTable('negZTable', -3.4, 0.0, 0.1);
}

function buildMatrixTable(tableId, startZ, endZ, step) {
    const table = document.getElementById(tableId);
    let html = '<thead><tr><th>z</th>';

    // Header 0.00 - 0.09
    for (let col = 0; col <= 9; col++) {
        html += `<th>0.0${col}</th>`;
    }
    html += '</tr></thead><tbody>';

    // Baris Z
    if (startZ >= 0) {
        for (let r = startZ; r <= endZ + 0.01; r += step) {
            let rowVal = parseFloat(r.toFixed(1));
            html += `<tr><td><strong>${rowVal.toFixed(1)}</strong></td>`;
            for (let c = 0; c <= 9; c++) {
                let zVal = rowVal + (c * 0.01);
                let p = normCDF(zVal).toFixed(4);
                html += `<td>${p}</td>`;
            }
            html += '</tr>';
        }
    } else {
        for (let r = startZ; r <= endZ + 0.01; r += step) {
            let rowVal = parseFloat(r.toFixed(1));
            html += `<tr><td><strong>${rowVal.toFixed(1)}</strong></td>`;
            for (let c = 0; c <= 9; c++) {
                let zVal = rowVal - (c * 0.01);
                let p = normCDF(zVal).toFixed(4);
                html += `<td>${p}</td>`;
            }
            html += '</tr>';
        }
    }

    html += '</tbody>';
    table.innerHTML = html;
}

// 5. Switch Tab Tabel Positif/Negatif
function switchTable(type) {
    const posWrapper = document.getElementById('posTableWrapper');
    const negWrapper = document.getElementById('negTableWrapper');
    const btns = document.querySelectorAll('.tab-btn');

    if (type === 'positive') {
        posWrapper.style.display = 'block';
        negWrapper.style.display = 'none';
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        posWrapper.style.display = 'none';
        negWrapper.style.display = 'block';
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
}
