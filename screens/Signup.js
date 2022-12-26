import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SMTextInput from '../component/SMTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database'


function SignUp({ navigation }) {
  let initialData = {
    email: '',
    password: '',
    category: 'admin'
  }
  const [model, setModel] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false)


  let signupuser = () => {
    setIsLoading(true)
    auth().createUserWithEmailAndPassword(model.email, model.password, model.category)
      .then(res => {
        setIsLoading(false)
        setModel(initialData)
        console.log(res)
        const storeData = async () => {
          try {
              const jsonValue = JSON.stringify(res)
              await AsyncStorage.setItem('SignupUser', jsonValue)
              console.log('Data stored', jsonValue)
          } catch (e) {
              // saving error
              console.log('Data not stored')
          }
      }

      storeData()
      })
      .catch(err => {
        setModel(initialData)
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <View style={{ height: '100%', backgroundColor: '#A4BE7B', alignItems: 'center', paddingTop: '30%' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 26 }}>SIGNUP</Text>
        <Icon name='person' size={80} color='black' />
        <View style={{ width: '100%', paddingTop: 25, paddingHorizontal: 20 }}>
          <SMTextInput value={model.email} placeholder="Email" labelColor='grey' placeholderTextColor='black' onChangeText={e => setModel({ ...model, email: e })} />
        </View>
        <View style={{ width: '100%', paddingTop: 25, paddingHorizontal: 20 }}>
          <SMTextInput value={model.password} secureTextEntry={true} placeholder="Password" labelColor='grey' placeholderTextColor='black' onChangeText={e => setModel({ ...model, password: e })} />
        </View>

        <View style={{ width: '100%', paddingTop: 50, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={signupuser} style={{ backgroundColor: '#2B3A55', paddingVertical: 10, borderRadius: 15 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>{isLoading ? <ActivityIndicator size='large' color="white" /> : 'SIGNUP'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16 }}>
            Already a user? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#2B3A55' }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default SignUp;