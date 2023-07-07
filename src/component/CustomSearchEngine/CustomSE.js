import { View, TextInput, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'

const CustomSE = ({ onSearch }) => {

    // const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        onSearch(text); // Pass the search text to the parent component
    };
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#e8e8e8',
            padding: 10,
            borderRadius: 8,
            margin: 16,
            width: Dimensions.get('window').width * 0.53, // Adjust the logo size as needed
        },
        searchInput: {
            fontSize: 15,
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                // value={searchText}
                onChangeText={handleSearch}
                clearButtonMode="always"
            />
        </View>
    )

}

export default CustomSE