let tarefas = [];

document.getElementById('form-tarefa').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const titulo = form.titulo.value.trim();
  const descricao = form.descricao.value.trim();
  if (!titulo) return alert("tem que ter titulo comedia");
  const novaTarefa = {
    id: Date.now(),
    titulo,
    descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarLocal();
  renderTarefas();
  form.reset();
});

function salvarLocal() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarLocal() {
  const dados = localStorage.getItem('tarefas');
  tarefas = dados ? JSON.parse(dados) : [];
}

function setFiltro(filtro) {
  sessionStorage.setItem('filtro', filtro);
  renderTarefas();
}

function getFiltro() {
  return sessionStorage.getItem('filtro') || 'todas';
}

function renderTarefas() {
  const container = document.getElementById('lista-tarefas');
  container.innerHTML = '';
  const filtro = getFiltro();

  tarefas.forEach(tarefa => {
    if (
      (filtro === 'pendentes' && tarefa.concluida) ||
      (filtro === 'concluidas' && !tarefa.concluida)
    ) return;

    const div = document.createElement('div');
    div.className = 'tarefa' + (tarefa.concluida ? ' concluida' : '');
    div.innerHTML = `
      <div class="tarefa-card">
      <h3>${tarefa.titulo}</h3><br>
      <small>${tarefa.descricao}</small><br>
      <button onclick="Concluido(${tarefa.id})" id="concluir">Concluir</button>
      <button onclick="Excluir(${tarefa.id})" id="excluir">Excluir</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function Concluido(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa && !tarefa.concluida) {
    tarefa.concluida = true;
    salvarLocal();
    renderTarefas();
  }
}
function Excluir(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarLocal();
  renderTarefas();
}

carregarLocal();
renderTarefas();
