window.onload = function() {
    calculateZ();
};

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

    drawBellCurve(z);
}

function drawBellCurve(zVal) {
    const canvas = document.getElementById('bellCurve');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const meanX = width / 2;
    const scaleX = width / 8;
    const scaleY = height * 0.75;
    const baselineY = height - 30;

    function pdf(x) {
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    }

    // Arsir area sebelah kiri nilai Z
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
    ctx.fillStyle = 'rgba(39, 174, 96, 0.4)';
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
    ctx.lineWidth = 3;
    ctx.stroke();

    // Sumbu X
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(width, baselineY);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Garis penanda Z
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
        ctx.font = 'bold 12px Segoe UI';
        ctx.fillText(`Z = ${zVal}`, zPixelCut - 15, baselineY - (pdf(zVal) * scaleY) - 10);
    }

    // Label sumbu Z
    ctx.fillStyle = '#555';
    ctx.font = '11px Segoe UI';
    for (let i = -3; i <= 3; i++) {
        let tickX = meanX + (i * scaleX);
        ctx.fillText(i, tickX - 3, baselineY + 15);
    }
}
