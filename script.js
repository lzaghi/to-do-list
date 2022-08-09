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
  // if (localStorage.itens != '[]') {
  //   localStorage.clear()
  // }

  let itens = document.getElementsByClassName('item');
  let array = JSON.parse(localStorage.getItem('itens'))

  for (let i = 0; i < itens.length; i += 1) {
    array.push(itens[i].outerHTML)
  }
  localStorage.setItem('itens', JSON.stringify(array))
}

function moveUp() {
  let selected = document.querySelector('.selected')
  // console.log(selected);
  // console.log(selected == listaOl.children[0]);

  let array = []
  for (let ji = 0; ji < listaOl.children.length; ji += 1){
    array.push(listaOl.children[ji])
  }
  // console.log(array);
  // console.log(selected == array[0]);

  if (selected != listaOl.children[0]) {
    let indexSel;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] == selected) {
        indexSel = i
      }
    }
    // console.log(indexSel);
    // console.log(listaOl.children[indexSel]);
    // console.log(listaOl.children[indexSel-1]);
  
    let temporary = array[indexSel]
    // console.log(temporary);
    array[indexSel] = array[indexSel-1]
    // console.log(array[indexSel]);
    array[indexSel-1] = temporary;
    // console.log(array[indexSel-1]);

    // console.log(array);

    // console.log(listaOl.children)
    listaOl.innerHTML = ''

    for (let k = 0; k < array.length; k += 1){
      listaOl.appendChild(array[k])
    }
  //   let temporaryClass = listaOl.children[indexSel].innerHTML
  //   console.log(temporaryClass);
  }
}

function moveDown() {
  let selected = document.querySelector('.selected')
  let array = []
  for (let ji = 0; ji < listaOl.children.length; ji += 1){
    array.push(listaOl.children[ji])
  }
  if (selected != listaOl.children[listaOl.children.length-1]) {
    let indexSel;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] == selected) {
        indexSel = i
      }
    }
    let temporary = array[indexSel]
    array[indexSel] = array[indexSel+1]
    array[indexSel+1] = temporary;
    listaOl.innerHTML = ''
    for (let k = 0; k < array.length; k += 1){
      listaOl.appendChild(array[k])
    }
  }
}

function adicionaTarefa() {
  const item = document.createElement('li');
  item.innerHTML = input.value;
  item.className = 'item'
  listaOl.appendChild(item);

  input.value = '';

  listaOl.appendChild(item);
  // console.log(localStorage.itens);
  // console.log(listaOl.children);
  let todos = listaOl.children
  for (let i = 0; i < todos.length; i += 1){
    todos[i].addEventListener('click', mudaFundo)
    todos[i].addEventListener('dblclick', riscaItem);
  }
  // item.addEventListener('click', mudaFundo)
  // item.addEventListener('dblclick', riscaItem);

  const botaoLimpar = document.getElementById('apaga-tudo');
  botaoLimpar.addEventListener('click', limpaLista);

  const botaoUp = document.getElementById('mover-cima');
  botaoUp.addEventListener('click', moveUp)

  const botaoDown = document.getElementById('mover-baixo');
  botaoDown.addEventListener('click', moveDown)

  const botaoCompletos = document.getElementById('remover-finalizados');
  botaoCompletos.addEventListener('click', removeCompletos)

  const botaoSalvar = document.getElementById('salvar-tarefas'); 
  botaoSalvar.addEventListener('click', jogaProLocal);

  const botaoRemover = document.getElementById('remover-selecionado');
  botaoRemover.addEventListener('click', removeTarefa)
}

botaoAdicionar.addEventListener('click', adicionaTarefa);

let todos = listaOl.children
for (let i = 0; i < todos.length; i += 1){
  todos[i].addEventListener('click', mudaFundo)

  todos[i].addEventListener('dblclick', riscaItem);
}


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
