import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { retornaUsuario } from '../../components/database/bancoUsuarios';

export default function Perfil() {
    // Troque este email pelo email do usuário logado (ex: via contexto ou prop)
    const emailUsuarioLogado = 'ronaldinho@gmail.com';

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const user = await retornaUsuario(emailUsuarioLogado);
                setUsuario(user);
            } catch (e) {
                setUsuario(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUsuario();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#388637" />
            </View>
        );
    }

    if (!usuario) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#888', fontSize: 18 }}>Usuário não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" size={28} color="#222" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Perfil</Text>
                <View style={{ width: 28 }} />
            </View>
            <Image
                source={require('../../components/imagens/perfil/perfil1.png')}
                style={styles.coverImage}
            />
            <View style={styles.profileBox}>
                <Text style={styles.nome}>{usuario.nome}</Text>
                <Text style={styles.email}>{usuario.email}</Text>
            </View>
            <View style={styles.infoBox}>
                <Icon name="email" size={22} color="#888" />
                <Text style={styles.infoText}>{usuario.email}</Text>
            </View>
            <View style={styles.infoBox}>
                <Icon name="account" size={22} color="#888" />
                <Text style={styles.infoText}>{usuario.tipo}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 0,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        flex: 1,
    },
    coverImage: {
        width: '100%',
        height: 180,
        resizeMode: 'stretch',
        marginBottom: 16,
        backgroundColor: '#eee',
    },
    profileBox: {
        alignItems: 'center',
        marginBottom: 32,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    email: {
        fontSize: 15,
        color: '#888',
        marginBottom: 2,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        marginHorizontal: 24,
    },
    infoText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 10,
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#388637',
        borderRadius: 12,
        paddingVertical: 12,
        justifyContent: 'center',
        marginTop: 32,
        marginHorizontal: 24,
    },
    editBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});