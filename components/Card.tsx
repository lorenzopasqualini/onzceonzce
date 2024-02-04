import { router } from 'expo-router';
import { View, Pressable, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'expo-image'
import { formatCurrency } from '@/utils/formatCurrency';

export const Card = ({
    ticker,
    image,
    companyName,
    price,
    priceChange,
    priceChangePercentage
}: {
    ticker: string;
    image: string;
    companyName: string;
    price: number;
    priceChange: number;
    priceChangePercentage: number
}) => {
    const { width } = useWindowDimensions()
    return (
        <Pressable onPress={()=> router.push(`/${ticker}`)} style={{ flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10, height: 60 }}>
        <Image source={image} style={{ width: 50, height: 50 }} contentFit='contain' />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 75, paddingLeft: 15 }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>{ticker}</Text>
            <Text variant='labelMedium'>{companyName}</Text>
          </View>
          <View>
            <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>{formatCurrency(price)}{" "}</Text>
            <Text variant='labelMedium' style={{ color: priceChange < 0 ? 'crimson' : priceChange > 0 ? '#00796b' : 'auto' }}>{formatCurrency(priceChange)}{" "} · {priceChangePercentage.toFixed(2)}%</Text>
          </View>
        </View>
      </Pressable>
    )
}
