import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import style from '../styling'
import database from '@react-native-firebase/database'


const SingleOrder = ({ navigation, route }) => {
    let obj = route.params
    let [list, setList] = useState(obj)

    // console.log('obj', obj)
    // console.log('list', list)

    return (
        <>
            <View>
                {/* <View style={[style.bgDark, { paddingVertical: 10 }]}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Orders</Text>
                </View> */}
                {/* <ScrollView> */}
                {/* <View style={{ flexWrap: 'wrap', paddingHorizontal: 10, marginBottom: 80 }} > */}
                {list && list.map((e, i) => (
                    <View style={{ width: '100%', paddingHorizontal: 5, marginTop: 20 }} key={i}>
                        <View style={{ flexDirection: 'row', borderRadius: 10, borderWidth: 2, borderColor: '#DC3535', backgroundColor: 'white' }}>
                            <View style={{ alignItems: 'center', width: '25%' }}>
                                <Image resizeMode='stretch' style={{ height: 75, width: '100%', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }} source={{ uri: e.src }} />
                            </View>
                            <View style={{ paddingVertical: 10, width: '75%', justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 22, color: 'black' }}>{e.name}</Text>
                                <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 16, color: 'grey' }}>Rs {e.price}</Text>
                            </View>
                        </View>
                    </View>
                ))
                }
                {/* </View> */}
                {/* </ScrollView> */}
                {/* :
                <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 32 }}>No Orders yet</Text>
                </View> */}
            </View>
        </>
    )
}

export default SingleOrder