import { View, Text } from 'react-native'
import React from 'react'
import style from '../styling'

const Favourites = () => {
    return (
        <>
            <View style={[style.bgDark, { paddingVertical: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Favourites</Text>
            </View>
        </>
    )
}

export default Favourites