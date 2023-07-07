import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'

const CustomBtnCategory = ({ onPress, text, type, selected }) => {

    const styles = StyleSheet.create({
        btn: {
            flex: 1, // Allow the button to take up available width
            backgroundColor: 'rgba(247, 250, 248, 1)',
            marginLeft: 0,
            marginRight: 10,
            alignItems: 'center',
            borderColor: 'rgba(247, 250, 248, 1)',
            borderRadius: 8,
            borderWidth: 1,
        },

        btn_PRIMARY: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
            width: Dimensions.get('window').width * 0.2,
        },

        btn_SECONDARY: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
            width: Dimensions.get('window').width * 0.25,
        },

        btn_TERTIARY: {
            backgroundColor: 'rgba(247, 250, 248, 1)',
            width: Dimensions.get('window').width * 0.3,
        },

        btn_CLICK: {
            backgroundColor: '#fce1e1',
        },

        btnText: {
            flexWrap: 'wrap',
            margin: 10,
            color: '#f54e42',
            fontSize:12,
        },

    })

    // Dynamically access the style based on the type prop
    const btnStyle = [styles.btn];
    const btnTextStyle = [styles.btnText];
    if (type === 'PRIMARY') {
        btnStyle.push(styles.btn_PRIMARY);
    } else if (type === 'SECOND') {
        btnStyle.push(styles.btn_SECONDARY);
        btnTextStyle.push(styles.btnText);
    } else if (type === 'TERTIARY') {
        btnStyle.push(styles.btn_TERTIARY);
        btnTextStyle.push(styles.btnText);
    } 
    
    // Check if the button is selected and apply the appropriate style
    if (selected) {
        btnStyle.push(styles.btn_CLICK); // Or any other style to indicate it's selected
        btnTextStyle.push(styles.btnText);
    }
    
    return (
        <Pressable onPress={onPress} style={btnStyle}>
            <Text style={btnTextStyle}>{text}</Text>
        </Pressable>
    );
}

export default CustomBtnCategory