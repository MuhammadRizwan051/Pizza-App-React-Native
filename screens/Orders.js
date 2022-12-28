import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import database from '@react-native-firebase/database'


const Orders = () => {
  let [list, setList] = useState([])
  let [dataLoader, setDataLoader] = useState(false)

  let getData = () => {
    setDataLoader(true)
    database().ref('addToCart').on('value', dt => {
      setDataLoader(false)
      if (dt.exists()) {
        // setDataLoader(false)
        let li = Object.values(dt.val())
        setList([...li])
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <View>
        <View style={[style.bgDark, { paddingVertical: 10 }]}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Orders</Text>
        </View>
        {dataLoader ? <View style={{ height: '100%', justifyContent: 'center' }}>
          <ActivityIndicator size={60} color='red' />
        </View>
          :
          <ScrollView>
            <View style={{ flexWrap: 'wrap', paddingHorizontal: 10 }} >
              {list.length > 0 ? list.map((e, i) => (
                <View style={{ width: '100%', paddingHorizontal: 10, marginTop: 20 }} key={i}>
                  <View style={{ flexDirection: 'row', borderRadius: 10, borderWidth: 2, borderColor: '#DC3535', backgroundColor: 'white' }}>
                    <View style={{ alignItems: 'center', width: '25%', paddingVertical: 5 }}>
                      <Image resizeMode='stretch' style={{ height: 75, width: '85%', borderRadius: 10, }} source={{ uri: 'https://pizzamax.com.pk/_next/image?url=https%3A%2F%2Fem-cdn.eatmubarak.pk%2F55083%2Fdish_image%2F1658491791.jpg&w=1920&q=100' }} />
                    </View>
                    <View style={{ paddingVertical: 10, width: '75%', justifyContent:'center' }}>
                      <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 22, color: 'black' }}>{e.name}</Text>
                      <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 16, color: 'grey' }}>{e.price}/- PKR</Text>
                    </View>
                  </View>
                </View>
              ))
                : (
                  <View>
                    <Text>No Data</Text>
                  </View>
                )
              }
            </View>
          </ScrollView>
        }
      </View>
    </>
  )
}

export default Orders