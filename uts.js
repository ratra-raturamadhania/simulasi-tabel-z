const quizData = {
    1: {
        title: "Soal 1: Sampling Rata-Rata Hb (Distribusi Z)",
        question: "Kadar hemoglobin ibu hamil di Kabupaten A &mu; = 12 g/dL dan &sigma; = 4 g/dL. Penelitian dilakukan dengan sampel sebanyak 9 orang. Berapa probabilitas dari mereka yang akan mempunyai rata-rata Hb lebih dari 10?",
        answer: "0.9332",
        solution: `
            <h4>Pembahasan & Langkah Pengerjaan:</h4>
            <ul>
                <li><strong>Diketahui:</strong> $\\mu = 12$, $\\sigma = 4$, $n = 9$, $X = 10$</li>
                <li><strong>1. Hitung Standar Error ($SE$):</strong><br>
                    $$SE = \\frac{\\sigma}{\\sqrt{n}} = \\frac{4}{\\sqrt{9}} = \\frac{4}{3} = 1{,}33$$
                </li>
                <li><strong>2. Hitung Nilai Z:</strong><br>
                    $$Z = \\frac{X - \\mu}{SE} = \\frac{10 - 12}{1{,}33} = \\frac{-2}{1{,}33} = -1{,}50$$
                </li>
                <li><strong>3. Cari Luas Area Tabel Z:</strong><br>
                    $$P(Z > -1{,}50) = 0{,}9332$$
                </li>
                <li><strong>Hasil Akhir:</strong> <strong>0,9332 (93,32%)</strong></li>
            </ul>
        `
    },
    2: {
        title: "Soal 2: Probabilitas Individu (Distribusi Z)",
        question: "Rata-rata jumlah buku yang dibaca oleh mahasiswa per pekan adalah sebanyak 2 buku dengan simpangan baku sebesar 1. Hitunglah probabilitas mahasiswa membaca 0-1 buku!",
        answer: "0.1359",
        solution: `
            <h4>Pembahasan & Langkah Pengerjaan:</h4>
            <ul>
                <li><strong>Diketahui:</strong> $\\mu = 2$ buku, $\\sigma = 1$ buku</li>
                <li><strong>Rumus Z:</strong> $Z = \\frac{X - \\mu}{\\sigma}$</li>
                <li>Untuk $X = 0 \\rightarrow Z_1 = \\frac{0 - 2}{1} = -2$</li>
                <li>Untuk $X = 1 \\rightarrow Z_2 = \\frac{1 - 2}{1} = -1$</li>
                <li><strong>Hitung Luas Area Antara $Z_1$ dan $Z_2$:</strong><br>
                    $$P(0 \\le X \\le 1) = P(-2 \\le Z \\le -1)$$
                    $$P(-2 \\le Z \\le -1) = 0{,}4772 - 0{,}3413 = 0{,}1359$$
                </li>
                <li><strong>Hasil Akhir:</strong> <strong>0,1359 (13,59%)</strong></li>
            </ul>
        `
    },
    3: {
        title: "Soal 3: Distribusi Poisson",
        question: "Kasus kanker di Indonesia sebanyak 0,015%. Jika jumlah penduduk Kecamatan Maju Jaya 50.000 jiwa, hitung probabilitas: (a) Tidak ada kasus, (b) Ada 1-2 kasus, (c) Paling banyak 2 kasus, (d) Minimal 2 kasus.",
        answer: "0.020257",
        solution: `
            <h4>Pembahasan & Langkah Pengerjaan:</h4>
            <ul>
                <li><strong>Diketahui:</strong> $p = 0{,}015\\% = 0{,}00015$, $n = 50.000$</li>
                <li><strong>Rata-rata kejadian ($\\lambda$):</strong><br>
                    $$\\lambda = n \\times p = 50.000 \\times 0{,}00015 = 7{,}5$$
                </li>
                <li><strong>Rumus Poisson:</strong><br>
                    $$P(X = x) = \\frac{e^{-\\lambda} \\cdot \\lambda^x}{x!}$$
                </li>
                <li><strong>a. Tidak ada kasus $P(X = 0)$:</strong><br>
                    $$P(X = 0) = \\frac{e^{-7{,}5} \\cdot 7{,}5^0}{0!} = 0{,}000553$$
                </li>
                <li><strong>b. Ada kasus antara 1–2 $P(1 \\le X \\le 2)$:</strong><br>
                    $$P(1 \\le X \\le 2) = P(X=1) + P(X=2)$$
                    $$P(1 \\le X \\le 2) = 0{,}004148 + 0{,}015555 = 0{,}019704$$
                </li>
                <li><strong>c. Paling banyak 2 kasus $P(X \\le 2)$:</strong><br>
                    $$P(X \\le 2) = P(0) + P(1) + P(2)$$
                    $$P(X \\le 2) = 0{,}000553 + 0{,}004148 + 0{,}015555 = 0{,}020257$$
                </li>
                <li><strong>d. Minimal 2 kasus $P(X \\ge 2)$:</strong><br>
                    $$P(X \\ge 2) = 1 - P(X < 2) = 1 - [P(0) + P(1)]$$
                    $$P(X \\ge 2) = 1 - (0{,}000553 + 0{,}004148) = 0{,}995299$$
                </li>
            </ul>
        `
    },
    4: {
        title: "Soal 4: Distribusi Binomial",
        question: "Kejadian kecacingan pada siswa SD Suka Maju adalah 20%. Penelitian dilakukan dengan sampel sebanyak 10. Berapa probabilitas paling banyak 2 siswa mengalami cacingan?",
        answer: "0.6778",
        solution: `
            <h4>Pembahasan & Langkah Pengerjaan:</h4>
            <ul>
                <li><strong>Diketahui:</strong> $n = 10$, $p = 0{,}2$, $q = 1 - p = 0{,}8$</li>
                <li><strong>Rumus Binomial:</strong><br>
                    $$P(X = x) = \\binom{n}{x} \\cdot p^x \\cdot q^{n-x} = \\frac{n!}{x!(n-x)!} \\cdot p^x \\cdot q^{n-x}$$
                </li>
                <li><strong>Paling Banyak 2 Siswa $P(X \\le 2)$:</strong><br>
                    $$P(X \\le 2) = P(0) + P(1) + P(2) = 0{,}6778$$
                </li>
                <li><strong>Hasil Akhir:</strong> <strong>0,6778 (67,78%)</strong></li>
            </ul>
        `
    },
    5: {
        title: "Soal 5: Peluang Tabel Kontingensi",
        question: "Berdasarkan tabel 250 pasien, berapa peluang terpilihnya sampel perempuan dan memiliki gejala?",
        answer: "0.14",
        solution: `
            <h4>Pembahasan & Langkah Pengerjaan:</h4>
            <ul>
                <li><strong>Diketahui dari tabel:</strong> Jumlah Perempuan & Memiliki Gejala = $35$, Total Sampel ($N$) = $250$</li>
                <li><strong>Rumus Peluang:</strong><br>
                    $$P(A) = \\frac{\\text{Jumlah Kejadian}}{\\text{Jumlah Seluruh Kejadian}}$$
                </li>
                <li><strong>Hitung Peluang:</strong><br>
                    $$P = \\frac{35}{250} = 0{,}14$$
                </li>
                <li><strong>Hasil Akhir:</strong> <strong>0,14 (14%)</strong></li>
            </ul>
        `
    },
    6: {
        title: "Soal 6: Komponen Boxplot",
        question: "Urutan Data: 10, 55, 60, 65, 70, 78, 82, 85, 90, 94, 98. Tentukan komponen A sampai F!",
        answer: "98",
        solution: `
            <h4>Pembahasan & Rumus Letak Kuartil:</h4>
            <ul>
                <li><strong>a. Nilai Maksimum (A):</strong> $98$</li>
                <li><strong>b. Kuartil 3 / $Q_3$ (B):</strong><br>
                    $$\\text{Posisi } Q_3 = \\frac{3}{4}(n + 1) = \\frac{3}{4}(11 + 1) = 9 \\rightarrow \\text{Data ke-9} = 90$$
                </li>
                <li><strong>c. Median / $Q_2$ (C):</strong> $78$</li>
                <li><strong>d. Kuartil 1 / $Q_1$ (D):</strong><br>
                    $$\\text{Posisi } Q_1 = \\frac{1}{4}(n + 1) = \\frac{1}{4}(11 + 1) = 3 \\rightarrow \\text{Data ke-3} = 60$$
                </li>
                <li><strong>e. Nilai Minimum Non-Outlier (E):</strong> $55$</li>
                <li><strong>f. Outlier / Pencilan (F):</strong> $10$</li>
            </ul>
        `
    }
};

