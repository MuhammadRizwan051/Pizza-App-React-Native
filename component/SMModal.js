import React from 'react'
import { Modal, Text, View } from 'react-native'

export default function SMModal(props) {
    let { close, open, message, heading } = props

    let reqestClose = () => {
        close(false)
    }
    return (
        <>
            <Modal style={{ backgroundColor: "rgba(0,0,0,.2)", alignItems: "center", justifyContent: "center", padding: 20 }} onRequestClose={reqestClose} visible={open}>
                <View style={{ backgroundColor: '#ffffff', width: '100%', height: '40%' }}>
                    <Text style={{ color: '#000000' }}>{heading}</Text>
                    <Text style={{ color: '#000000' }}>{message}</Text>
                </View>
            </Modal>
        </>
    )
}