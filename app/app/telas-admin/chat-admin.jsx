import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { listarMensagens, inserirMensagem, removerMensagemPorId, criarBancoChat } from '../../components/database/bancoChat';
import { useAuth } from '../../components/AuthContext'; // ADICIONADO

export default function ChatAdmin() {
    const [mensagem, setMensagem] = useState('');
    const [conversa, setConversa] = useState([]);
    const flatListRef = useRef(null);
    const { usuario } = useAuth(); // ADICIONADO

    // Usa o email do contexto
    const EMAIL_ADMIN = usuario?.email || '';
    const EMAIL_USUARIO = '';

    // Carrega as mensagens do banco ao abrir a tela
    useEffect(() => {
        async function inicializar() {
            await criarBancoChat(); // Garante que a tabela existe
            await carregarMensagens();
        }
        inicializar();
    }, []);

    async function carregarMensagens() {
        const msgs = await listarMensagens();
        setConversa(msgs.map(msg => ({
            id: msg.id,
            texto: msg.mensagem,
            enviado: msg.remetente === EMAIL_ADMIN,
            remetente: msg.remetente, // Adiciona o remetente
            dataEnvio: msg.dataEnvio
        })));
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 100);
    }

    const enviarMensagem = async () => {
        if (mensagem.trim() === '') return;
        await inserirMensagem(EMAIL_ADMIN, EMAIL_USUARIO, mensagem, new Date().toISOString());
        setMensagem('');
        await carregarMensagens();
    };

    const deletarMensagem = (id) => {
        Alert.alert(
            'Deletar mensagem',
            'Tem certeza que deseja deletar esta mensagem?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        await removerMensagemPorId(id);
                        await carregarMensagens();
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.balao,
                item.enviado ? styles.balaoEnviado : styles.balaoRecebido
            ]}
        >
            {/* Sempre mostra o remetente acima da mensagem */}
            <Text style={styles.remetenteLabel}>{item.remetente}</Text>
            {/* Botão deletar no canto superior direito */}
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deletarMensagem(item.id)}
            >
                <Icon name="delete-outline" size={18} color="#c00" />
            </TouchableOpacity>
            <Text style={styles.textoBalao}>{item.texto}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Chat Admin</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={flatListRef}
                    data={conversa}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.lista}
                    onContentSizeChange={() => {
                        if (flatListRef.current) {
                            flatListRef.current.scrollToEnd({ animated: true });
                        }
                    }}
                />
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChangeText={setMensagem}
                        onSubmitEditing={() => {
                            if (mensagem.trim() !== '') enviarMensagem();
                        }}
                        returnKeyType="send"
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={enviarMensagem} disabled={mensagem.trim() === ''}>
                        <Icon name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    lista: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    balao: {
        maxWidth: '75%',
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        position: 'relative',
        alignSelf: 'flex-start',
    },
    balaoEnviado: {
        backgroundColor: '#388637',
        alignSelf: 'flex-end',
    },
    balaoRecebido: {
        backgroundColor: '#F4F4F4',
        alignSelf: 'flex-start',
    },
    textoBalao: {
        color: '#222',
        fontSize: 16,
        marginTop: 4,
    },
    deleteBtn: {
        position: 'absolute',
        top: 6,
        right: 6,
        padding: 2,
        zIndex: 2,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: '#F4F4F4',
        borderRadius: 22,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#222',
    },
    sendBtn: {
        marginLeft: 8,
        padding: 10,
        borderRadius: 22,
        backgroundColor: '#388637',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remetenteLabel: {
        color: '#888',
        fontSize: 12,
        marginBottom: 2,
    },
});