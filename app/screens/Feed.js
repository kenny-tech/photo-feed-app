import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';

class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: {
                id: 1,
                name: 'Kenny'
            }
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

        const { user } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.feedView}>
                    <Text>Feed</Text>
                </View>
                <View>
                    <Text>23 days ago</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('User', {userId: this.state.user.id})}>
                        <Text style={{textAlign: 'right'}}>@{user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.photoView}>
                    <Text>Loading photos...</Text>
                </View>
            </View>
        )
    }
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    feedView: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        alignItems: 'center'
    },
    photoView: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    }

})

export default Feed;

