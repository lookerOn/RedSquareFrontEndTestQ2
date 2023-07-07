import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import Logo from '../../../assets/images/logo1.png'
import CustomInput from '../../component/CustomInput/CustomInput'
import { useState, useEffect, useLayoutEffect } from 'react'
import CustomBtn from '../../component/CustomBtn/CustomBtn'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SignInScreen = () => {

    const navigation = useNavigation(); // Access the navigation object

    // gain user input
    const [UserName, setUserName] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [authToken, setAuthToken] = useState('');

    const onSignInPressed = async () => {

        try {
            console.log('UserName:', UserName);
            console.log('UserPassword:', UserPassword);

            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: UserName, password: UserPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Token :", data.token);
                setAuthToken(data.token);
                
                // fetch('https://dummyjson.com/auth/RESOURCE', {
                //     method: 'GET', /* or POST/PUT/PATCH/DELETE */
                //     headers: {
                //         'Authorization': `Bearer ${data.token}`,
                //         'Content-Type': 'application/json'
                //     },
                // })
                //     .then(response => response.json())
                //     .then(data => {
                //         console.log('API response:', data);
                //     })
                //     .catch(error => {
                //         console.error('API error:', error);
                //         console.log('API response status:', error.response);
                //     });

                navigation.navigate('AllProductScreen');
            } else {
                console.warn('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    // const callSecondAPI = async (authToken) => {
    //     try {
    //         console.log('Inside callSecondAPI, authToken:', authToken); // Log the value received as an argument
    //         const response = await fetch('https://dummyjson.com/auth/RESOURCE', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${authToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Dummy API response:', data);
    //         } else {
    //             console.warn('Second API call failed.');
    //             console.log('Inside callSecondAPI, response:', response);
    //         }

    //     } catch (error) {
    //         console.error('Error occurred during the dummy API call:', error);
    //     }
    // };

    useEffect(() => {
        if (authToken) {
            console.log('useEffect triggered, authToken:', authToken); // Log the value when the effect is triggered
            // callSecondAPI(authToken);
        }
    }, [authToken]);

    const onForgotPassPressed = () => {
        console.warn("ForgotPass");
    }

    const onRegisterPressed = () => {
        console.warn("Register");
    }

    // design
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: '#f54e42',
            alignItems: 'center',
            justifyContent: 'center',
            // padding:20,
        },

        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
        },

        InputContainer:{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:20,
        },
        logo: {
            width: Dimensions.get('window').width * 0.3, // Adjust the logo size as needed
            height: Dimensions.get('window').width * 0.3, // Adjust the logo size as needed
            resizeMode: 'contain', // This ensures that the image does not get cut and maintains aspect ratio
            marginBottom: 50,
            marginTop:100,
        },
    });

    return (
        <View style={styles.root}>

            <ImageBackground
                source={require('../../../assets/images/loginback.png')}
                style={styles.backgroundImage}
            >
            
                <Image 
                    source={Logo} 
                    style={styles.logo} 
                />

                <View style={styles.InputContainer}>
                    <CustomInput placeholder='Username' value={UserName} setValue={setUserName} secureTextEntry={false} />
                    <CustomInput placeholder='Password' value={UserPassword} setValue={setUserPassword} secureTextEntry={true} />
                </View>

                <CustomBtn onPress={onSignInPressed} text="SIGN IN" type="PRIMARY"/>
                <CustomBtn onPress={onForgotPassPressed} text="FORGOT PASSWORD" type="TERTIARY" />
                <CustomBtn onPress={onRegisterPressed} text="REGISTER" type="SECOND" />
        
            </ImageBackground>
        </View>
  )
}

export default SignInScreen