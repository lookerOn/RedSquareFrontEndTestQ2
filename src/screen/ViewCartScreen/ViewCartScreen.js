import { View, Text, StyleSheet, Image, Dimensions, FlatList, TextInput, TouchableOpacity, ScrollView, Modal, PanResponder } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Cart from '../../../assets/images/cart.png';
import Prev from '../../../assets/images/prev.png';
import Next from '../../../assets/images/next.png';
import Filter from '../../../assets/images/filter.png';
import SearchBar from '../../component/CustomSearchEngine/CustomSE';
import { Rating } from 'react-native-ratings';
import CustomBtnCategory from '../../component/CustomBtn/CustomBtnCategory';
import CustomModBtn2 from '../../component/CustomBtn/CustomModBtn2';
import CustomModBtn from '../../component/CustomBtn/CustomModBtn';
import BackArw from '../../../assets/images/home.png';
import Plus from '../../../assets/images/plus.png';
import Minus from '../../../assets/images/minus.png';

const ViewCartScreen = () => {

    const ITEMS_PER_PAGE = 10;

    const navigation = useNavigation(); // Access the navigation object

    const BackPressed = async () => {
        navigation.navigate('AllProductScreen');
    }

    //Search Engine function
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    // Step 1: Create state variables for selected sorting option and order value
    const [sortingOption, setSortingOption] = useState(''); // 'PRICE', 'NAME', 'RATING'
    const [orderValue, setOrderValue] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const handleSearch = (text) => {
        setSearchQuery(text);
        setIsSearching(!!text); // Set to true if there is a search query, false otherwise
    };

    const CTSEARCH = async (CTsearchQuery) => {
        navigation.navigate('CategorySearchScreen', { ctgysearchQuery: CTsearchQuery });
    };

    const filterPressed = async () => {
        setModalVisible(true);
    };

    const onCloseModal = () => {
        setModalVisible(false);
    };

    const handleSort = (option) => {
        setSortingOption(option);
        // Update the selectedButton state to the type of the button pressed
        setSelectedButton(option);
    };

    // Step 3: Function to handle sorting based on the selected sorting option and order
    const handleSortData = () => {
        if (sortingOption === 'PRICE') {
            if (orderValue == 0) {
                // Sort by price ascending
                const sortedData = [...searchResults].sort((a, b) => a.price - b.price);
                setSearchResults(sortedData);
            } else if (orderValue == 1) {
                // Sort by price descending
                const sortedData = [...searchResults].sort((a, b) => b.price - a.price);
                setSearchResults(sortedData);
            }
        } else if (sortingOption === 'NAME') {
            if (orderValue == 0) {
                // Sort by name in ascending
                const sortedData = [...searchResults].sort((a, b) => a.title.localeCompare(b.title));
                setSearchResults(sortedData);
            } else if (orderValue == 1) {
                // Sort by price descending
                const sortedData = [...searchResults].sort((a, b) => b.title.localeCompare(a.title));
                setSearchResults(sortedData);
            }

        } else if (sortingOption === 'RATING') {
            if (orderValue == 0) {
                // Sort by rating (assuming the rating is a numerical value in the data) in ascending
                const sortedData = [...searchResults].sort((a, b) => a.rating - b.rating);
                setSearchResults(sortedData);
            } else if (orderValue == 1) {
                // Sort by price descending
                const sortedData = [...searchResults].sort((a, b) => b.rating - a.rating);
                setSearchResults(sortedData);
            }
        }
    };

    // Step 4: Function to handle the 'OK' button click in the modal
    const handleOkButtonClick = () => {
        // Apply the sorting based on the selected option and order value
        handleSortData();

        // Close the modal
        onCloseModal();
    };



    useEffect(() => {
        // Fetch all products when the component mounts or when isSearching is false
        const apiUrl = isSearching ? `https://dummyjson.com/products/search?q=${searchQuery}` : 'https://dummyjson.com/carts/8';
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log('API Response:', data);
                if (data && Array.isArray(data.products) && data.products.length > 0) {
                    setSearchResults(data.products);
                    setTotalQuantity(data.totalQuantity); // Set the totalQuantity from the API response
                    setTotal(data.total); // Set the total from the API response
                    console.log('data set!!');
                } else {
                    setSearchResults([]);
                    setTotalQuantity(0); // Set the totalQuantity from the API response
                    setTotal(0); // Set the total from the API response
                    console.log('data unset!!');
                }
            })
            .catch((error) => {
                console.error('Error occurred during search:', error);
                setSearchResults([]);
                setTotalQuantity(0); // Set the totalQuantity from the API response
                setTotal(0);
            });
    }, [searchQuery, isSearching]);

    // Calculate the start and end index based on the current page and items per page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Get the data to be rendered on the current page
    const currentPageData = searchResults.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(searchResults.length / ITEMS_PER_PAGE)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const PlusPressed = async () => {
        // 
    };

    const MinusPressed = async () => {
        // 
    }

    const renderItem = ({ item }) => (
        

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'flex-start',
                paddingLeft: '6%',
                paddingBottom: '2%',
                paddingTop: '2%',
                borderBottomWidth: 0.5,
                backgroundColor: '#fff',
                borderBottomColor: '#b3b3b3',
            }}>

                <View style={{
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    paddingTop: '0%',
                    // backgroundColor:'black'
                }}>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 12,
                        fontWeight: 'bold',
                        width: Dimensions.get('window').width * 0.3,
                    }} numberOfLines={1}
                        ellipsizeMode="tail">{item.title}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 10, // Adjust the font size of "RM"
                                color: 'grey',
                                fontWeight: 'bold',
                            }}
                        >Discounted Price:   </Text>

                        <Text
                            style={{
                                fontSize: 10, // Font size for the price
                                color: 'grey',
                                fontWeight: 'bold',
                            }}
                        >{item.discountedPrice}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10 }}>
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 10, // Adjust the font size of "RM"
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >RM   </Text>

                        <Text
                            style={{
                                fontSize: 18, // Font size for the price
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >{item.price}</Text>

                    </View>

                    <Rating
                        type='heart'
                        ratingCount={5}
                        showRating={false}
                        readonly
                        showReadOnlyText={false}
                        fractions={2}
                        jumpValue={0.01}
                        startingValue={item.rating}
                        imageSize={12}
                        ratingBackgroundColor="transparent" // Set the background color to transparent
                        style={{ backgroundColor: 'transparent', marginLeft: 10, marginTop: 10, marginBottom: 10 }} // Additional style to ensure background color is transparent
                    />

                </View>

                <View style={{
                    // backgroundColor:'black',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'flex-end',
                    marginRight: -30,
                }}>

                    <TouchableOpacity
                        style={{
                            // backgroundColor:'black',
                            borderColor: 'rgba(191, 104, 98, 0.2)',
                            borderRadius: 15,
                            borderWidth: 0,
                            marginLeft: 0,
                            width: '18%',
                            aspectRatio: 1,
                            alignItems: 'center',
                        }}
                        onPress={MinusPressed}>
                        <Image
                            source={Minus}
                            style={{
                                width: '70%',
                                height: '70%',
                                margin: 5,
                                resizeMode: 'contain',
                            }}
                        />

                    </TouchableOpacity>

                    <Text style={{ margin: 10 }}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={{
                            // backgroundColor:'black',
                            borderColor: 'rgba(191, 104, 98, 0.2)',
                            borderRadius: 15,
                            borderWidth: 0,
                            marginLeft: 0,
                            width: '18%',
                            aspectRatio: 1,
                            alignItems: 'center',
                        }}
                        onPress={PlusPressed}>
                        <Image
                            source={Plus}
                            style={{
                                width: '70%',
                                height: '70%',
                                margin: 5,
                                resizeMode: 'contain',
                            }}
                        />

                    </TouchableOpacity>

                </View>
            </View>
    
    );

    return (
        <View style={{ backgroundColor: 'white', height: '100%', }}>

            <View style={{
                justifyContent: 'center',
                flexDirection: 'column',
                height: '97%',
                backgroundColor: 'white',
                marginTop: Dimensions.get('window').width * 0.10,
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Dimensions.get('window').width * 0.05, }}>
                    <TouchableOpacity
                        style={{
                            width: Dimensions.get('window').width * 0.15,
                            height: Dimensions.get('window').width * 0.15,
                        }}
                        onPress={BackPressed}
                    >
                        <View style={{ flex: 1 }}>
                            <Image
                                source={BackArw}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    resizeMode: 'contain',
                                    marginTop: 4.5,
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                    <SearchBar onSearch={handleSearch} />

                    <TouchableOpacity
                        style={{
                            marginLeft: 7,
                            width: Dimensions.get('window').width * 0.10,
                            height: Dimensions.get('window').width * 0.10,

                        }}
                        onPress={filterPressed}
                    >
                        <View style={{ flex: 1 }}>
                            <Image
                                source={Filter}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    resizeMode: 'contain',
                                    marginTop: 5,
                                    marginLeft: 4,
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

            
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginTop: 10,
                }}>

                    <ScrollView
                        horizontal={true} // Set horizontal to true for horizontal scrolling
                        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
                        contentContainerStyle={{
                            // backgroundColor:'black',
                            flexDirection: 'row',
                            paddingLeft: 10,
                        }}
                    >
                        <CustomBtnCategory onPress={() => CTSEARCH("smartphones")} text="Smartphones" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("laptops")} text="Laptops" type="PRIMARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("fragrances")} text="Fragrances" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("skincare")} text="Skincare" type="PRIMARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("groceries")} text="Groceries" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("home-decoration")} text="Home-decoration" type="TERTIARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("furniture")} text="Furniture" type="PRIMARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("tops")} text="Tops" type="PRIMARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("womens-dresses")} text="Womens-dresses" type="TERTIARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("womens-shoes")} text="Womens-shoes" type="TERTIARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("mens-shirts")} text="Mens-shirts" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("mens-shoes")} text="Mens-shoes" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("mens-watches")} text="Mens-watches" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("womens-watches")} text="Womens-watches" type="TERTIARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("womens-bags")} text="Womens-bags" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("womens-jewellery")} text="Womens-jewellery" type="TERTIARY" />
                        <CustomBtnCategory onPress={() => CTSEARCH("sunglasses")} text="Sunglasses" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("automotive")} text="Automotive" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("motorcycle")} text="Motorcycle" type="SECOND" />
                        <CustomBtnCategory onPress={() => CTSEARCH("lighting")} text="Lighting" type="PRIMARY" />
                    </ScrollView>

                </View>


                <View style={{ flexDirection: "row", justifyContent: 'flex-start', paddingLeft: 30, paddingBottom: 10, paddingTop: 10, borderBottomColor: 'rgba(255, 212, 212,0.96)', borderTopColor: 'rgba(255, 212, 212,0.96)', borderBottomWidth: 1, borderTopWidth: 1 }}>
                    <View style={{ flexDirection: "row", padding: 15 }}>
                        <Text style={{fontWeight:'bold'}}>TOTAL QUANTITY : </Text>
                        <Text style={{fontWeight:'bold'}} >{totalQuantity}</Text>
                    </View>
                    <View style={{ flexDirection: "row", padding:15 }}>
                        <Text style={{fontWeight:'bold'}} >TOTAL AMOUNT : </Text>
                        <Text style={{fontWeight:'bold'}}>{total}</Text>
                    </View>
                </View>


                <FlatList
                    data={currentPageData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: Dimensions.get('window').width * 0.2,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        width: Dimensions.get('window').width * 0.2,
                        height: Dimensions.get('window').width * 0.07,
                        resizeMode: 'contain',
                        marginTop: -20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                opacity: 0.6,
                            }}
                            onPress={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <Image
                                source={Prev}
                                style={{
                                    width: Dimensions.get('window').width * 0.07,
                                    height: Dimensions.get('window').width * 0.07,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />
                        </TouchableOpacity>

                        <Text>{currentPage}</Text>

                        <TouchableOpacity
                            style={{
                                padding: 10,
                                opacity: 0.6,
                            }}
                            onPress={handleNextPage}
                            disabled={currentPage >= Math.ceil(searchResults.length / ITEMS_PER_PAGE)}
                        >
                            <Image
                                source={Next}
                                style={{
                                    width: Dimensions.get('window').width * 0.07,
                                    height: Dimensions.get('window').width * 0.07,
                                    resizeMode: 'contain',
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <Modal
                style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onCloseModal}
            >

                <View
                    style={{
                        width: Dimensions.get('window').width * 0.8,
                        height: Dimensions.get('window').height * 0.28,
                        backgroundColor: 'rgba(255, 212, 212,0.96)',
                        marginTop: Dimensions.get('window').height * 0.6,
                        marginLeft: Dimensions.get('window').width * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        elevation: 30,
                    }}>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: 'white',

                    }}>SORTING</Text>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>

                        <CustomModBtn
                            style={{
                                width: Dimensions.get('window').width * 0.2,
                                resizeMode: 'contain',
                            }} text="PRICE"
                            onPress={() => handleSort('PRICE')}
                            type={selectedButton === 'PRICE' ? 'PRIMARY' : 'TERTIARY'}
                        />

                        <CustomModBtn
                            style={{
                                width: Dimensions.get('window').width * 0.2,
                                resizeMode: 'contain',
                            }} text="NAME"
                            onPress={() => handleSort('NAME')}
                            type={selectedButton === 'NAME' ? 'PRIMARY' : 'TERTIARY'}
                        />

                        <CustomModBtn
                            style={{
                                width: Dimensions.get('window').width * 0.2,
                                resizeMode: 'contain',
                            }} text="RATING"
                            onPress={() => handleSort('RATING')}
                            type={selectedButton === 'RATING' ? 'PRIMARY' : 'TERTIARY'}
                        />

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: 'white',
                        }}>Ascending</Text>

                        <Slider
                            style={{ width: '35%', marginTop: 2, marginBottom: 20, }}
                            step={1}
                            minimumTrackTintColor="#FFF"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#FFF"
                            value={orderValue}
                            onValueChange={(value) => setOrderValue(value)}
                        />

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: 'white',
                        }}>Descending</Text>
                    </View>
                    <CustomModBtn2
                        style={{
                            width: Dimensions.get('window').width * 0.2,
                            resizeMode: 'contain',
                        }}
                        text="OK"
                        onPress={handleOkButtonClick} />

                </View>

            </Modal>


        </View>
    )
}

export default ViewCartScreen;
