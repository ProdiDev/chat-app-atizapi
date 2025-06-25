// filepath: chat-messages-db/src/database/bancoChat.js
import * as SQLite from 'expo-sqlite';

// Abre uma conexão com o banco
export async function abrirBanco() {
  return await SQLite.openDatabaseAsync('chatMessages.db');
}

// Fecha a conexão com o banco
export async function fecharBanco(banco) {
  if (banco) {
    await banco.closeAsync();
    console.log("Banco de dados fechado com sucesso.");
  } else {
    console.log("Nenhum banco de dados aberto para fechar.");
  }
}

// Cria a tabela de mensagens se não existir
export async function criarBanco() {
  try {
    const banco = await abrirBanco();
    await banco.runAsync(
      "CREATE TABLE IF NOT EXISTS mensagens (id TEXT PRIMARY KEY, usuarioId TEXT NOT NULL, mensagem TEXT NOT NULL, timestamp INTEGER NOT NULL);"
    );
    await fecharBanco(banco);
    console.log("Tabela 'mensagens' criada ou já existente.");
  } catch (e) {
    console.log("Erro ao criar tabela:", e);
  }
}

// Insere uma nova mensagem
export async function inserirMensagem(usuarioId, mensagem) {
  const id = uuid.v4();
  const timestamp = Date.now();
  const banco = await abrirBanco();
  await banco.runAsync(
    "INSERT INTO mensagens (id, usuarioId, mensagem, timestamp) VALUES (?, ?, ?, ?)",
    [id, usuarioId, mensagem, timestamp]
  );
  await fecharBanco(banco);
  console.log("Mensagem inserida:", id, usuarioId, mensagem);
  return id;
}

// Lista todas as mensagens
export async function listarMensagens() {
  const banco = await abrirBanco();
  const dados = await banco.getAllAsync("SELECT * FROM mensagens");
  await fecharBanco(banco);
  console.log("listarMensagens", dados);
  return dados;
}

// Remove uma mensagem pelo ID
export async function removerMensagem(id) {
  const banco = await abrirBanco();
  await banco.runAsync("DELETE FROM mensagens WHERE id = ?", [id]);
  await fecharBanco(banco);
  console.log("Mensagem removida com ID:", id);
}