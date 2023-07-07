import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry}) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
            marginTop : 10,
            width: Dimensions.get('window').width * 0.8, // Adjust the logo size as needed
            borderColor: 'rgba(247, 250, 248, 1)',
            borderRadius:5,
            borderWidth:1,
        },
        input: {
            margin:10,
        },    
    })


    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder} 
                style={styles.input}
                value= {value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default CustomInput