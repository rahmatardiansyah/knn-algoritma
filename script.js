const container = document.querySelector('.container');
const btn = document.querySelector('a');
const loginBox = document.getElementsByClassName('login-box')[0];

btn.addEventListener('click', function () {
  const jumlahData = document.getElementById('jumlahData').value;
  const x1 = document.getElementById('x1').value;
  const x2 = document.getElementById('x2').value;
  const x3 = document.getElementById('x3').value;
  const k = document.getElementById('k').value;
  loginBox.classList.remove('login-box');

  let formInput = `<div class="card text-center ">
  <div class="card-header">
    Data Latih
  </div>`;

  for (let i = 1; i <= jumlahData; i++) {
    formInput += `<div class="card-body ">
    <h5 class="">Data ${i}</h5>
    <div class="form-group">
    <input type="input" class="form-control data-penghasilan" id="penghasilan" placeholder="Penghasilan"  />
    <br>
  </div>
  <div class="form-group">
  <input type="input" class="form-control data-aset" id="aset"  placeholder="Aset" />
  <br>  
  </div>
  <div class="form-group">
  <input type="input" class="form-control data-pengeluaran" id="pengeluaran"  placeholder="Pengeluaran" />
  <br>  
  </div>
  <div class="form-group">
   
    <select class="form-select data-sm" aria-label="Default select example">
      <option value="Miskin">Status Masyarakat</option>
      <option value="Miskin">Miskin</option>
      <option value="Sedang">Sedang</option>
      <option value="Kaya">Kaya</option>
    </select>
    </div>
    </div>`;
  }
  formInput += `
  <a href="#" class="proses">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
</div>
`;
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
        dataPenghasilan[i],
        dataAset[i],
        dataPengeluaran[i],
        Math.sqrt(
          Math.pow(dataPenghasilan[i] - x1, 2) +
            Math.pow(dataAset[i] - x2, 2) +
            Math.pow(dataPengeluaran[i] - x3, 2)
        ),
        dataSm[i]
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
      if (hasilLearning[i][4] == 'Miskin') {
        miskin++;
      } else if (hasilLearning[i][4] == 'Sedang') {
        sedang++;
      } else if (hasilLearning[i][4] == 'Kaya') {
        kaya++;
      }
    }

    let hasil = '';
    let status = Math.floor(Math.random() * 2) + 1;

    if (miskin > sedang && miskin > kaya) {
      hasil = 'Miskin';
    } else if (sedang > miskin && sedang > kaya) {
      hasil = 'Sedang';
    } else if (kaya > miskin && kaya > sedang) {
      hasil = 'Kaya';
    } else if (miskin == sedang) {
      if (status == 1) {
        hasil = 'Miskin';
      } else {
        hasil = 'Sedang';
      }
    } else if (sedang == kaya) {
      if (status == 1) {
        hasil = 'Sedang';
      } else {
        hasil = 'Kaya';
      }
    } else {
      if (status == 1) {
        hasil = 'Miskin';
      } else {
        hasil = 'Kaya';
      }
    }
    loginBox.classList.add('login-box');

    let hasilFinal = '';

    // for (let i = 0; i < k; i++) {
    //   hasilFinal += `<tr>
    //   <td>${hasilLearning[i][0]}</td>
    //   <td>${hasilLearning[i][1]}</td>
    //   <td>${hasilLearning[i][2]}</td>
    //   <td>${hasilLearning[i][3]}</td>
    //   <td>${hasilLearning[i][4]}</td>
    //   </tr>`;
    // }

    // hasilFinal += `</table>`;
    hasilFinal += `
    <h2>Hasil Learning</h2>
    <h2>Data Penghasilan: ${x1}</h2>
    <h2>Data Aset       : ${x2}</h2>
    <h2>Data Pengeluaran: ${x3}</h2>
    <h2>Indikasi : ${hasil}</h2>
    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    Tampilkan Tabel
    </a>
    `;

    container.innerHTML = hasilFinal;

    const modalBody = document.querySelector('.modal-body');

    let tabel = '';

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
  });
});
