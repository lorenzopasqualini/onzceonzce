import { Card } from '@/components/Card';
import { stocks } from '@/data';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
        <Text variant="titleLarge" style={{ fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}>Available Stocks</Text>
        <FlatList
          keyExtractor={(item)=> item.ticker}
          data={stocks}
          renderItem={({ item }) =>
            <Card
              ticker={item.ticker}
              companyName={item.companyName}
              price={item.price}
              priceChange={item.priceChange}
              priceChangePercentage={item.priceChangePercentage}
              image={item.image}
            />
          }
        />
    </View>
  );
}
