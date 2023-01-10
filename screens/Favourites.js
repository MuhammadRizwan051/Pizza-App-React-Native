import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import style from '../styling'

const Favourites = () => {

  return (
    <>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Favourites</Text>
      </View>
      <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name='favorite-border' size={80} color='#DC3535' />
        <Text style={{ fontSize: 25, color: '#DC3535' }}>No item added to favourite</Text>
      </View>
    </>
  )
}

export default Favourites