import { Text, Image, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {
    let change = () => {
        setTimeout(() => {
            navigation.navigate('HomeScreen')
        }, 3000);
    }
    useEffect(() => {
        change()
    }, [])
    return (
        <>
            <View style={{ justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                <Image resizeMode='contain' style={{ borderRadius: 140, width: 250, height: 250 }} source={{ uri: 'https://media.istockphoto.com/id/686956560/vector/pizzeria-emblem-design.jpg?s=612x612&w=0&k=20&c=8gdy7eRBBB_ebiGon6rLd6ePwHswaj7cmLgg3j9enAk=' }} />
            </View>
        </>
    )
}

export default Splash