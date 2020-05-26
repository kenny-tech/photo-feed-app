import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';

import { login, signup } from '../actions/auth';

const Auth = ({ message }) => {

    const [authStep, setAuthStep] = useState(0);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    // const [moveScreen, setMoveScreen] = useState(false);

    const errorMessage = useSelector(state => state.auth.errorMessage)

    const dispatch = useDispatch();

    const showLogin = () => {
        // this.setState({authStep: 1})
        setAuthStep(1);
    }

    const showSignup = () => {
        // this.setState({authStep: 2})
        setAuthStep(2);
    }

    const handleLogin = () => {

        if(email!='' & pass!='') {
            try { 
                dispatch(login(email,pass));
            }catch(error){
                console.log(error);
            }
        }else{
            Alert.alert('Email or password is empty');
        }
    }

    const handleSignup = () => {

        if(email!='' & pass!='' && name!='' && username!='') {
            try {
                dispatch(signup(email,pass,name,username));
                if(errorMessage === 'Email already taken') {
                    // this.setState({ authStep: 2 })
                    setAuthStep(2);
                } 
                else if(errorMessage === '') {
                    // this.setState({ authStep: 2 })
                    setAuthStep(1);
                    Alert.alert('Registration successful. Please login')
                }
                else {
                }
            }catch(error){
                console.log(error);
            }
        }else{
            Alert.alert('Email or password is empty');
        }
    }

    return (
        <View style={styles.container}>
            <Text>You are not logged in </Text>
            <Text>{message}</Text>
            {
                authStep == 0 ? (
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => showLogin()}>
                            <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                        </TouchableOpacity>
                        <Text style={{marginHorizontal: 10}}>or</Text>
                        <TouchableOpacity onPress={() => showSignup()}>
                            <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                ) : (<View style={{marginVertical: 20}}>
                    { errorMessage !== '' ? (<Text style={{color: 'red'}}>{errorMessage}</Text>) : null }
                    {
                        authStep == 1 ? (
                        // Login
                        <View>
                            <TouchableOpacity 
                                onPress={() => setAuthStep(0)}
                                style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                                <Text style={{fontWeight: 'bold',}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontWeight: 'bold', marginBottom: 20}}>Login</Text>
                            <Text>Email Address:</Text>
                            <TextInput 
                                editable={true}
                                keyboardType={'email-address'}
                                placeholder={'Enter your email address...'}
                                onChangeText={text => setEmail(text)}
                                defaultValue={email}
                                style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <Text>Password:</Text>
                            <TextInput 
                                editable={true}
                                secureTextEntry={true}
                                placeholder={'Enter your password...'}
                                onChangeText={ text => setPass(text) }
                                defaultValue={pass}
                                style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                            />
                            <TouchableOpacity
                                style={{backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                                onPress={() => handleLogin()}
                            >
                                <Text style={{color: 'white'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        ) : (
                            // Sign up
                            <KeyboardAvoidingView> 
                                <View>
                                    <TouchableOpacity 
                                        onPress={() => setAuthStep(0)}
                                        style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                                        <Text style={{fontWeight: 'bold',}}>Cancel</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontWeight: 'bold', marginBottom: 20}}>Sign Up</Text>
                                    <Text>Name:</Text>
                                    <TextInput 
                                        editable={true}
                                        placeholder={'Enter your name...'}
                                        onChangeText={text => setName(text)}
                                        defaultValue={name}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <Text>Username:</Text>
                                    <TextInput 
                                        editable={true}
                                        placeholder={'Enter your username...'}
                                        onChangeText={text => setUsername(text)}
                                        defaultValue={username}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <Text>Email Address:</Text>
                                    <TextInput 
                                        editable={true}
                                        keyboardType={'email-address'}
                                        placeholder={'Enter your email address...'}
                                        onChangeText={text => setEmail(text)}
                                        defaultValue={email}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <Text>Password:</Text>
                                    <TextInput 
                                        editable={true}
                                        secureTextEntry={true}
                                        placeholder={'Enter your password...'}
                                        onChangeText={text => setPass(text)}
                                        defaultValue={pass}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <TouchableOpacity
                                        style={{backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                                        onPress={() => handleSignup()}
                                    >
                                        <Text style={{color: 'white'}}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        )
                    }
                </View>)
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Auth;

