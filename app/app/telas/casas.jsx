import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const casas = [
    {
        id: '1',
        titulo: 'Casa na Praia',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Fortaleza, CE',
        preco: 'R$ 350/dia',
    },
    {
        id: '2',
        titulo: 'Chalé na Serra',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Gramado, RS',
        preco: 'R$ 420/dia',
    },
    {
        id: '3',
        titulo: 'Apartamento Urbano',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'São Paulo, SP',
        preco: 'R$ 290/dia',
    },
    {
        id: '4',
        titulo: 'Casa de Campo',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Interior, MG',
        preco: 'R$ 310/dia',
    },
    {
        id: '5',
        titulo: 'Cobertura Luxuosa',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Rio de Janeiro, RJ',
        preco: 'R$ 600/dia',
    },
    {
        id: '6',
        titulo: 'Casa Histórica',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Ouro Preto, MG',
        preco: 'R$ 400/dia',
    },
    {
        id: '7',
        titulo: 'Casa Moderna',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Curitiba, PR',
        preco: 'R$ 450/dia',
    },
    {
        id: '8',
        titulo: 'Casa de Praia com Vista',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Natal, RN',
        preco: 'R$ 500/dia',
    },
    {
        id: '9',
        titulo: 'Casa Rústica',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Chapada Diamantina, BA',
        preco: 'R$ 380/dia',
    },
    {
        id: '10',
        titulo: 'Casa com Piscina',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Florianópolis, SC',
        preco: 'R$ 550/dia',
    },
];

const numColumns = 2;
const CARD_WIDTH = (Dimensions.get('window').width - 48) / numColumns;

export default function Casas() {
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
                <Text style={styles.header}>Casas disponíveis</Text>
                <View style={{ width: 28 }} /> {/* Espaço para alinhar o título centralizado */}
            </View>
            <FlatList
                data={casas}
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