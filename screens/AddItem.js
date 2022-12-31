import { View, Text, StyleSheet, ToastAndroid, ActivityIndicator, TouchableOpacity, PermissionsAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import SMTextInput from '../component/SMTextInput'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import style from '../styling'
import database from '@react-native-firebase/database'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'


const AddItem = () => {
  // let [cameraPhoto, setCameraPhoto] = useState(require('../config/assets/PizzaDummyImage.png'))
  let [cameraPhoto, setCameraPhoto] = useState('https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000');
  let [galleryPhoto, setGalleryPhoto] = useState()

  let options = {
    saveToPhotos: true,
    mediaType: 'photo'
  }

  let opencamera = async () => {
    await launchCamera(options, (res) => {
      setCameraPhoto(res.assets[0].uri)
      console.log(res)
    });
    // setCameraPhoto(res.assets[0].uri)
    // console.log(res)
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    // )
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   const result = await launchCamera(options, res => {
    //     console.log(res)
    //   })
    //   setCameraPhoto(result.assets[0].uri)
    // }
  }


  // let opencamera = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //   )
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     const result = await launchCamera(options)
  //     setCameraPhoto(result.assets[0].uri)
  //   }
  // }

  let openGallery = () => {
    launchImageLibrary(options, (res) => {
      setGalleryPhoto(res.assets[0].url)
      console.log(res)
    })
  }

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
          <View>
            <TouchableOpacity onPress={opencamera}>
              <Icon name='photo-camera' size={20} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery}>
              <Icon name='tab' size={20} color='black' />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: cameraPhoto }} style={{ height: 100, width: 150 }} />
          {/* <Image source={cameraPhoto} style={{ height: 100, width: 150 }} /> */}
        </View>
        <SMTouchableOpacity onPress={add} value={isLoading ? <ActivityIndicator color='white' size={30} /> : 'Add'} touchableStyle={[style.bgDark, { width: '30%', paddingVertical: 5, marginTop: 15, borderRadius: 20, paddingVertical: 8 }]} textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20, textStyle: 'italic' }]} />
      </View>
    </View >
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