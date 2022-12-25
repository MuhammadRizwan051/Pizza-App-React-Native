import { View, Text } from 'react-native'
import React from 'react'
import SMTextInput from '../component/SMTextInput'

const AddItem = () => {
  return (
    <View>
      <Text>AddItem</Text>
      <SMTextInput placeholder='Name' />
      <SMTextInput placeholder='Price' />
    </View>
  )
}

export default AddItem