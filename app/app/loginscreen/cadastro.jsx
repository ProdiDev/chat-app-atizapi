import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { criarBanco, inserirUsuarios } from '../../components/database/bancoUsuarios';

// Imagens disponíveis para perfil
const imagensPerfil = [
    require('../../components/imagens/perfil/perfil1.png'),
    require('../../components/imagens/perfil/perfil2.jpg'),
    require('../../components/imagens/perfil/perfil3.jpg'),
];

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [tipo, setTipo] = useState('cliente');
    const [imagemSelecionada, setImagemSelecionada] = useState(imagensPerfil[0]);

    useEffect(() => {
        criarBanco();
    }, []);

    async function handleCadastro() {
        if (!nome || !email || !senha || !tipo || !imagemSelecionada) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            // Salva o caminho relativo da imagem selecionada
            await inserirUsuarios(nome, email, senha, tipo, Image.resolveAssetSource(imagemSelecionada).uri);
            alert('Usuário cadastrado com sucesso!');
            router.replace('../loginscreen/login');
        } catch (e) {
            console.log('Erro ao cadastrar usuário', e);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    }

    return (
        <View style={styles.container}>
            {/* Foto de perfil selecionada */}
            <Image
                source={imagemSelecionada}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 8,
                    alignSelf: 'center',
                    borderWidth: 2,
                    borderColor: '#388637'
                }}
            />
            <Text style={styles.subtitulo}>Escolha sua foto de perfil</Text>
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {imagensPerfil.map((img, idx) => (
                    <TouchableOpacity key={idx} onPress={() => setImagemSelecionada(img)}>
                        <Image
                            source={img}
                            style={[
                                styles.imagemPerfilMini,
                                imagemSelecionada === img && styles.imagemPerfilMiniSelecionada
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

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
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 15,
        color: '#888',
        marginBottom: 8,
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
        backgroundColor: '#388637',
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
    imagemPerfilMini: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginHorizontal: 6,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    imagemPerfilMiniSelecionada: {
        borderColor: '#388637',
    },
});