function showQuiz(num) {
    const container = document.getElementById('quizContainer');
    const data = quizData[num];

    const btns = document.querySelectorAll('.tab-buttons .tab-btn');
    btns.forEach((btn, idx) => {
        if (idx === num - 1) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    container.innerHTML = `
        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${data.title}</h3>
        <p style="font-size: 1rem; margin-bottom: 1.2rem; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid var(--primary-color);">
            <strong>Soal:</strong> ${data.question}
        </p>

        <div style="margin-bottom: 1.2rem; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <input type="text" id="userAns" placeholder="Masukkan jawaban angka..." style="padding: 0.6rem; border: 1px solid var(--border-color); border-radius: 6px; width: 220px;">
            <button onclick="checkAnswer(${num})" style="width: auto; padding: 0.6rem 1.2rem; background-color: var(--secondary-color);">Cek Jawaban</button>
            <button onclick="toggleSolution()" style="width: auto; padding: 0.6rem 1.2rem; background-color: var(--primary-color);">👁️ Lihat Pembahasan</button>
        </div>

        <div id="feedbackBox" style="display: none; margin-bottom: 1rem; font-weight: bold;"></div>

        <div id="solutionBox" style="display: none; padding: 1rem; background-color: #f0fdf4; border-left: 4px solid var(--secondary-color); border-radius: 6px;">
            ${data.solution}
        </div>
    `;

    // Trigger MathJax untuk memproses simbol di HTML
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function checkAnswer(num) {
    const userAns = document.getElementById('userAns').value.trim();
    const feedback = document.getElementById('feedbackBox');
    const solutionBox = document.getElementById('solutionBox');
    const target = quizData[num].answer;

    if (!userAns) {
        alert("Silakan masukkan jawaban kamu terlebih dahulu!");
        return;
    }

    feedback.style.display = 'block';
    if (userAns === target || parseFloat(userAns) === parseFloat(target)) {
        feedback.style.color = '#27ae60';
        feedback.innerHTML = '✅ Jawaban Kamu Benar!';
    } else {
        feedback.style.color = '#e74c3c';
        feedback.innerHTML = `❌ Jawaban Kurang Tepat (Kunci: ${target})`;
    }
    
    solutionBox.style.display = 'block';

    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function toggleSolution() {
    const box = document.getElementById('solutionBox');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('quizContainer')) {
        showQuiz(1);
    }
});
