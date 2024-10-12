const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./consultas.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Adicionar a coluna specialty se ela não existir
db.serialize(() => {
  // Criar a tabela de usuários, se necessário
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela users:", err.message);
    } else {
      console.log("Tabela users criada ou já existe.");
    }
  });

  // Adiciona a coluna specialty na tabela consultations, se ela ainda não existir
  db.run(`ALTER TABLE consultations ADD COLUMN specialty TEXT`, (err) => {
    if (err) {
      if (err.message.includes("duplicate column name")) {
        console.log("A coluna specialty já existe.");
      } else {
        console.error("Erro ao adicionar a coluna specialty:", err.message);
      }
    } else {
      console.log("Coluna specialty adicionada com sucesso.");
    }
  });
});

module.exports = db;
