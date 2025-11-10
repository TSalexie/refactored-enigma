import { View, Text, StyleSheet } from 'react-native';

export default function PagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pages</Text>
      <Text style={styles.subtitle}>Rich content workspace</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
