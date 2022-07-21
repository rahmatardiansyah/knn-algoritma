import "./.prettierrc.js";
const container = document.querySelector(".container");
const btn = document.querySelector("a.submit");
const dataLatihEl = document.getElementsByClassName("data-latih")[0];
const loginBox = document.getElementsByClassName("login-box")[0];
const modalBody = document.querySelector(".modal-body");

const dataPenghasilan = [9, 0, 14, 9, 21, 15];
const dataAset = [54, 102, 41, 180, 78, 103];
const dataPengeluaran = [9, 31, 15, 9, 21, 11];
const dataSm = ["Miskin", "Sedang", "Miskin", "Kaya", "Sedang", "Kaya"];
const dataLearning = [];

console.log("rahmat ardiansyah");

dataLatihEl.addEventListener("click", function () {
    // console.log(modalBody);
    let dataLatih = "";

    dataLatih += `<table class="table table-striped">`;

    dataLatih += `<tr>
  <th>No</th>
<th>Penghasilan</th>
<th>Aset</th>
<th>Pengeluaran</th>
<th>Status Masyarakat</th>
</tr>`;

    for (let i = 0; i < dataPenghasilan.length; i++) {
        dataLatih += `<tr>
    <td>${i + 1}</td>
    <td>${dataPenghasilan[i]}</td>
    <td>${dataAset[i]}</td>
    <td>${dataPengeluaran[i]}</td>
    <td>${dataSm[i]}</td>
    </tr>`;
    }

    dataLatih += `</table>`;
    modalBody.innerHTML = dataLatih;
    // console.log(dataLatih);
});

// console.log(dataLatihEl);

btn.addEventListener("click", function () {
    const x1 = document.getElementById("x1").value;
    const x2 = document.getElementById("x2").value;
    const x3 = document.getElementById("x3").value;
    const k = document.getElementById("k").value;

    for (let i = 0; i < dataPengeluaran.length; i++) {
        dataLearning.push([
            dataPenghasilan[i],
            dataAset[i],
            dataPengeluaran[i],
            Math.sqrt(
                Math.pow(dataPenghasilan[i] - x1, 2) +
                    Math.pow(dataAset[i] - x2, 2) +
                    Math.pow(dataPengeluaran[i] - x3, 2)
            ),
            dataSm[i],
        ]);
    }

    const hasilLearning = [...dataLearning];

    hasilLearning.sort(function (a, b) {
        return a[3] - b[3];
    });

    let miskin = 0;
    let sedang = 0;
    let kaya = 0;
    for (let i = 0; i < k; i++) {
        if (hasilLearning[i][4] == "Miskin") {
            miskin++;
        } else if (hasilLearning[i][4] == "Sedang") {
            sedang++;
        } else if (hasilLearning[i][4] == "Kaya") {
            kaya++;
        }
    }
    let hasil = "";
    let status = Math.floor(Math.random() * 2) + 1;

    if (miskin > sedang && miskin > kaya) {
        hasil = "Miskin";
    } else if (sedang > miskin && sedang > kaya) {
        hasil = "Sedang";
    } else if (kaya > miskin && kaya > sedang) {
        hasil = "Kaya";
    } else if (miskin == sedang) {
        if (status == 1) {
            hasil = "Miskin";
        } else {
            hasil = "Sedang";
        }
    } else if (sedang == kaya) {
        if (status == 1) {
            hasil = "Sedang";
        } else {
            hasil = "Kaya";
        }
    } else {
        if (status == 1) {
            hasil = "Miskin";
        } else {
            hasil = "Kaya";
        }
    }
    let hasilFinal = "";

    hasilFinal += `
    <h2>Hasil Learning</h2>
    <h2>Data Penghasilan: ${x1}</h2>
    <h2>Data Aset       : ${x2}</h2>
    <h2>Data Pengeluaran: ${x3}</h2>
    <h2>Indikasi : ${hasil}</h2>
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" class="tabelHasil">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    Tampilkan Tabel
    </a>
    `;

    container.innerHTML = hasilFinal;

    let tabel = "";

    tabel += `<table class="table table-striped">`;

    tabel += `<tr>
    <th>Penghasilan</th>
    <th>Aset</th>
    <th>Pengeluaran</th>
    <th>Status Masyarakat</th>
    <th>Jarak</th>
    </tr>`;

    for (let i = 0; i < k; i++) {
        tabel += `<tr>
      <td>${hasilLearning[i][0]}</td>
      <td>${hasilLearning[i][1]}</td>
      <td>${hasilLearning[i][2]}</td>
      <td>${hasilLearning[i][4]}</td>
      <td>${hasilLearning[i][3].toFixed(2)}</td>
      </tr>`;
    }

    tabel += `</table>`;

    modalBody.innerHTML = tabel;

    // console.log(hasilLearning);
});
