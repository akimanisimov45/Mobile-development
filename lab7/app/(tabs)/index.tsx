import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Lab7Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('./app/(tabs)/TouchFeedbackScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Touch Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./app/(tabs)/ScrollExampleScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Scroll Example</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./app/(tabs)/SwipeListScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Swipe List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', padding: 16 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginVertical: 8 },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});