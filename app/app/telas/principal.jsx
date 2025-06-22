import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color="#bbb" style={{ marginLeft: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#bbb"
        />
      </View>

      {/* Menu Icons */}
      <View style={styles.menuRow}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/telas/casas')}>
          <Icon name="home-outline" size={28} />
          <Text style={styles.menuText}>Casas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/telas/quarto')}>
          <Icon name="bed-outline" size={28} />
          <Text style={styles.menuText}>Quartos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/telas/salvos')}>
          <Icon name="heart-outline" size={28} />
          <Text style={styles.menuText}>Salvos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <ScrollView>
        {/* Escolha dos hospedes */}
        <Text style={styles.sectionTitle}>Escolha dos hospedes</Text>
        <View style={styles.horizontalScroll}>
          <View style={styles.card}>
            {/* Imagem do imóvel */}
          </View>
          <View style={styles.card}>
            {/* Imagem do imóvel */}
          </View>
        </View>
        <View style={styles.cardLabelRow}>
          <Text style={styles.cardLabel}>imovel_Titulo</Text>
          <Text style={styles.cardLabel}>Imovel_Titulo</Text>
        </View>
        <View style={styles.divider} />

        {/* Casas proximas */}
        <Text style={styles.sectionTitle}>Casas proximas</Text>
        <View style={styles.cardLarge}>
          {/* Imagem do imóvel */}
        </View>
      </ScrollView>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F6',
    borderRadius: 20,
    margin: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 8,
  },
  menuItem: {
    alignItems: 'center'
  },
  menuText: {
    fontSize: 14, marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 4,
  },
  card: {
    width: 160,
    height: 140,
    backgroundColor: '#F3F3F6',
    borderRadius: 18,
    marginRight: 12,
  },
  cardLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  cardLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 160,
  },
  cardLarge: {
    width: '92%',
    height: 140,
    backgroundColor: '#F3F3F6',
    borderRadius: 18,
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1
  },
  tabLabel: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2
  },
  tabLabelActive: {
    fontSize: 12,
    olor: '#000',
    fontWeight: 'bold',
    marginTop: 2
  },
});