import { View, Text } from 'react-native'
import React from 'react'
import style from '../styling'

const Orders = () => {
  return (
    <>
      <View>
        <View style={[style.bgDark, { paddingVertical: 10 }]}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Orders</Text>
        </View>
      </View>
    </>
  )
}

export default Orders