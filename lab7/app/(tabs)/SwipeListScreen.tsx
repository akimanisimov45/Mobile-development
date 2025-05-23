import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SwipeableItem from './components/SwipeableItem';

const initialItems = Array.from({ length: 8 }, (_, i) => ({
  id: i.toString(),
  text: `Swipe Me ${i + 1}`,
}));

export default function SwipeListScreen() {
  const [items, setItems] = useState(initialItems);

  const handleSwipe = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SwipeableItem
            text={item.text}
            onSwipe={() => handleSwipe(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items left</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});
