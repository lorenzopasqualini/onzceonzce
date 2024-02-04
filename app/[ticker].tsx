import { Chart } from '@/components/Chart';
import { formatCurrency } from '@/utils/formatCurrency';
import { selectStock, selectStockPrices } from '@/utils/searchStocks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { View, SafeAreaView, Pressable, FlatList, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Button, Text } from 'react-native-paper';
import { StoreContext } from './_layout';

export default function TickerScreen() {
  const { ticker } = useLocalSearchParams()
  const stock = selectStock(ticker as string)
  const stockPrices = selectStockPrices(ticker as string)
  const { width } = useWindowDimensions()
  const options = ['Description', 'History Metrics']
  const [selectedOption, setSelectedOption] = useState(options[0])
  const positiveOverallPriceChange = stockPrices && stockPrices[0].value < stockPrices[stockPrices.length - 1].value
  const {likedStocks, updatedLikedStocks} = useContext(StoreContext)

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', paddingVertical: 25, justifyContent: 'space-between' }}>
        <Pressable onPress={()=> router.back()}>
          <MaterialCommunityIcons name='chevron-left' color={'white'} size={40} />
        </Pressable>

        <Pressable>
          <MaterialCommunityIcons
            onPress={()=>{
              if(likedStocks.includes(ticker as string)) return updatedLikedStocks(ticker as string, 'del')
              updatedLikedStocks(ticker as string, 'add')
            }}
            name={likedStocks.includes(ticker as string) ? 'star' : 'star-outline'}
            color={'white'}
            size={40}
          />
        </Pressable>
      </View>

      {stock ?
        <FlatList
          data={[1]}
          renderItem={()=>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={stock.image} contentFit='contain' style={{ width: 50, height: 50 }} />
                <View style={{ paddingLeft: 20 }}>
                  <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>{stock.ticker}</Text>
                  <Text variant='labelMedium'>{stock.companyName}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 20 }}>
                <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>{formatCurrency(stock.price)}{" "}</Text>
                <Text variant='labelLarge' style={{ color: stock.priceChange < 0 ? 'crimson' : stock.priceChange > 0 ? '#00796b' : 'auto' }}>
                  {formatCurrency(stock.priceChange)}{" "} · {stock.priceChangePercentage.toFixed(2)}%
                </Text>
              </View>

              <View style={{ paddingTop: 20 }}>
                <LineChart
                  areaChart
                  data={stockPrices}
                  rotateLabel
                  labelsExtraHeight={20}
                  hideDataPoints
                  spacing={width / stockPrices.length - 2}
                  color={positiveOverallPriceChange ? "green" : "red"}
                  thickness={2}
                  startFillColor={positiveOverallPriceChange ? "green" : "red"}
                  endFillColor={positiveOverallPriceChange ? "green" : "red"}
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  hideYAxisText={true}
                  rulesType="solid"
                  rulesColor="black"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripHeight: 140,
                    pointerStripColor: "lightgray",
                    pointerStripWidth: 2,
                    pointerColor: "lightgray",
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 90,
                            width: 100,
                            justifyContent: "center",
                            marginTop: -30,
                            marginLeft: -40,
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              marginBottom: 6,
                              textAlign: "center",
                            }}
                          >
                            {items[0].date}
                          </Text>

                          <View
                            style={{
                              paddingHorizontal: 14,
                              paddingVertical: 6,
                              borderRadius: 16,
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {"$" + items[0].value.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
              </View>

              <FlatList
                data={options}
                keyExtractor={(item)=> item}
                renderItem={({item})=>
                  <Button onPress={()=> setSelectedOption(item)} mode={item === selectedOption ? 'contained' : 'outlined'} style={{ marginRight: 10, }}>{item}</Button>
                }
                horizontal
                style={{ marginTop: 80 }}
              />

              {selectedOption === 'History Metrics' ?
                <View style={{ marginTop: 20 }}>
                  <Chart data={stock.returnOnEquity} label='ROE' color='#00796b' />
                  <Chart data={stock.returnOnCapitalEmployed} label='ROCE' color='#00796b' />
                  <Chart data={stock.revenue} label='Revenue' color='#4a635e' />
                  <Chart data={stock.earnings} label='Earnings' color='#4a635e' />
                  <Chart data={stock.freeCashFlow} label='FCF' color='#446179' />
                  <Chart data={stock.cash} label='Cash' color='#446179' />
                  <Chart data={stock.grossProfitMargin} label='Gross Profit Margin' color='green' />
                  <Chart data={stock.netProfitMargin} label='Net Profit Margin' color='lightgreen' />
                  <Chart data={stock.debt} label='Debt' color='crimson' />
                </View>
                :
                <View style={{ marginTop: 20 }}>
                  <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>CEO</Text>
                  <Text>{stock.ceo}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>Exchange</Text>
                  <Text>{stock.exchange}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>Sector</Text>
                  <Text>{stock.sector}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>Industry</Text>
                  <Text>{stock.industry}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>Location</Text>
                  <Text>{stock.city} · {stock.state}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>IPO</Text>
                  <Text>{stock.ipoDate}</Text>

                  <Text variant='titleMedium' style={{ fontWeight: 'bold', marginTop: 5 }}>Description</Text>
                  <Text>{stock.description}</Text>
                </View>
              }

            </View>
          }
        /> :
        <Text>Stock not available</Text>
      }
    </SafeAreaView>
  );
}
