import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'

const Login = ({navigation}) => {
  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('HomeScreen')
    }, 2000);
  },[])
  return (
    <View>
      <Text>Login</Text>
      {/* <Button title="Click" onPress={()=>navigation.navigate('Home')} /> */}
    </View>
  )
}

export default Login