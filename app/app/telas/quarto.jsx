import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const quartos = [
    {
        id: '1',
        titulo: 'Quarto Suíte',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Fortaleza, CE',
        preco: 'R$ 120/dia',
    },
    {
        id: '2',
        titulo: 'Quarto Simples',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Gramado, RS',
        preco: 'R$ 80/dia',
    },
    {
        id: '3',
        titulo: 'Quarto Luxo',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'São Paulo, SP',
        preco: 'R$ 200/dia',
    },
    {
        id: '4',
        titulo: 'Quarto Compartilhado',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Rio de Janeiro, RJ',
        preco: 'R$ 60/dia',
    },
    {
        id: '5',
        titulo: 'Quarto Familiar',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Belo Horizonte, MG',
        preco: 'R$ 150/dia',
    },
    {
        id: '6',
        titulo: 'Quarto Executivo',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Curitiba, PR',
        preco: 'R$ 180/dia',
    },
    {
        id: '7',
        titulo: 'Quarto com Vista para o Mar',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Salvador, BA',
        preco: 'R$ 220/dia',
    },
    {
        id: '8',
        titulo: 'Quarto Aconchegante',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Recife, PE',
        preco: 'R$ 100/dia',
    },
];

const numColumns = 2;
const CARD_WIDTH = (Dimensions.get('window').width - 48) / numColumns;

export default function Quarto() {
    const [favoritos, setFavoritos] = useState([]);

    const toggleFavorito = (id) => {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.favBtn}
                onPress={() => toggleFavorito(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Icon
                    name={favoritos.includes(item.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favoritos.includes(item.id) ? '#e53935' : '#888'}
                />
            </TouchableOpacity>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.localizacao}>{item.localizacao}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" size={28} color="#222" />
                </TouchableOpacity>
                <Text style={styles.header}>Quartos disponíveis</Text>
                <View style={{ width: 28 }} />
            </View>
            <FlatList
                data={quartos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
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
    favBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 2,
        elevation: 2,
    },
    imagem: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: '#E0E0E0',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'center',
    },
    localizacao: {
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
    },
});