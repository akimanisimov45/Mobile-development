import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

const ITEMS = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

export default function ScrollExampleScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: 300 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {ITEMS.map((item) => (
          <View key={item} style={styles.item}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  item: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
  },
});
