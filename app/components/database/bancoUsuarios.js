import * as SQLite from 'expo-sqlite';
import * as uuid from 'uuid';

export async function abrirBanco() {
  const db = await SQLite.openDatabaseAsync('italugueis.db');
  return db;
}

export async function criarBanco() {
  const banco = await abrirBanco();
  const result = await banco.runAsync("CREATE TABLE IF NOT EXISTS usuarios (id TEXT PRIMARY KEY, email TEXT NOT NULL, senha TEXT, nome TEXT, tipo TEXT); ")
  console.log(result.changes)
}

export async function excluirBanco() {
  await SQLite.deleteDatabaseAsync('italugueis.db');
  console.log("Banco de dados excluído com sucesso.");
}

export async function inserirUsuarios(email, senha, nome, tipo) {
  let id = uuid.v4();
  console.log("inserirUsuarios", id, email, senha, nome, tipo);
  const banco = await abrirBanco();
  const dados = await banco.runAsync("INSERT INTO compras (id, email, senha, nome, tipo) VALUES (?, ?, ?, ?, ?)", [id, email, senha, nome, tipo]);
  console.log("inserirProdutos", dados.changes);
  return id;
}

export async function removerUsuarios(nome) {
  const banco = await abrirBanco();
  const dados = await banco.runAsync("DELETE FROM usuarios WHERE nome = '?' ", [nome]);
  console.log("removerUsuarios", dados.changes);
}

export async function retornaUsuario() {
  const banco = await abrirBanco();
  const dados = await banco.getAsync("SELECT FROM usuarios WHERE nome = 'Otavio'");
  console.log("retornaUsuario", dados);
  return dados;
}
