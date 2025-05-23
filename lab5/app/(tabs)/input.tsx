import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function UserInputScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const toggleAirplaneMode = (val: boolean) => {
    setAirplaneMode(val);
    if (val) setWifi(false);
  };

  return (
    <View style={styles.container}>

      <Text>Имя пользователя:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Введіть ім'я"
      />
      <Text>Текущий ввод: {username}</Text>

      <Text>Пароль:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="ВВведіть пароль"
        secureTextEntry
      />

      <View style={styles.switchRow}>
        <Text>Режим літака</Text>
        <Switch value={airplaneMode} onValueChange={toggleAirplaneMode} />
      </View>

      <View style={styles.switchRow}>
        <Text>Wi-Fi</Text>
        <Switch
          value={wifi}
          onValueChange={setWifi}
          disabled={airplaneMode}
        />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button title="Обрати дату" onPress={() => setShowDatePicker(true)} />
        {selectedDate && (
          <Text style={{ marginTop: 10 }}>
            Обрана дата: {selectedDate.toLocaleDateString()}
          </Text>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date(2100, 12, 31)}
          minimumDate={new Date(2000, 0, 1)}
        />
      )}

      <Button
        title="Відправити"
        onPress={() => Alert.alert('Дані користувача', `Им'я: ${username}\n Пароль: ${password}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',

    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
