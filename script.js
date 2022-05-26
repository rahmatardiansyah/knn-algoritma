const container = document.querySelector('.container');
const btn = document.getElementById('submit');

btn.addEventListener('click', function () {
  const jumlahData = document.getElementById('jumlahData').value;
  const x1 = document.getElementById('x1').value;
  const x2 = document.getElementById('x2').value;
  const x3 = document.getElementById('x3').value;

  let formInput = '';

  for (let i = 1; i <= jumlahData; i++) {
    formInput += `<h1 class="mt-5">Data ${i}</h1>
    <div class="form-group">
    <label for="penghasilan">Penghasilan</label>
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
    <label for="sm">SM</label>
    <input type="input" class="form-control data-sm" id="sm" />
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
  buttonProses.addEventListener('click', function () {
    for (let i = 0; i < jumlahData; i++) {
      dataPenghasilan.push(dataPenghasilanEl[i].value);
      dataAset.push(dataAsetEl[i].value);
      dataPengeluaran.push(dataPengeluaranEl[i].value);
      dataSm.push(dataSmEl[i].value);
    }
  });
});
