import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { abrirBanco, listarUsuarios } from '../../components/database/bancoUsuarios';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const lista = await listarUsuarios();
      setUsuarios(lista);
    }
    fetchUsuarios();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Gerenciamento</Text>
      </View>

      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => router.push('/telas-admin/chat-admin')}
      >
        <Icon name="chat" size={22} color="#fff" />
        <Text style={styles.chatBtnText}>Ir para Chat Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => router.push('/telas-admin/perfil')}
      >
        <Icon name="chat" size={22} color="#fff" />
        <Text style={styles.chatBtnText}>Perfil</Text>
      </TouchableOpacity>



      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.usuarioBox}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.tipo}>{item.tipo}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 32, color: '#888' }}>
            Nenhum usuário cadastrado.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F6',
    borderRadius: 20,
    margin: 16,
    height: 40,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388637',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'center',
  },
  chatBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  usuarioBox: {
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  tipo: {
    fontSize: 14,
    color: '#e53935',
    marginTop: 4,
  },
});