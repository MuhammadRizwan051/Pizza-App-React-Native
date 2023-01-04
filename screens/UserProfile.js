import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import auth from '@react-native-firebase/auth'

const UserProfile = ({ navigation }) => {

  let [photo, setPhoto] = useState(require('../config/assets/MuhammadRizwan.jpg'))
  let [login, setLogin] = useState({})

  let getData = async () => {
    const jsonValue = await AsyncStorage.getItem('LoginKey')
    const data = jsonValue !== null ? JSON.parse(jsonValue) : null
    console.log(data)
    data && setLogin(data)
  }

  let removeAsyncData = async () => {
    try {
      const removeVal = await AsyncStorage.removeItem('LoginKey');
      console.log('LoginKey remove')
      // return true;
    }
    catch (exception) {
      console.log('LoginKey not remove')
      // return false;
    }
  }

  let logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        removeAsyncData()
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])
  console.log('login', login)

  return (
    <>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Profile</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10, paddingVertical: 10 }}>
        <View style={{ borderRadius: 50 }}>
          <Image source={photo} style={{ borderRadius: 50, height: 80, width: 80 }} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>{login.userName}</Text>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>{login.email}</Text>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>{login.contact}</Text>
        </View>
      </View>

      {/* Logout */}
      <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' }}>
        <TouchableOpacity onPress={logoutUser} style={{ borderRadius: 25, width: '30%', backgroundColor: '#DC3535', paddingVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Icon name='logout' size={20} color='white' />
          </View>
          <Text style={{ marginLeft: 10, justifyContent: 'center', fontSize: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default UserProfile