import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { listarMensagens, inserirMensagem, removerMensagemPorId } from '../../components/database/bancoChat';
import { useAuth } from '../../components/AuthContext'; // adicione este import

export default function HomeScreen() {
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState([]);
  const flatListRef = useRef(null);
  const { usuario } = useAuth(); // pega o usuário do contexto

  // Substitua o EMAIL_USUARIO fixo pelo email do contexto
  const EMAIL_USUARIO = usuario?.email || ''; // se não estiver logado, fica vazio
  const EMAIL_DESTINATARIO = 'admin@admin.com'; // Troque conforme necessário

  // Carrega as mensagens do banco ao abrir a tela
  useEffect(() => {
    carregarMensagens();
  }, []);

  async function carregarMensagens() {
    const msgs = await listarMensagens();
    setConversa(msgs.map(msg => ({
      id: msg.id,
      texto: msg.mensagem,
      enviado: msg.remetente === EMAIL_USUARIO,
      remetente: msg.remetente, // Adiciona o remetente para exibir
      dataEnvio: msg.dataEnvio
    })));
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  // Salva mensagem no banco e atualiza a tela
  const enviarMensagem = async () => {
    if (mensagem.trim() === '') return;
    const dataEnvio = new Date().toISOString();
    await inserirMensagem(EMAIL_USUARIO, EMAIL_DESTINATARIO, mensagem, dataEnvio);
    setMensagem('');
    await carregarMensagens();
  };

  // Remove mensagem do banco e da tela
  const excluirMensagem = async (id) => {
    await removerMensagemPorId(id);
    await carregarMensagens();
  };

  const handleLongPress = (id) => {
    Alert.alert(
      'Excluir mensagem',
      'Deseja excluir esta mensagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => excluirMensagem(id) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item.id)}
      activeOpacity={0.7}
      style={[
        styles.balao,
        item.enviado ? styles.balaoEnviado : styles.balaoRecebido
      ]}
    >
      {/* Mostra o remetente se não for o usuário logado */}
      {!item.enviado && (
        <Text style={styles.remetenteLabel}>{item.remetente}</Text>
      )}
      <Text style={styles.textoBalao}>{item.texto}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Chat Online</Text>
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
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lista}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChangeText={setMensagem}
            onSubmitEditing={enviarMensagem}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={enviarMensagem}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F6',
    borderRadius: 20,
    margin: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 8,
  },
  menuItem: {
    alignItems: 'center'
  },
  menuText: {
    fontSize: 14, marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 4,
  },
  card: {
    width: 160,
    height: 140,
    backgroundColor: '#F3F3F6',
    borderRadius: 18,
    marginRight: 12,
  },
  cardLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  cardLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 160,
  },
  cardLarge: {
    width: '92%',
    height: 140,
    backgroundColor: '#F3F3F6',
    borderRadius: 18,
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1
  },
  tabLabel: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2
  },
  tabLabelActive: {
    fontSize: 12,
    olor: '#000',
    fontWeight: 'bold',
    marginTop: 2
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
  },
  remetenteLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
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
    marginRight: 8,
    color: '#222',
  },
  sendBtn: {
    backgroundColor: '#388637',
    borderRadius: 22,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});