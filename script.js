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
        itensLi[i].classList.remove('selected')
      }
    }
    event.target.style.backgroundColor = 'gray'
    event.target.classList.add('selected')
  }
  item.addEventListener('click', mudaFundo)


  function riscaItem(event) {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    }
    else {
      event.target.classList.add('completed');
    }
  }
  item.addEventListener('dblclick', riscaItem);


  const botaoLimpar = document.getElementById('apaga-tudo');

  function limpaLista() {
    const itensLi = document.getElementsByClassName('item');

    if (itensLi.length > 0) {
      for (let i = itensLi.length - 1; i >= 0; i -= 1) {
        itensLi[i].remove();
      }
    }
  }
  botaoLimpar.addEventListener('click', limpaLista);


  const botaoCompletos = document.getElementById('remover-finalizados');

  function removeCompletos() {
    const completos = document.getElementsByClassName('completed');

    if (completos.length > 0) {
      for (let i = completos.length - 1; i >= 0; i -= 1) {
        completos[i].remove()
      }
    }
  }
  botaoCompletos.addEventListener('click', removeCompletos)


  // const botaoSalvar = document.getElementById('salvar-tarefas');

  // function itensLocal() {
  //   const listaAntiga = JSON.parse(localStorage.getItem('itens'));
  //   const itensLi = document.getElementsByClassName('item');
  //   console.log(itensLi);
  //   if (itensLi.length > 0) {
  //     for (let i = 0; i < itensLi.length; i += 1) {
  //       listaAntiga.push(itensLi[i])
  //     }
      
  //     localStorage.setItem('itens', JSON.stringify(listaAntiga))
  //   }
  // }
  
  // botaoSalvar.addEventListener('click', itensLocal);

  const botaoRemover = document.getElementById('remover-selecionado')

  function removeTarefa() {
    const selecionado = document.querySelector('.selected')

    if (selecionado !== null) {
      selecionado.remove()
    }

  }
  botaoRemover.addEventListener('click', removeTarefa)
}

botaoAdicionar.addEventListener('click', adicionaTarefa);


// function initialRenderization() {
//   if (localStorage.getItem('itens') === null) {
//     localStorage.setItem('itens', JSON.stringify([]));
//   } else {
//     const itensLista = JSON.parse(localStorage.getItem('itens'));
  
//     for (let index = 0; index < itensLista.length; index += 1) {
//       const listElement = document.createElement('li');

//       listElement.innerText = phrasesList[index];

//       list.appendChild(listElement);
//     }
//   }
// }

// window.onload = function() {
//   initialRenderization();
// };