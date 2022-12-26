import { View, Text } from 'react-native'
import React from 'react'

const ItemDetails = ({navigation, route}) => {
    let obj = route.params
  return (
    <View>
      <Text>ItemDetails</Text>
    </View>
  )
}

export default ItemDetails