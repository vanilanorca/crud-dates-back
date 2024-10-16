const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { task, category } = req.body;

    // Verificar se os dados foram recebidos corretamente
    if (!task || !category) {
        return res.status(400).json({ message: 'Task ou categoria ausente' });
    }

    // Adicionar a tarefa como um objeto
    tasks.push({ task: task, category: category });
    res.json({ message: 'Tarefa adicionada com sucesso' });
});

// Rota para editar uma tarefa existente
app.put('/tasks/:index', (req, res) => {
    const index = req.params.index;
    const { task, category } = req.body;

    if (!task || !category) {
        return res.status(400).json({ message: 'Task ou categoria ausente' });
    }

    tasks[index] = { task, category }; // Atualizar a tarefa corretamente
    res.json({ message: 'Tarefa atualizada' });
});

// Rota para deletar uma tarefa
app.delete('/tasks/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.json({ message: 'Tarefa deletada' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

