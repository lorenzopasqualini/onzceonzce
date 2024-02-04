import { useContext } from 'react';
import { View, StyleSheet, FlatList, Animated, Pressable } from 'react-native';
import { StoreContext } from '../_layout';
import { Text } from 'react-native-paper';
import { stocks } from '@/data';
import { Card } from '@/components/Card';
import { Swipeable } from 'react-native-gesture-handler';

function RightActions({progress, dragX, onPress}:{progress: Animated.AnimatedInterpolation<string | number>, dragX: Animated.AnimatedInterpolation<string | number>, onPress: ()=> void}){
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0]
  })

  return <Pressable onPress={onPress} style={{ width: 90, backgroundColor: 'crimson', justifyContent: 'center', alignItems: 'center' }}>
    <Animated.Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white', transform: [{ scale }] }}>Delete</Animated.Text>
  </Pressable>
}

export default function WatchlistScreen() {
  const { likedStocks, updatedLikedStocks } = useContext(StoreContext)
  if(likedStocks.length > 0) return(
    <View style={styles.container}>
      <FlatList
        data={stocks.filter((i)=> likedStocks.includes(i.ticker))}
        keyExtractor={(item)=> item.ticker}
        renderItem={({item})=>
          <Swipeable renderRightActions={(progress, dragX) =>
            <RightActions progress={progress} dragX={dragX} onPress={()=> updatedLikedStocks(item.ticker, 'del')} />
          }>
            <Card {...item} />
          </Swipeable>
        }
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>No stocks on watchlist yet</Text>
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
