import { View, Text, StyleSheet, Image, Dimensions, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Cart from '../../../assets/images/cart.png';
import SearchBar from '../../component/CustomSearchEngine/CustomSE';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('API Response:', data);
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            setSearchResults(data.products);
            console.log('data set!!');
          } else {
            setSearchResults([]);
            console.log('data unset!!');
          }
        })
        .catch((error) => {
          console.error('Error occurred during search:', error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.listItemThumbnail} />
      <Text style={styles.listItemTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.TopContainer}>
        <Image source={Cart} style={styles.logo} />
        <SearchBar onSearch={handleSearch} />
      </View>

      <View style={styles.flatListContainer}>
        {searchResults.length > 0 || searchQuery.length > 0 ? (
          {/* <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          /> */
          
          }
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '15%',
    marginLeft: '35%',
  },

  logo: {
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    resizeMode: 'contain',
    marginLeft: '-85%',
  },

  flatListContainer: {
    flex: 1,
    width: '90%',
  },

  listItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '6%',
    paddingBottom: '2%',
    paddingTop: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemThumbnail: {
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    resizeMode: 'contain',
  },
  listItemTitle: {
    marginLeft: 10,
    fontSize: 12,
  },
});

export default HomeScreen;
