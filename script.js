// function adicionarTarefa() {
    //     const tarefa = document.getElementById('tarefa').value;
    //     const descricao = document.getElementById('descricao').value;
    //     const listaTarefas = document.getElementById('lista-tarefas');
    //     const novaTarefa = document.createElement('li');
    
    //     novaTarefa.textContent = tarefa;
    //     listaTarefas.appendChild(novaTarefa);
    // }
    
    // localStorage.setItem('tarefas', listaTarefas.innerHTML);
    
    
    
    let tarefas = [];
    
    document.getElementById('form-tarefa').addEventListener('submit', elementos => {
      e.preventDefault();
      const forms = new FormData(elementos.target);
      const novaTarefa = {
        id: Date.now(),
        titulo: forms.get('titulo'),
        descricao: forms.get('descricao'),
        concluida: false
      };
      tarefas.push(novaTarefa);
      salvarLocal();
      salvarMongo(novaTarefa);
      renderTarefas();
      elementos.target.reset();
    });
    
    function salvarLocal() {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
    
    function carregarLocal() {
      const local = localStorage.getItem('tarefas');
      tarefas = local ? JSON.parse(local) : [];
    }
    
    function salvarMongo(tarefa) {
      fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
      }).catch(err => console.error('Erro ao salvar no MongoDB:', err));
    }
    
    function atualizarMongo(id, concluida) {
      fetch(`/api/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida })
      }).catch(err => console.error('Erro ao atualizar no MongoDB:', err));
    }
    
    function excluirMongo(id) {
      fetch(`/api/tarefas/${id}`, {
        method: 'DELETE'
      }).catch(err => console.error('Erro ao excluir no MongoDB:', err));
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
          filtro === 'pendentes' && tarefa.concluida ||
          filtro === 'concluidas' && !tarefa.concluida
        ) return;
    
        const div = document.createElement('div');
        div.className = 'tarefa' + (tarefa.concluida ? ' concluida' : '');
        div.innerHTML = `
          <strong>${tarefa.titulo}</strong><br>
          <small>${tarefa.descricao}</small><br>
          <button onclick="toggleConclusao(${tarefa.id})">Concluir</button>
          <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
        `;
        container.appendChild(div);
      });
    }
    
    function toggleConclusao(id) {
      const tarefa = tarefas.find(t => t.id === id);
      if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarLocal();
        atualizarMongo(id, tarefa.concluida);
        renderTarefas();
      }
    }
    
    function excluirTarefa(id) {
      tarefas = tarefas.filter(t => t.id !== id);
      salvarLocal();
      excluirMongo(id);
      renderTarefas();
    }
    
    carregarLocal();
    renderTarefas();
