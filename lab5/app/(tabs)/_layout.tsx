import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Список товаров' }} />
      <Tabs.Screen name="location" options={{ title: 'Геолокация' }} />
      <Tabs.Screen name="input" options={{ title: 'Ввод данных' }} />
    </Tabs>
  );
}
