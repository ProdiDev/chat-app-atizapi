import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('italugueis.db');

export function criarTabelaUsuarios() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        senha TEXT,
        tipo TEXT
      );`
    );
  });
}

export function adicionarUsuario({ nome, email, senha, tipo }, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?);',
      [nome, email, senha, tipo],
      (_, result) => callback && callback(result),
      (_, error) => { console.error(error); return false; }
    );
  });
}

export function listarUsuarios(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM usuarios;',
      [],
      (_, { rows }) => callback && callback(rows._array),
      (_, error) => { console.error(error); return false; }
    );
  });
}

export function removerUsuario(id, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM usuarios WHERE id = ?;',
      [id],
      (_, result) => callback && callback(result),
      (_, error) => { console.error(error); return false; }
    );
  });
}