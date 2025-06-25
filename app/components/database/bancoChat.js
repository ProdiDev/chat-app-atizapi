import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

export async function abrirBancoChat() {
    return await SQLite.openDatabaseAsync('italugueis.db');
}

export async function criarBancoChat() {
    const banco = await abrirBancoChat();
    await banco.runAsync(
        `CREATE TABLE IF NOT EXISTS chat (
            id TEXT PRIMARY KEY,
            remetente TEXT NOT NULL,
            destinatario TEXT NOT NULL,
            mensagem TEXT NOT NULL,
            dataEnvio TEXT NOT NULL
        );`
    );
    await banco.closeAsync();
    console.log("Tabela 'chat' criada ou já existente.");
}

export async function inserirMensagem(remetente, destinatario, mensagem, dataEnvio) {
    const banco = await abrirBancoChat();
    const id = uuid.v4();
    await banco.runAsync(
        "INSERT INTO chat (id, remetente, destinatario, mensagem, dataEnvio) VALUES (?, ?, ?, ?, ?)",
        [id, remetente, destinatario, mensagem, dataEnvio]
    );
    await banco.closeAsync();
    console.log("Mensagem inserida:", id, remetente, destinatario, mensagem, dataEnvio);
    return id;
}

export async function listarMensagens(remetente = null, destinatario = null) {
    const banco = await abrirBancoChat();
    let query = "SELECT * FROM chat ORDER BY dataEnvio ASC";
    let params = [];
    if (remetente && destinatario) {
        query = "SELECT * FROM chat WHERE (remetente = ? AND destinatario = ?) OR (remetente = ? AND destinatario = ?) ORDER BY dataEnvio ASC";
        params = [remetente, destinatario, destinatario, remetente];
    }
    const dados = await banco.getAllAsync(query, params);
    await banco.closeAsync();
    return dados;
}

export async function removerMensagemPorId(id) {
    const banco = await abrirBancoChat();
    await banco.runAsync("DELETE FROM chat WHERE id = ?", [id]);
    await banco.closeAsync();
    console.log(`Mensagem com id ${id} foi removida.`);
}