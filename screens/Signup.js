import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import SMTextInput from '../component/SMTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import style from '../styling';


function SignUp({ navigation }) {
  let initialData = {
    userName: '',
    email: '',
    password: '',
    contact: '',
    category: 'user'
  }
  const [model, setModel] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)


  let signupuser = () => {
    setIsLoading(true)
    auth().createUserWithEmailAndPassword(model.email, model.password, model.category)
      .then(res => {
        setIsLoading(false)
        model.id = res.user.uid;
        database().ref(`appUsers/${model.id}`).set(model)

        setModel(initialData)
        navigation.navigate('Login')
        console.log('res', res)
      })
      .catch(err => {
        setModel(initialData)
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <View style={[style.bgDark, { height: '100%' }]}>
        <ScrollView>
          <View style={{ borderWidth: 10, borderRadius: 40, backgroundColor: 'white', borderColor: '#DC3535', alignItems: 'center', marginVertical: '30%', paddingVertical: 30 }}>
            <Text style={{ color: '#DC3535', fontWeight: 'bold', fontSize: 26 }}>SIGNUP</Text>
            <Icon name='person' size={90} color='#DC3535' />

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='person' size={20} color='white' />
              </View>
              <SMTextInput value={model.userName} style={[styles.input]} placeholder="User Name" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, userName: e })} />
            </View>

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='email' size={20} color='white' />
              </View>
              <SMTextInput value={model.email} style={[styles.input]} placeholder="Email" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, email: e })} />
            </View>

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='lock' size={20} color='white' />
              </View>
              <SMTextInput value={model.password} secureTextEntry={true} style={[styles.input]} placeholder="Password" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, password: e })} />
            </View>

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='phone-android' size={20} color='white' />
              </View>
              <SMTextInput value={model.contact} keyboardType='number-pad' style={[styles.input]} placeholder="Contact" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, contact: e })} />
            </View>

            <View style={{ width: '40%', marginTop: 40, justifyContent: 'center' }}>
              <TouchableOpacity onPress={signupuser} style={[style.bgDark, { paddingVertical: 8, borderRadius: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>{isLoading ? <ActivityIndicator size={25} color="white" /> : 'SIGNUP'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Already a user? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text style={[style.colorDark, { textAlign: 'center', fontWeight: 'bold' }]}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
export default SignUp;


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#DC3535',
    paddingBottom: 0,
    marginTop: 15
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: '#DC3535',
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    paddingHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 8
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    fontSize: 16
  }
})