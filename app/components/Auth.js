import React from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';

import { login, signup } from '../actions/auth';

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            authStep: 0,
            email: '',
            pass: '',
            moveScreen: false
        }
    }

    componentDidMount = () => {

    }

    showLogin = () => {
        this.setState({authStep: 1})
    }

    showSignup = () => {
        this.setState({authStep: 2})
    }

    handleLogin = () => {
        let email =this.state.email;
        let pass = this.state.pass;

        if(email!='' & pass!='') {
            try { 
                this.props.login(email,pass);
                // this.setState({
                //     loggedin: true,
                //     email: email,
                //     pass: pass
                // });
                // this.props.navigation.navigate('Upload');
                // this.props.navigation.navigate(this.props.page);
                // console.log('Page: ',this.props.page);
                // Alert.alert('Login successful')
            }catch(error){
                console.log(error);
            }
        }else{
            Alert.alert('Email or password is empty');
        }
    }

    signup = () => {
        let email =this.state.email;
        let pass = this.state.pass;

        if(email!='' & pass!='') {
            try {
                // this.setState({
                //     loggedin: true,
                //     email: email,
                //     pass: pass
                // });
                // Alert.alert('Signup successful')
                this.props.signup(email,pass);
            }catch(error){
                console.log(error);
            }
        }else{
            Alert.alert('Email or password is empty');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>You are not logged in </Text>
                <Text>{this.props.message}</Text>
                {
                    this.state.authStep == 0 ? (
                        <View style={{marginVertical: 20, flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.showLogin()}>
                                <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 10}}>or</Text>
                            <TouchableOpacity onPress={() => this.showSignup()}>
                                <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (<View style={{marginVertical: 20}}>
                        {
                            this.state.authStep == 1 ? (
                            // Login
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.setState({authStep: 0})}
                                    style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                                    <Text style={{fontWeight: 'bold',}}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={{fontWeight: 'bold', marginBottom: 20}}>Login</Text>
                                <Text>Email Address:</Text>
                                <TextInput 
                                    editable={true}
                                    keyboardType={'email-address'}
                                    placeholder={'Enter your email address...'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <Text>Password:</Text>
                                <TextInput 
                                    editable={true}
                                    secureTextEntry={true}
                                    placeholder={'Enter your password...'}
                                    onChangeText={(text) => this.setState({pass: text})}
                                    value={this.state.pass}
                                    style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                />
                                <TouchableOpacity
                                    style={{backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                                    onPress={() => this.handleLogin()}
                                >
                                    <Text style={{color: 'white'}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            ) : (
                                // Sign up
                                <View>
                                    <TouchableOpacity 
                                        onPress={() => this.setState({authStep: 0})}
                                        style={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black'}}>
                                        <Text style={{fontWeight: 'bold',}}>Cancel</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontWeight: 'bold', marginBottom: 20}}>Sign Up</Text>
                                    <Text>Email Address:</Text>
                                    <TextInput 
                                        editable={true}
                                        keyboardType={'email-address'}
                                        placeholder={'Enter your email address...'}
                                        onChangeText={(text) => this.setState({email: text})}
                                        value={this.state.email}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <Text>Password:</Text>
                                    <TextInput 
                                        editable={true}
                                        secureTextEntry={true}
                                        placeholder={'Enter your password...'}
                                        onChangeText={(text) => this.setState({pass: text})}
                                        value={this.state.pass}
                                        style={{width: 250, marginVertical: 10, padding:5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                                    />
                                    <TouchableOpacity
                                        style={{backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                                        onPress={() => this.signup()}
                                    >
                                        <Text style={{color: 'white'}}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>)
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, pass) => { dispatch(login(email, pass))},
        login: (email, pass) => { dispatch(signup(email, pass))},
    }
}

export default connect(null, mapDispatchToProps)(Auth);

