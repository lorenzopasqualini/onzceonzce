import { router } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Pressable onPress={()=> router.push("/AAPL")}>
        <Text>Press Me</Text>
      </Pressable>
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
