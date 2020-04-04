import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
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
                    (
                        <View style={{flex: 1}}>
                            <View style={styles.profileView}>
                                <Text>Profile</Text>
                            </View>
                            <View style={styles.profileImageTopView}>
                                <Image source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}} style={styles.profileImage}/>
                                <View style={{marginRight: 5}}>
                                    <Text>Name</Text>
                                    <Text>@username</Text>
                                </View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate('Upload')}
                                        style={styles.buttonUpload}>
                                        <Text style={styles.textUpload}>Upload New +</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.loadPhotosView}>
                                <Text>Loading photos...</Text>
                            </View>
                        </View>
                    ): (
                    <View style={styles.loginView}>
                        <Text>You are not logged in </Text>
                        <TouchableOpacity>
                            <Text onPress={() => this.handleLogin()}>Please login to view profile </Text>
                        </TouchableOpacity>
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
    },
    loginView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileView: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        alignItems: 'center'
    },
    profileImageTopView: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    profileNameView: {
        marginRight: 10
    },
    profileImage: {
        marginLeft: 10,
        width: 100,
        height: 100,
        borderRadius: 50
    },
    buttonView: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 1,
        marginLeft: 20
    },
    button: {
        marginTop: 10,
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius:20,
        borderColor: 'grey',
        borderWidth: 1.5
    },
    buttonText: {
        textAlign: 'center', 
        color: 'grey'
    },
    buttonUpload: {
        marginTop: 10,
        marginHorizontal: 40,
        paddingVertical: 35,
        borderRadius:20,
        borderColor: 'grey',
        borderWidth: 1.5,
        backgroundColor: 'grey'
    },
    textUpload: {
        textAlign: 'center', 
        color: 'white'
    },
    loadPhotosView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    }

})

export default UserProfile;

