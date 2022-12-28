import React from 'react'
import { View, Text } from 'react-native'
import style from '../styling'

const MyCart = () => {
    return (
        <>
            <View style={[style.bgDark, { paddingVertical: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>My Cart</Text>
            </View>
        </>
    )
}

export default MyCart