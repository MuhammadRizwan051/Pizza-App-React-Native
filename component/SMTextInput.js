import React from 'react'
import { TextInput } from 'react-native'

function SMTextInput(props) {
    const { value, keyboardType, placeholder, placeholderTextColor, onChangeText, editable, secureTextEntry, numberOfLines, style } = props
    return (
        <>
            <TextInput
                value={value}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                editable={editable}
                secureTextEntry={secureTextEntry}
                numberOfLines = {numberOfLines}
                style={style} />
        </>
    )
}

export default SMTextInput