import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

// Abre uma conexão com o banco
export async function abrirBanco() {
  return await SQLite.openDatabaseAsync('italugueis.db');
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

// Cria a tabela de usuários se não existir
export async function criarBanco() {
  try {
    const banco = await abrirBanco();
    await banco.runAsync(
      "CREATE TABLE IF NOT EXISTS usuarios (id TEXT PRIMARY KEY, email TEXT NOT NULL, senha TEXT, nome TEXT, tipo TEXT);"
    );
    await fecharBanco(banco);
    console.log("Tabela 'usuarios' criada ou já existente.");
  } catch (e) {
    console.log("Erro ao criar tabela:", e);
  }
}

// Exclui o banco de dados (certifique-se de fechar todas as conexões antes)
export async function excluirBanco() {
  console.log("Excluindo banco de dados...");
  await SQLite.deleteDatabaseAsync('italugueis.db');
  console.log("Banco de dados excluído com sucesso.");
}

// Insere um novo usuário
export async function inserirUsuarios(nome, email, senha, tipo) {
  const id = uuid.v4();
  const banco = await abrirBanco();
  await banco.runAsync(
    "INSERT INTO usuarios (id, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)",
    [id, nome, email, senha, tipo]
  );
  await fecharBanco(banco);
  console.log("Usuário inserido:", id, nome, email, tipo);
  return id;
}

// Remove usuários pelo nome
export async function removerUsuarios(nome) {
  const banco = await abrirBanco();
  await banco.runAsync("DELETE FROM usuarios WHERE nome = ?", [nome]);
  await fecharBanco(banco);
  console.log("Usuário(s) removido(s) com nome:", nome);
}

// Busca um usuário pelo email
export async function retornaUsuario(email) {
  const banco = await abrirBanco();
  const dados = await banco.getAllAsync("SELECT * FROM usuarios WHERE email = ?", [email]);
  await fecharBanco(banco);
  console.log("retornaUsuario", dados);
  return dados && dados.length > 0 ? dados[0] : null;
}

// Lista todos os usuários
export async function listarUsuarios() {
  const banco = await abrirBanco();
  const dados = await banco.getAllAsync("SELECT * FROM usuarios");
  await fecharBanco(banco);
  console.log("listarUsuarios", dados);
  return dados;
}