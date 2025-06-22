import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { criarTabelaCasas, listarCasas, adicionarCasa } from './database/bancoCasas';

export default function Casas() {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    criarTabelaCasas();
    listarCasas(setCasas);
  }, []);

  const handleAdd = () => {
    adicionarCasa({
      titulo: 'Casa Exemplo',
      imagem: 'https://via.placeholder.com/150',
      localizacao: 'São Paulo',
      preco: 'R$ 200/dia'
    }, () => listarCasas(setCasas));
  };

  return (
    <View>
      <Button title="Adicionar Casa" onPress={handleAdd} />
      <FlatList
        data={casas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo} - {item.localizacao} - {item.preco}</Text>
          </View>
        )}
      />
    </View>
  );
}