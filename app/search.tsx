import { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StoreContext } from './_layout';
import { Text } from 'react-native-paper';
import { Card } from '@/components/Card';

export default function SearchScreen() {
    const {searchQuery, searchedStocks} = useContext(StoreContext)

    if(!searchQuery && searchedStocks.length === 0){
        return (
            <View style={styles.container}>
                <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>Search Stocks</Text>
            </View>
        );
    }

    if(searchQuery && searchedStocks.length === 0){
        return (
            <View style={styles.container}>
                <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>No stocks found</Text>
            </View>
        );
    }

    return <FlatList
        data={searchedStocks}
        keyExtractor={(item)=> item.ticker}
        renderItem={({item})=> <Card {...item} />}
    />
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
