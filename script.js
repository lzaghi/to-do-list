// requisito 5
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
    console.log(itensLi);
    event.target.style.backgroundColor = 'gray'
  }
  item.addEventListener('click', mudaFundo)
}

botaoAdicionar.addEventListener('click', adicionaTarefa);
