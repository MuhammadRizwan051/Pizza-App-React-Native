import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollViewBase, ScrollView, TouchableOpacity } from 'react-native'
import style from '../styling'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'


const MyCart = () => {
    let [list, setList] = useState([])
    let getData = () => {
        database().ref('addToCart').on('value', dt => {
            if (dt.exists()) {
                let li = Object.values(dt.val())
                setList([...li])
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])

    let update = () => {
        database().ref('/users/123').update()
            .then(() => console.log('Data updated.'));
    }

    let remove = async (e) => {
        await database().ref(`addToCart/${e}`).remove();
    }


    return (
        <>
            <View style={[style.bgDark, { paddingVertical: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>My Cart</Text>
            </View>
            <ScrollView>
                {list.map((e, i) => (
                    <View key={i} style={{ borderBottomWidth: 2, borderColor: 'grey', paddingBottom: 15, marginHorizontal: 15 }} >
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', width: '85%' }}>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{e.quantity} x </Text>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{e.name}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginLeft: '9.8%', backgroundColor:'#FF5858', borderRadius:5}}>
                                <Icon name='add' size={20} color='white' />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, width: '100%' }}>
                            <TouchableOpacity onPress={() => remove(e.id)}>
                                <Text style={{ textDecorationLine: 'underline', color: 'royalblue' }}>Remove</Text>
                            </TouchableOpacity>
                            <View style={{backgroundColor:'#FF5858', borderRadius:5}}>
                                <Icon name='remove' size={20} color='white' />
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default MyCart