const botaoAdicionar = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const listaOl = document.getElementById('lista-tarefas');
const botaoLimpar = document.getElementById('apaga-tudo');
const botaoUp = document.getElementById('mover-cima');
const botaoDown = document.getElementById('mover-baixo');
const botaoCompletos = document.getElementById('remover-finalizados');
const botaoSalvar = document.getElementById('salvar-tarefas'); 
const botaoRemover = document.getElementById('remover-selecionado');

function mudaFundo(event) {
  const itensLi = document.getElementsByClassName('span')

  for (let i = 0; i < itensLi.length; i+= 1){
    if (itensLi[i].classList.contains('selected')) {
      itensLi[i].classList.remove('selected')
    }
  }
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

  localStorage.setItem('itens', JSON.stringify([]))
}

function removeCompletos() {
  const completos = document.getElementsByClassName('completed');

  if (completos.length > 0) {
    for (let i = completos.length - 1; i >= 0; i -= 1) {
      completos[i].parentNode.remove()
    }
  }
}

function removeTarefa() {
  const selecionado = document.querySelector('.selected')

  if (selecionado !== null) {
    selecionado.parentNode.remove()
  }
}

function jogaProLocal() {
  localStorage.setItem('itens', JSON.stringify([]))
  let itens = document.getElementsByClassName('item');
  let array = JSON.parse(localStorage.getItem('itens'))

  for (let i = 0; i < itens.length; i += 1) {
    array.push(itens[i].outerHTML)
  }
  localStorage.setItem('itens', JSON.stringify(array))
}

function moveUp() {
  let selected = document.querySelector('.selected')
  let array = []
  for (let ji = 0; ji < listaOl.children.length; ji += 1){
    array.push(listaOl.children[ji])
  }
  if (selected.parentNode != listaOl.children[0]) {
    let indexSel;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] == selected.parentNode) {
        indexSel = i
      }
    }
    let temporary = array[indexSel]
    array[indexSel] = array[indexSel-1]
    array[indexSel-1] = temporary;
    listaOl.innerHTML = ''
    for (let k = 0; k < array.length; k += 1){
      listaOl.appendChild(array[k])
    }
  }
}

function moveDown() {
  let selected = document.querySelector('.selected')
  let array = []
  for (let ji = 0; ji < listaOl.children.length; ji += 1){
    array.push(listaOl.children[ji])
  }
  if (selected.parentNode != listaOl.children[listaOl.children.length-1]) {
    let indexSel;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] == selected.parentNode) {
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
  if (input.value) {
    const item = document.createElement('li');
    item.className = 'item'

    const span = document.createElement('span')
    span.className = 'span'
    span.innerHTML = input.value;
    
    item.appendChild(span)
    listaOl.appendChild(item);

    input.value = '';
    
    let todos = document.getElementsByClassName('span')
    for (let i = 0; i < todos.length; i += 1){
      todos[i].addEventListener('click', mudaFundo)
      todos[i].addEventListener('dblclick', riscaItem);
    }

    botaoLimpar.addEventListener('click', limpaLista);
    botaoUp.addEventListener('click', moveUp)
    botaoDown.addEventListener('click', moveDown)
    botaoCompletos.addEventListener('click', removeCompletos)
    botaoSalvar.addEventListener('click', jogaProLocal);
    botaoRemover.addEventListener('click', removeTarefa)
  }
  
}

botaoAdicionar.addEventListener('click', adicionaTarefa);
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') adicionaTarefa()
})

// let todos = listaOl.children
// for (let i = 0; i < todos.length; i += 1){
//   todos[i].addEventListener('click', mudaFundo)
//   todos[i].addEventListener('dblclick', riscaItem);
// }


function pegaDoLocal() {
  if (localStorage.getItem('itens') === null) {
    localStorage.setItem('itens', JSON.stringify([]));
  } else {
    const itensLista = JSON.parse(localStorage.getItem('itens'))
    for (let i = 0; i < itensLista.length; i += 1) {
      listaOl.innerHTML += itensLista[i]
    }
    let todos = document.getElementsByClassName('span')
    for (let i = 0; i < todos.length; i += 1){
      todos[i].addEventListener('click', mudaFundo)
      todos[i].addEventListener('dblclick', riscaItem);
    }

    botaoLimpar.addEventListener('click', limpaLista);
    botaoUp.addEventListener('click', moveUp)
    botaoDown.addEventListener('click', moveDown)
    botaoCompletos.addEventListener('click', removeCompletos)
    botaoSalvar.addEventListener('click', jogaProLocal);
    botaoRemover.addEventListener('click', removeTarefa)
  }
}

window.onload = function() {
  pegaDoLocal();
}
