import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

// Exemplo de dados salvos (você pode integrar com AsyncStorage ou Context futuramente)
const salvos = [
    {
        id: '1',
        titulo: 'Casa na Praia',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Fortaleza, CE',
        preco: 'R$ 350/dia',
    },
    {
        id: '2',
        titulo: 'Quarto Suíte',
        imagem: 'https://via.placeholder.com/150',
        localizacao: 'Fortaleza, CE',
        preco: 'R$ 120/dia',
    },
];

const numColumns = 2;
const CARD_WIDTH = (Dimensions.get('window').width - 48) / numColumns;

export default function Salvos() {
    const [favoritos, setFavoritos] = useState(salvos.map(item => item.id));

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favBtn} disabled>
                <Icon name="heart" size={24} color="#e53935" />
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
                <Text style={styles.header}>Salvos</Text>
                <View style={{ width: 28 }} />
            </View>
            {salvos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="heart-outline" size={48} color="#ccc" />
                    <Text style={styles.emptyText}>Nenhum imóvel salvo ainda.</Text>
                </View>
            ) : (
                <FlatList
                    data={salvos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        marginTop: 12,
    },
});