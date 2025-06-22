import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { criarTabelaUsuarios, adicionarUsuario, retornaUsuario, inserirUsuarios } from '../../components/database/bancoUsuarios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState(''); // 'cliente' ou 'administrador'

    const cadastrar = () => {
        const novoNome = "Otavio";
        const novoEmail = "otavioandre111@gmail.com";
        const novaSenha = "123456";
        const novoTipo = "administrador";

        if (!novoNome || !novoEmail || !novaSenha || !novoTipo) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        inserirUsuarios({ nome: novoNome, email: novoEmail, senha: novaSenha, tipo: novoTipo }, (result) => {
            if (result.rowsAffected > 0) {
                alert('Usuário cadastrado com sucesso!');
                router.push('../telas-admin/principal');
            } else {
                alert('Erro ao cadastrar usuário. Tente novamente.');
            }
        });
    };

    const handleLogin = () => {
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        // Aqui você deveria buscar o usuário no banco e validar senha
        // Exemplo fictício:
        // retornaUsuario(email, senha, (usuario) => { ... });

        if (tipo !== 'administrador') {
            router.push('../telas/principal');
        } else {
            router.push('../telas-admin/principal');
        }
        alert('Login realizado!');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Bem-vindo!</Text>
            <Text style={styles.subtitulo}>Faça login para continuar</Text>
            <View style={styles.inputBox}>
                <Icon name="email-outline" size={22} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputBox}>
                <Icon name="lock-outline" size={22} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!mostrarSenha}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon
                        name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginBtnText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cadastrar}>
                <Text style={styles.cadastroText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 24,
        backgroundColor: '#eee',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 15,
        color: '#888',
        marginBottom: 24,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        width: '100%',
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#222',
    },
    loginBtn: {
        backgroundColor: '#e53935',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        width: '100%',
        marginTop: 8,
        marginBottom: 16,
    },
    loginBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cadastroText: {
        color: '#e53935',
        fontSize: 15,
        marginTop: 8,
    },
});