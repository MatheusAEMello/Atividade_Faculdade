const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sPlaca = document.querySelector('#m-placa');
const sProprietario = document.querySelector('#m-proprietario');
const sApartamento = document.querySelector('#m-apartamento');
const sBloco = document.querySelector('#m-bloco');
const sModelo = document.querySelector('#m-modelo');
const sCor = document.querySelector('#m-cor');
const sVaga = document.querySelector('#m-vaga');
const btnSalvar = document.querySelector('#btnSalvar');

let vagasEstacionamento;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  if (edit) {
    sPlaca.value = vagasEstacionamento[index].placa;
    sProprietario.value = vagasEstacionamento[index].proprietario;
    sApartamento.value = vagasEstacionamento[index].apartamento;
    sBloco.value = vagasEstacionamento[index].bloco;
    sModelo.value = vagasEstacionamento[index].modelo;
    sCor.value = vagasEstacionamento[index].cor;
    sVaga.value = vagasEstacionamento[index].vaga;
    id = index;
  } else {
    sPlaca.value = '';
    sProprietario.value = '';
    sApartamento.value = '';
    sBloco.value = '';
    sModelo.value = '';
    sCor.value = '';
    sVaga.value = '';
  }
}

function editItem(index) {

  openModal(true, index);
}

function deleteItem(index) {
  if (confirm('Tem certeza que deseja excluir este cadastro?')) {
    vagasEstacionamento.splice(index, 1);
    setVagasEstacionamento();
    loadVagasEstacionamento();
  }
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.placa}</td>
    <td>${item.proprietario}</td>
    <td>${item.apartamento}</td>
    <td>${item.bloco}</td>
    <td>${item.modelo}</td>
    <td>${item.cor}</td>
    <td>${item.vaga}</td>
    <td>${item.disponibilidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  e.preventDefault();

  if (sPlaca.value == '' || sProprietario.value == '' || sApartamento.value == '' || sBloco.value == '' || sModelo.value == '' || sCor.value == '' || sVaga.value == '') {
    return;
  }

  const newItem = {
    placa: sPlaca.value,
    proprietario: sProprietario.value,
    apartamento: sApartamento.value,
    bloco: sBloco.value,
    modelo: sModelo.value,
    cor: sCor.value,
    vaga: sVaga.value,
    disponibilidade: randomDisponibilidade()
  };

  if (id !== undefined) {
    vagasEstacionamento[id] = newItem;
    if (confirm('Cadastro editado com sucesso!')) {
      openModal();
    }
  } else {
    vagasEstacionamento.push(newItem);
  }

  setVagasEstacionamento();

  modal.classList.remove('active');
  loadVagasEstacionamento();
  id = undefined;
  alert('Cadastro Efetivado Com Sucesso!');
};

function loadVagasEstacionamento() {
  vagasEstacionamento = getVagasEstacionamento();
  tbody.innerHTML = '';
  vagasEstacionamento.forEach((item, index) => {
    insertItem(item, index);
  });
}

const randomDisponibilidade = () => Math.random() < 0.5 ? 'DISPONÍVEL' : 'INDISPONÍVEL';

const getVagasEstacionamento = () => JSON.parse(localStorage.getItem('vagasEstacionamento')) ?? [];
const setVagasEstacionamento = () => localStorage.setItem('vagasEstacionamento', JSON.stringify(vagasEstacionamento));

loadVagasEstacionamento();
