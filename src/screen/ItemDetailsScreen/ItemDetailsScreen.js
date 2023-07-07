import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { debounce } from 'lodash';
import addCart from '../../../assets/images/addcart.png';
import Plus from '../../../assets/images/plus.png';
import Minus from '../../../assets/images/minus.png';



const ItemDetailsScreen = () => {
    const navigation = useNavigation(); // Access the navigation object

    // Check if route and route.params exist before accessing item
    const route = useRoute();
    const item = route.params?.itemId;

    // State to store the fetched data
    const [itemData, setItemData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add state to track the current image index
    const [currentItemAmount, setCurrentItemAmount] = useState(0);

    const onSwipeLeft = debounce(() => {
        // Check if there are more images to the left
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }, 100); // Adjust the delay (in milliseconds) to your desired value

    const onSwipeRight = debounce(() => {
        // Check if there are more images to the right
        if (currentImageIndex < itemData.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }, 100); // Adjust the delay (in milliseconds) to your desired value

    const handleSwipe = (event) => {
        // Get the x-coordinate of the swipe gesture
        const { translationX } = event.nativeEvent;

        if (translationX > 0) {
            // Swipe is moving towards the right (positive x-coordinate change)
            onSwipeRight();
        } else if (translationX < 0) {
            // Swipe is moving towards the left (negative x-coordinate change)
            onSwipeLeft();
        }
    };

    const AddCARTPressed = async (currentItemAmount) => {
        try {
            if(currentItemAmount==0){
                console.warn("PLEASE DECIDE THE ITEM QUANTITY");
            }else{
                const response = await fetch('https://dummyjson.com/carts/8', {
                    method: 'PUT', /* or PATCH */
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merge: true, // this will include existing products in the cart
                        products: [
                            {
                                id: item,
                                quantity: currentItemAmount,
                            },
                        ]
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Items successfully added to cart", data);
                    navigation.navigate('ViewCartScreen');
                } else {
                    console.warn('Add to cart Failed');
                }
            }
        } catch (error) {
            console.error('Error occurred during add item to cart:', error);
        }
    };


    const PlusPressed = async () => {
        if (currentItemAmount < itemData.stock){
            itemAmount = currentItemAmount + 1;
            setCurrentItemAmount(itemAmount);
        } else if (currentItemAmount == itemData.stock) {
            console.warn("Reach Max Amount of Stock");
        }
       
    };

    const MinusPressed = async () => {
        if (currentItemAmount > 0) {
            itemAmount = currentItemAmount - 1;
            setCurrentItemAmount(itemAmount);
        }
    }

    

    useEffect(() => {
        if (!item) {
            // Handle the case when the item is undefined or not passed correctly
            return;
        }

        fetch(`https://dummyjson.com/products/${item}`)
            .then((res) => res.json())
            .then((data) => setItemData(data));
    }, [item]);

    if (!itemData) {
        // Handle the case when the fetched data is not available yet
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container}>

            <PanGestureHandler 
                onGestureEvent={handleSwipe}>

                <Image
                    source={{ uri: itemData.images[currentImageIndex] }} // Use the current image URL from the array 
                    style={styles.imageBackground}
                    onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
                />

            </PanGestureHandler>
            
            <Text style={styles.title}>{itemData.title}</Text>
            <Text style={styles.description}>{itemData.description}</Text>

            <View style={{
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 0, 
            }}>
                <Text style={{
                    color:'red'
                }}>RM </Text>
                <Text style={styles.price}>{itemData.price}</Text>
            </View>
    

            <View style={{
                flexDirection:'row',
            }}>

                <View style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -10,
                        marginTop: -10,
                    }}>
                        <View style={{
                            backgroundColor: '#f75a4f',
                            paddingLeft: 25,
                            paddingRight: 25,
                            paddingTop: 10,
                            paddingBottom: 10,
                            margin: 10,
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                color: 'white',
                            }}>Brand</Text>
                        </View>

                        <View style={{
                            backgroundColor: 'rgba(247, 90, 79,0.1)',
                            paddingLeft: 50,
                            paddingRight: 25,
                            paddingTop: 10,
                            paddingBottom: 10,
                            margin: -40,
                            borderRadius: 10,
                        }}>
                            <Text style={styles.brand}>{itemData.brand}</Text>

                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -10,
                        marginTop: -10,
                    }}>
                        <View style={{
                            backgroundColor: '#f75a4f',
                            paddingLeft: 25,
                            paddingRight: 25,
                            paddingTop: 10,
                            paddingBottom: 10,
                            margin: 10,
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                color: 'white',
                            }}>Stock</Text>
                        </View>

                        <View style={{
                            backgroundColor: 'rgba(247, 90, 79,0.1)',
                            paddingLeft: 50,
                            paddingRight: 25,
                            paddingTop: 10,
                            paddingBottom: 10,
                            margin: -40,
                            borderRadius: 10,
                        }}>
                            <Text style={styles.stock}>{itemData.stock}</Text>

                        </View>

                    </View>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -10,
                        marginTop: -10,
                    }}>

                        <View style={{
                            backgroundColor: '#f75a4f',
                            paddingLeft: 23,
                            paddingRight: 23,
                            paddingTop: 10,
                            paddingBottom: 10,
                            margin: 10,
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                color: 'white',
                            }}>Rating</Text>
                        </View>

                        <View style={{
                            borderColor: 'rgba(247, 90, 79, 1)',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginLeft: -96,
                        }}>
                            <Rating
                                type='heart'
                                ratingCount={5}
                                showRating={false}
                                readonly
                                showReadOnlyText={false}
                                fractions={2}
                                jumpValue={0.01}
                                startingValue={itemData.rating}
                                imageSize={19.1}
                                ratingBackgroundColor='transparent'
                                style={{
                                    backgroundColor: 'transparent',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    paddingLeft: 100,
                                    paddingRight: 20,
                                }}
                            />
                        </View>

                    </View>

                    <View style={{
                        // backgroundColor:'black',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 0,
                        marginTop: 10,
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


                        <Text style={{margin:10}}>{currentItemAmount}</Text>
                        

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

                <TouchableOpacity 
                    style={{
                        // backgroundColor:'black',
                        borderColor:'rgba(191, 104, 98, 0.2)',
                        borderRadius:15,
                        borderWidth:2,
                        marginLeft:100,
                        width: '11%',
                        aspectRatio: 1,
                        alignItems:'center',
                }}
                onPress={() => AddCARTPressed(currentItemAmount)}>
                
                <Image
                    source={addCart}
                    style={{
                        width: '70%',
                        height: '70%',
                        margin:5,
                        resizeMode: 'contain',
                    }}
                />

                </TouchableOpacity>


            </View>
            

        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
    },
    imageBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#000', // Set text color to be visible on the image background
    },
    description: {
        fontSize: 16,
        color: '#000', // Set text color to be visible on the image background
    },
    brand: {
        fontSize: 16,
        fontWeight:'bold',
        color: '#f75a4f', // Set text color to be visible on the image background
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10, 
        marginBottom: 10, 
        marginLeft: 10, 
        color: '#f75a4f', // Set text color to be visible on the image background
    },
    stock: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f75a4f', // Set text color to be visible on the image background
    },
});

export default ItemDetailsScreen;
