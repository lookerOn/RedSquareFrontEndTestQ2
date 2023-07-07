import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'

const CustomModBtn = ({ onPress, text, type }) => {

    const styles = StyleSheet.create({
        btn: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
            width: Dimensions.get('window').width * 0.2, // Adjust the logo size as needed
            alignItems: 'center',
            margin: 5,
            borderColor: 'rgba(247, 250, 248, 1)',
            borderRadius: 8,
            borderWidth: 1,
        },

        btn_PRIMARY: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
        },

        btn_TERTIARY: {
            backgroundColor: 'rgba(247, 250, 248, 0.5)',
            borderColor: 'rgba(247, 250, 248, 1)',
            borderRadius: 8,
            borderWidth: 1,
        },

        btnText: {
            margin: 10,
            color: '#f54e42',
        },

        btnText_TERTIARY: {
            color: '#f54e42',
            fontStyle: 'italic',
        },

        btnText_SECOND: {
            color: '#fff',
        },

    })

    // Dynamically access the style based on the type prop
    const btnStyle = [styles.btn];
    const btnTextStyle = [styles.btnText];
    if (type === 'PRIMARY') {
        btnStyle.push(styles.btn_PRIMARY);
    } else if (type === 'SECOND') {
        btnStyle.push(styles.btn_TERTIARY);
        btnTextStyle.push(styles.btnText_SECOND);
    } else if (type === 'TERTIARY') {
        btnStyle.push(styles.btn_TERTIARY);
        btnTextStyle.push(styles.btnText_TERTIARY);
    }

    return (
        <Pressable onPress={onPress} style={btnStyle}>
            <Text style={btnTextStyle}>{text}</Text>
        </Pressable>
    );
}

export default CustomModBtn