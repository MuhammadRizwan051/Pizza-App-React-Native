import { Text, Image, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {
    let change = () => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000);
    }
    useEffect(() => {
        change()
    }, [])
    return (
        <>
            <View>
                <Image resizeMode='stretch' style={{ width: '100%', height: '100%' }} source={{ uri: 'https://d2mekbzx20fc11.cloudfront.net/uploads/Mobile_HardLanding_ThankCrustpizza3.png' }} />
            </View>
        </>
    )
}

export default Splash