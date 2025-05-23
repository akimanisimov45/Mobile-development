import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Item = {
  id: string;
  name: string;
  price: number;
};

const initialItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Товар ${i + 1}`,
  price: Math.floor(Math.random() * 1000),
}));

export default function ItemListScreen() {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setItems([...initialItems]);
      setRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: (items.length + i).toString(),
      name: `Новий Товар ${items.length + i + 1}`,
      price: Math.floor(Math.random() * 1000),
    }));
    setItems(prev => [...prev, ...newItems]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Пошук товару"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <View style={styles.sort}>
        <Text>Сортувати за ціною:</Text>
        <Switch value={sortAsc} onValueChange={() => setSortAsc(!sortAsc)} />
      </View>

      {filteredItems.length === 0 ? (
        <Text style={styles.noItems}>Немає товарів</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name} — {item.price}гривня</Text>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteBtn}>Видалити</Text>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  sort: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  deleteBtn: { color: 'red' },
  noItems: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});
