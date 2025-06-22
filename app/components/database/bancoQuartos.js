import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('italugueis.db');

export function criarTabelaQuartos() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS quartos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        imagem TEXT,
        localizacao TEXT,
        preco TEXT
      );`
    );
  });
}

export function adicionarQuarto({ titulo, imagem, localizacao, preco }, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO quartos (titulo, imagem, localizacao, preco) VALUES (?, ?, ?, ?);',
      [titulo, imagem, localizacao, preco],
      (_, result) => callback && callback(result),
      (_, error) => { console.error(error); return false; }
    );
  });
}

export function listarQuartos(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM quartos;',
      [],
      (_, { rows }) => callback && callback(rows._array),
      (_, error) => { console.error(error); return false; }
    );
  });
}

export function removerQuarto(id, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM quartos WHERE id = ?;',
      [id],
      (_, result) => callback && callback(result),
      (_, error) => { console.error(error); return false; }
    );
  });
}