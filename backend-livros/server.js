const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Configuração do App
const app = express();
const PORT = 3000;

// Permite que o servidor entenda JSON (dados que vêm do app)
app.use(express.json());
// Permite que o app mobile acesse este servidor
app.use(cors());

// Configuração do Banco de Dados (SQLite)
// Isso cria um arquivo 'livraria.db' na pasta do projeto
const db = new sqlite3.Database('./livraria.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação da Tabela (Se não existir)
// Usamos comandos SQL em minúsculo conforme solicitado
db.serialize(() => {
    db.run(`
        create table if not exists livros (
            id integer primary key autoincrement,
            titulo text,
            autor text,
            ano integer,
            status text
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
        } else {
            console.log('Tabela "livros" pronta para uso.');
        }
    });
});

// Rotas da API
//Rota para Criar um novo livro
app.post('/livros', (req, res) => {
    const { titulo, autor, ano, status } = req.body; // Pegamos os dados do pacote
    const sql = 'insert into livros (titulo, autor, ano, status) values (?, ?, ?, ?)';
    
    // As interrogações (?) são substituídas pelos valores na ordem segura
    db.run(sql, [titulo, autor, ano, status], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        // Retornamos o ID do livro criado para confirmar
        res.json({ id: this.lastID, titulo, autor, ano, status });
    });
});

// Rota para Ler todos os livros
app.get('/livros', (req, res) => {
    const sql = 'select * from livros';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        // 'rows' contém a lista de todos os livros encontrados
        res.json(rows);
    });
});

// Rota para Atualizar um livro existente
app.put('/livros/:id', (req, res) => {
    const { id } = req.params; // Pega o ID da URL
    const { titulo, autor, ano, status } = req.body; // Pega os novos dados
    const sql = 'update livros set titulo = ?, autor = ?, ano = ?, status = ? where id = ?';

    db.run(sql, [titulo, autor, ano, status, id], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ message: 'Livro atualizado com sucesso!', changes: this.changes });
    });
});

// Rota para Deletar um livro
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'delete from livros where id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ message: 'Livro deletado com sucesso!' });
    });
});

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});