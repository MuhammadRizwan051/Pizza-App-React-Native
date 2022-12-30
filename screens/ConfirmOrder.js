import { View, Text } from 'react-native'
import React from 'react'
import style from '../styling'

const ConfirmOrder = () => {
  return (
    <>
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[style.colorDark, {fontSize:22}]}>Congratulations!</Text>
        <Text>Your order has been placed</Text>
        <Text>Order Tracking number: </Text>
      </View>
    </>
  )
}

export default ConfirmOrder