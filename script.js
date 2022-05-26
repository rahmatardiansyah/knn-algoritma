const container = document.querySelector('.container');
const btn = document.getElementById('submit');

btn.addEventListener('click', function () {
  const jumlahData = document.getElementById('jumlahData').value;
  const x1 = document.getElementById('x1').value;
  const x2 = document.getElementById('x2').value;
  const x3 = document.getElementById('x3').value;
  const k = document.getElementById('k').value;

  let formInput = '';

  for (let i = 1; i <= jumlahData; i++) {
    formInput += `<h1 class="mt-5">Data ${i}</h1>
    <div class="form-group">
    <label for="penghasilan">Penghasilannnnnn</label>
    <input type="input" class="form-control data-penghasilan" id="penghasilan" />
  </div>
  <div class="form-group">
    <label for="aset">Aset</label>
    <input type="input" class="form-control data-aset" id="aset" />
  </div>
  <div class="form-group">
    <label for="pengeluaran">Pengeluaran</label>
    <input type="input" class="form-control data-pengeluaran" id="pengeluaran" />
  </div>
  <div class="form-group">
    <label for="">Status Masyarakat</label>
    <select class="form-select data-sm" aria-label="Default select example">
      <option value="Miskin">Miskin</option>
      <option value="Sedang">Sedang</option>
      <option value="Kaya">Kaya</option>
    </select>
    </div>`;
  }
  formInput += `<button class="proses btn btn-primary mt-3">Proses</button>`;
  container.innerHTML = formInput;

  const buttonProses = document.querySelector('.proses');
  const dataPenghasilanEl = document.querySelectorAll('.data-penghasilan');
  const dataAsetEl = document.querySelectorAll('.data-aset');
  const dataPengeluaranEl = document.querySelectorAll('.data-pengeluaran');
  const dataSmEl = document.querySelectorAll('.data-sm');

  const dataPenghasilan = [];
  const dataAset = [];
  const dataPengeluaran = [];
  const dataSm = [];
  const dataLearning = [];
  buttonProses.addEventListener('click', function () {
    for (let i = 0; i < jumlahData; i++) {
      dataPenghasilan.push(dataPenghasilanEl[i].value);
      dataAset.push(dataAsetEl[i].value);
      dataPengeluaran.push(dataPengeluaranEl[i].value);
      dataSm.push(dataSmEl[i].value);
    }
    for (let i = 0; i < jumlahData; i++) {
      dataLearning.push([
        Math.sqrt(
          Math.pow(dataPenghasilan[i] - x1, 2) +
            Math.pow(dataAset[i] - x2, 2) +
            Math.pow(dataPengeluaran[i] - x3, 2)
        ),
        dataSm[i]
      ]);
    }

    const hasilLearning = [
      ...dataLearning.sort(function (a, b) {
        return a[0] - b[0];
      })
    ];

    let miskin = 0;
    let sedang = 0;
    let kaya = 0;
    for (let i = 0; i < k; i++) {
      if (hasilLearning[i][1] == 'Miskin') {
        miskin++;
      } else if (hasilLearning[i][1] == 'Sedang') {
        sedang++;
      } else if (hasilLearning[i][1] == 'Kaya') {
        kaya++;
      }
    }

    let hasil = '';
    if (miskin > sedang) {
      hasil = 'Miskin';
    } else if (miskin > kaya) {
      hasil = 'Miskin';
    } else if (sedang > miskin) {
      hasil = 'Sedang';
    } else if (sedang > kaya) {
      hasil = 'Sedang';
    } else if (kaya > miskin) {
      hasil = 'Kaya';
    } else {
      hasil = 'Kaya';
    }

    let hasilFinal = `
    <h1>${hasil}</h1>
    <h2>${x1}</h2>
    <h2>${x2}</h2>
    <h2>${x2}</h2>
    `;

    container.innerHTML = hasilFinal;
  });
});
