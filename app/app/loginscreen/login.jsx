import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { abrirBanco, criarBanco, excluirBanco, fecharBanco, retornaUsuario } from '../../components/database/bancoUsuarios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState(''); // 'cliente' ou 'administrador'

    useEffect(() => {
        criarBanco();
        console.log('Banco de dados criado ou já existente');
    }, []);

    function cadastrar() {
        router.push('../loginscreen/cadastro');
    };

    async function deletarBanco() {
        const banco = await abrirBanco();
        await fecharBanco(banco);
        console.log('Banco de dados fechado com sucesso.');
        await excluirBanco();
        alert('Banco de dados deletado com sucesso!');
        router.push('../loginscreen/login');
    }

    const handleLogin = () => {
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        retornaUsuario(email)
            .then((usuario) => {
                if (!usuario) {
                    alert('Usuário não encontrado. Por favor, cadastre-se.');
                    return;
                }
                if (usuario.senha !== senha) {
                    alert('Senha incorreta. Tente novamente.');
                    return;
                }
                if (usuario.senha === senha) {
                    setNome(usuario.nome);
                    setTipo(usuario.tipo);
                    console.log(tipo);
                    if (tipo !== 'administrador') {
                        router.push('../telas/principal');
                    } else {
                        router.push('../telas-admin/principal');
                    }
                    alert('Login realizado!');
                    console.log('Usuário logado:', usuario);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar usuário:', error);
                alert('Erro ao buscar usuário. Tente novamente.');
                return;
            });
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i1.sndcdn.com/avatars-WhC8h2jpeTUzFPck-lYXDIQ-t1080x1080.jpg' }}
                style={{ width: '100%', height: 100, marginBottom: 24, resizeMode: 'stretch' }} // Imagem esticada
            />
            <Text style={styles.titulo}>LANÇAMENTO!!!!!!!!</Text>
            <Text style={styles.subtitulo}>Faça login para conversar</Text>
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
                <Text style={styles.loginBtnText}>Conversar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cadastrar}>
                <Text style={styles.cadastroText}>Não tem conta? Cadastre-se agora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletarBanco}>
                <Text style={styles.cadastroText}>Deletar banco de dados</Text>
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
        backgroundColor: '#388637',
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
        color: '#005205',
        fontSize: 15,
        marginTop: 8,
    },
});