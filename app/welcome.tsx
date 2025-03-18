import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function Welcome() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ImageBackground
                source={require('../assets/images/images.jpeg')}
                style={{
                   width:250,
                   height:190

                }}
            >
            </ImageBackground>
            <Text style={{
                fontSize: 24,
                color: '#000',
                justifyContent: 'center',
                alignItems: 'center'
            }}>Loading...</Text>

        </View>

    )
}