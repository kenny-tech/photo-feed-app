import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { f, auth, database, storage } from '../../config/config';

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedin: false,
        }
    }

    handleLogin = () => {
        try {
            this.setState({
                loggedin: true
            })
        }catch(error){
            console.log(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loggedin == true ? 
                    (<Text>Upload</Text>): (
                    <View>
                        <Text>You are not logged in </Text>
                        <Text onPress={() => this.handleLogin()}>Please login to upload photo </Text>
                    </View>
                    )
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Upload;

