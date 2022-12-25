import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

function SMTouchableOpacity(props) {
    const { uri, onPress, value, touchableStyle, imageStyle, textStyle } = props

    return (
        <>
            <TouchableOpacity onPress={onPress} style={touchableStyle}>
                {uri ?
                    <Image source={{ uri: uri }} style={imageStyle} />
                    :
                    <Text style={textStyle}>{value}</Text>
                }
            </TouchableOpacity>
        </>
    )
}

export default SMTouchableOpacity