📚 API Meus Livros (Backend)

Este é o backend da aplicação "Meus Livros", desenvolvido em Node.js com Express e SQLite. Ele fornece uma API REST para realizar operações de CRUD (Create, Read, Update, Delete) de livros.

🚀 Tecnologias Utilizadas

Node.js: Ambiente de execução.

Express: Framework web.

SQLite3: Banco de dados.

Cors: Middleware de segurança.

⚙️ Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

🛠️ Como Rodar o Projeto

Clone o repositório:

git clone <seu-link-do-git>
cd backend-livros


Instale as dependências:

npm install


Inicie o servidor:

node server.js


Status:
O servidor rodará em http://localhost:3000.

O banco de dados livraria.db será criado automaticamente na primeira execução.

🔗 Endpoints da API

Método

Rota

Descrição

GET

/livros

Lista todos os livros

POST

/livros

Cadastra um novo livro

PUT

/livros/:id

Atualiza um livro existente

DELETE

/livros/:id

Remove um livro

Exemplo de JSON para Cadastro

Utilize este formato no corpo da requisição (Body) para criar ou atualizar um livro:

{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899,
  "status": "Lido"
}


🛡️ Segurança

O projeto utiliza Prepared Statements (ex: values (?, ?, ?, ?)) para prevenir SQL Injection.

Desenvolvido para fins acadêmicos.
