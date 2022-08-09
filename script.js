const botaoAdicionar = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const listaOl = document.getElementById('lista-tarefas');

function mudaFundo(event) {
  const itensLi = document.getElementsByClassName('item')
  
  for (let i = 0; i < itensLi.length; i+= 1){
    if (itensLi[i].style.backgroundColor == 'gray') {
      itensLi[i].style.backgroundColor = 'white'
      itensLi[i].classList.remove('selected')
    }
  }
  event.target.style.backgroundColor = 'gray'
  event.target.classList.add('selected')
}

function riscaItem(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  }
  else {
    event.target.classList.add('completed');
  }
}

function limpaLista() {
  const itensLi = document.getElementsByClassName('item');

  if (itensLi.length > 0) {
    for (let i = itensLi.length - 1; i >= 0; i -= 1) {
      itensLi[i].remove();
    }
  }
}

function removeCompletos() {
  const completos = document.getElementsByClassName('completed');

  if (completos.length > 0) {
    for (let i = completos.length - 1; i >= 0; i -= 1) {
      completos[i].remove()
    }
  }
}

function removeTarefa() {
  const selecionado = document.querySelector('.selected')

  if (selecionado !== null) {
    selecionado.remove()
  }
}

function jogaProLocal() {
  let itens = document.getElementsByClassName('item');
  let array = JSON.parse(localStorage.getItem('itens'))

  for (let i = 0; i < itens.length; i += 1) {
    array.push(itens[i].outerHTML)
  }
  localStorage.setItem('itens', JSON.stringify(array))
}

function adicionaTarefa() {
  const item = document.createElement('li');
  item.innerHTML = input.value;
  item.className = 'item'
  listaOl.appendChild(item);

  input.value = '';

  listaOl.appendChild(item);

  
  item.addEventListener('click', mudaFundo)

  item.addEventListener('dblclick', riscaItem);

  const botaoLimpar = document.getElementById('apaga-tudo');
  botaoLimpar.addEventListener('click', limpaLista);

  const botaoCompletos = document.getElementById('remover-finalizados');
  botaoCompletos.addEventListener('click', removeCompletos)
  
  const botaoSalvar = document.getElementById('salvar-tarefas'); 
  botaoSalvar.addEventListener('click', jogaProLocal);

  const botaoRemover = document.getElementById('remover-selecionado');
  botaoRemover.addEventListener('click', removeTarefa)
}

botaoAdicionar.addEventListener('click', adicionaTarefa);

function pegaDoLocal() {
  if (localStorage.getItem('itens') === null) {
    localStorage.setItem('itens', JSON.stringify([]));
  } else {
    const itensLista = JSON.parse(localStorage.getItem('itens'))
    for (let i = 0; i < itensLista.length; i += 1) {
      listaOl.innerHTML += itensLista[i]
    }
  }
}

window.onload = function() {
  pegaDoLocal();
}
