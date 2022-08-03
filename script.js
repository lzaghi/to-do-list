// requisito 5
const botaoAdicionar = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const listaOl = document.getElementById('lista-tarefas');

function adicionaTarefa() {
  const item = document.createElement('li');
  item.innerHTML = input.value;

  listaOl.appendChild(item);

  input.value = '';
}

botaoAdicionar.addEventListener('click', adicionaTarefa);