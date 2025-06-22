import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { criarBanco, inserirUsuarios } from '../../components/database/bancoUsuarios';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [tipo, setTipo] = useState('cliente');

    useEffect(() => {
        criarBanco();
    }, []);

    async function handleCadastro() {
        if (!nome || !email || !senha || !tipo) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            await inserirUsuarios(nome, email, senha, tipo);
            alert('Usuário cadastrado com sucesso!');
            router.replace('../loginscreen/login');
        } catch (e) {
            console.log('Erro ao cadastrar usuário', e);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Cadastro</Text>
            <Text style={styles.subtitulo}>Crie sua conta para continuar</Text>
            <View style={styles.inputBox}>
                <Icon name="account-outline" size={22} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                />
            </View>
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
            <View style={styles.tipoBox}>
                <TouchableOpacity
                    style={[
                        styles.tipoBtn,
                        tipo === 'cliente' && styles.tipoBtnAtivo
                    ]}
                    onPress={() => setTipo('cliente')}
                >
                    <Text style={[
                        styles.tipoBtnText,
                        tipo === 'cliente' && styles.tipoBtnTextAtivo
                    ]}>Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tipoBtn,
                        tipo === 'administrador' && styles.tipoBtnAtivo
                    ]}
                    onPress={() => setTipo('administrador')}
                >
                    <Text style={[
                        styles.tipoBtnText,
                        tipo === 'administrador' && styles.tipoBtnTextAtivo
                    ]}>Administrador</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleCadastro}>
                <Text style={styles.loginBtnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('../loginscreen/login')}>
                <Text style={styles.cadastroText}>Já tem conta? Faça login</Text>
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
    tipoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    tipoBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    tipoBtnAtivo: {
        backgroundColor: '#e53935',
    },
    tipoBtnText: {
        color: '#888',
        fontSize: 15,
        fontWeight: 'bold',
    },
    tipoBtnTextAtivo: {
        color: '#fff',
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