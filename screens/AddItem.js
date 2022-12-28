import { View, Text, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import SMTextInput from '../component/SMTextInput'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import style from '../styling'
import database from '@react-native-firebase/database'

const AddItem = () => {

  const initialData = {
    name: '',
    price: '',
    id: ''
  }

  let [isLoading, setIsLoading] = useState(false)
  let [model, setModel] = useState(initialData)

  let add = () => {
    setIsLoading(true)
    model.id = database().ref('addItem/').push().key
    database().ref(`addItem/${model.id}`).set(model)
      .then(res => {
        setIsLoading(false)
        setModel(initialData)
        ToastAndroid.show('Item created Successfully', ToastAndroid.LONG)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }
  return (
    <View>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Item</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <View style={{ width: '80%' }}>
          <SMTextInput value={model.name} placeholder='Name' style={[styles.input]} onChangeText={e => setModel({ ...model, name: e })} />
          <SMTextInput value={model.detail} placeholder='Detail' style={[styles.input]} onChangeText={e => setModel({ ...model, detail: e })} />
          <SMTextInput keyboardType='number-pad' value={model.price} placeholder='Price' style={[styles.input]} onChangeText={e => setModel({ ...model, price: e })} />
        </View>
        <SMTouchableOpacity onPress={add} value={isLoading ? <ActivityIndicator color='white' size={20} /> : 'Add'} touchableStyle={[style.bgDark, { width: '30%', paddingVertical: 5, marginTop: 15, borderRadius: 20, paddingVertical: 8 }]} textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20, textStyle:'italic' }]} />
      </View>
    </View>
  )
}

export default AddItem

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5
  }
})