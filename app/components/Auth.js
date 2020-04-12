import React, { useImperativeHandle } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authStep: 0,
            email: '',
            pass: '',
            moveScreen: false
        }
    }

    componentDidMount = () => {
        
    }

    login = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>You are not logged in </Text>
                <Text>{this.props.message}</Text>
                {
                    this.state.authStep == 0 ? (
                        <View style={{marginVertical: 20, flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.setState({authStep: 1})}>
                                <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 10}}>or</Text>
                            <TouchableOpacity onPress={() => this.setState({authStep: 1})}>
                                <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (<View style={{marginVertical: 20}}>
                        {
                            this.state.authStep == 1 ? (<Text>Login</Text>) : (<Text>Sign Up</Text>)
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

export default Auth;

