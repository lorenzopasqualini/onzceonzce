import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function TickerScreen() {
  const { ticker } = useLocalSearchParams()
  return (
    <View>
      <Text>{ticker}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
