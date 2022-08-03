const botaoAdicionar = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const listaOl = document.getElementById('lista-tarefas');


function adicionaTarefa() {
  const item = document.createElement('li');
  item.innerHTML = input.value;
  item.className = 'item'
  listaOl.appendChild(item);

  input.value = '';

  listaOl.appendChild(item);


  function mudaFundo(event) {
    const itensLi = document.getElementsByClassName('item')
    
    for (let i = 0; i < itensLi.length; i+= 1){
      if (itensLi[i].style.backgroundColor == 'gray') {
        itensLi[i].style.backgroundColor = 'white'
      }
    }
    event.target.style.backgroundColor = 'gray'
  }
  item.addEventListener('click', mudaFundo)


  function riscaItem(event) {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed')
    }
    else {
      event.target.classList.add('completed')
    }
  }
  item.addEventListener('dblclick', riscaItem)
}

botaoAdicionar.addEventListener('click', adicionaTarefa);
