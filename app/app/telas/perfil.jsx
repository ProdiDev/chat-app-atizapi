import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function Perfil() {
    // Dados fictícios, substitua por dados reais do usuário se desejar
    const usuario = {
        nome: 'Otávio Silva',
        email: 'otavio@email.com',
        foto: 'https://randomuser.me/api/portraits/men/32.jpg',
        telefone: '(85) 99999-9999',
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" size={28} color="#222" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Perfil</Text>
                <View style={{ width: 28 }} />
            </View>
            <View style={styles.profileBox}>
                <Image source={{ uri: usuario.foto }} style={styles.avatar} />
                <Text style={styles.nome}>{usuario.nome}</Text>
                <Text style={styles.email}>{usuario.email}</Text>
            </View>
            <View style={styles.infoBox}>
                <Icon name="phone" size={22} color="#888" />
                <Text style={styles.infoText}>{usuario.telefone}</Text>
            </View>
            <View style={styles.infoBox}>
                <Icon name="email" size={22} color="#888" />
                <Text style={styles.infoText}>{usuario.email}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
                <Icon name="account-edit" size={20} color="#fff" />
                <Text style={styles.editBtnText}>Editar perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        flex: 1,
    },
    profileBox: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 12,
        backgroundColor: '#eee',
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
    },
    infoText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 10,
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e53935',
        borderRadius: 12,
        paddingVertical: 12,
        justifyContent: 'center',
        marginTop: 32,
    },
    editBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});