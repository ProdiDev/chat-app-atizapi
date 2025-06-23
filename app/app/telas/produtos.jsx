import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

// Substitua pelos nomes reais das imagens na pasta produtos
const produtos = [
    {
        id: '1',
        nome: 'Cigarro WhatsApp',
        preco: 'R$ 49,90',
        imagem: require('../../components/imagens/produtos/cigarrowhatsapp.jpg'),
        descricao: 'Versão premium do cigarro WhatsApp 2, com nicotina exclusiva.',
    },
    {
        id: '2',
        nome: 'Corote WhatsApp',
        preco: 'R$ 59,90',
        imagem: require('../../components/imagens/produtos/corotewhatsapp.jpg'),
        descricao: 'Ideal para inciantes, com muito alcool.',
    },
    {
        id: '3',
        nome: 'Doritos WhatsApp',
        preco: 'R$ 39,90',
        imagem: require('../../components/imagens/produtos/doritoswhatsapp.webp'),
        descricao: 'Mais sabor e crocância, com tempero whatsapp.',
    },
    {
        id: '4',
        nome: 'Tang Sabor WhatsApp',
        preco: 'R$ 69,90',
        imagem: require('../../components/imagens/produtos/tangwhatsapp.jpg'),
        descricao: 'Refrescante e saboroso, com o pó especial do WhatsApp.',
    },
    // Adicione mais produtos conforme necessário
];

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

export default function ProdutosWhatsapp2() {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
            <TouchableOpacity style={styles.buyBtn}>
                <Icon name="cart" size={20} color="#fff" />
                <Text style={styles.buyBtnText}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Produtos WhatsApp 2</Text>
            </View>
            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        flex: 1,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        padding: 12,
        width: CARD_WIDTH,
        alignItems: 'center',
        position: 'relative',
    },
    imagem: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
        resizeMode: 'stretch',
        backgroundColor: '#E0E0E0',
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'center',
    },
    descricao: {
        fontSize: 13,
        color: '#888',
        marginBottom: 4,
        textAlign: 'center',
    },
    preco: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#222',
        textAlign: 'center',
        marginBottom: 8,
    },
    buyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#388637',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 4,
    },
    buyBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 8,
    },
});