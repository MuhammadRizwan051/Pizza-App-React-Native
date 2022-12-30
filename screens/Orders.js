import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import database from '@react-native-firebase/database'


const Orders = () => {
  let [list, setList] = useState()
  let [dataLoader, setDataLoader] = useState(false)

  let getData = () => {
    setDataLoader(true)
    database().ref('orders').on('value', dt => {
      setDataLoader(false)
      if (dt.exists()) {
        // setDataLoader(false)
        console.log('dtVal', dt.val())
        let li = Object.values(dt.val())
        setList(...li)
      }
    })
  }
  console.log('list', list)

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
          (list && list.length > 0 ?
            <ScrollView>
              <View style={{ flexWrap: 'wrap', paddingHorizontal: 10, marginBottom: 80 }} >
                {list.map((e, i) => (
                  <View style={{ width: '100%', paddingHorizontal: 5, marginTop: 20 }} key={i}>
                    <View style={{ flexDirection: 'row', borderRadius: 10, borderWidth: 2, borderColor: '#DC3535', backgroundColor: 'white' }}>
                      <View style={{ alignItems: 'center', width: '25%' }}>
                        <Image resizeMode='stretch' style={{ height: 75, width: '100%', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }} source={{ uri: 'https://www.pizzapoint.com.pk/upload/1666936269-Chicken%20Max.jpeg' }} />
                      </View>
                      <View style={{ paddingVertical: 10, width: '75%', justifyContent: 'center' }}>
                        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 22, color: 'black' }}>{e.name}</Text>
                        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 16, color: 'grey' }}>{e.price}/- PKR</Text>
                      </View>
                    </View>
                  </View>
                ))
                }
              </View>
            </ScrollView>
            :
            <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 32 }}>No Orders yet</Text>
            </View>
          )
        }
      </View>
    </>
  )
}

export default Orders