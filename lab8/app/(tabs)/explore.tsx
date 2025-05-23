// explore.tsx

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const Explore = () => {
  // Стан для кожного типу модального вікна
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  // Функція для показу toast-повідомлення
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Something happened!',
    });
  };

  // Функція для показу модального вікна із завантаженням (3 секунди)
  const showLoading = () => {
    setLoadingVisible(true);
    setTimeout(() => setLoadingVisible(false), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Кнопка для підтвердження дії */}
      <Button title="Confirm Action" onPress={() => setConfirmVisible(true)} />

      {/* Кнопка для показу помилки */}
      <Button title="Show Error" onPress={() => setErrorVisible(true)} />

      {/* Кнопка для показу toast */}
      <Button title="Toast Message" onPress={showToast} />

      {/* Кнопка для показу індикатора завантаження */}
      <Button title="Fetch Data…" onPress={showLoading} />

      {/* Підтвердження дії */}
      <Modal transparent visible={confirmVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Are you sure?</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => setConfirmVisible(false)}>
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setConfirmVisible(false)}>
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Помилкове модальне вікно */}
      <Modal transparent visible={errorVisible} animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modal, styles.errorModal]}>
            <Text style={styles.errorText}>Something went wrong!</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => setErrorVisible(false)}>
                <Text style={styles.errorText}>Fix it</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setErrorVisible(false)}>
                <Text style={styles.errorText}>Ignore it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Індикатор завантаження */}
      <Modal transparent visible={loadingVisible}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        </View>
      </Modal>

      {/* Toast повідомлення */}
      <Toast />
    </View>
  );
};

export default Explore;

// Стилі
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  errorModal: {
    backgroundColor: '#ffdddd',
  },
  errorText: {
    color: '#cc0000',
  },
});
