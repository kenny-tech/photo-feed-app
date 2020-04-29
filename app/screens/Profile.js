import React from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, Image, Alert } from 'react-native';
import UserAuth from '../components/Auth'
import { connect } from 'react-redux'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            editingProfile: false,
            name: 'John',
            username: 'john'
        }
    }

    fetchUserInfo = (userId) => {
        // fetch user info from db

        // if user info exists, set it in state
        // if(exists) {
        //     this.setState({
        //         username: data.username,
        //         name: data.name,
        //         loggedin: true,
        //         userId: userId
        //     })
        // }
    }

    componentDidMount = () => {
        // get user

        // if(user) {
        //     this.fetchUserInfo(user.uid)
        // } else {
        //     this.setState({
        //         loggedin: false
        //     })
        // }
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

    logout = () => {
        Alert.alert('Logged out');
    }

    editProfile = () => {
        this.setState({editingProfile: true})
    }

    saveProfile = () => {
        let name = this.state.name;
        let username = this.state.username;

        if(name !== '' && username != '')
        {
            // Save profile to database
            Alert.alert('Profile successfully updated');
            this.setState({
                editingProfile: false
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.isLoggedIn ? 
                    (
                        <View style={{flex: 1}}>
                            <View style={styles.profileView}>
                                <Text>Profile</Text>
                            </View>
                            <View style={{marginHorizontal: 60, marginVertical: 20}}>
                                <Text>{this.state.name}</Text>
                                <Text>@{this.state.username}</Text>
                            </View>  
                            <View style={styles.profileImageTopView}>
                                {this.state.editingProfile == true ? (
                                <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 1, marginLeft: 50}}>
                                    <Text>Editing</Text>
                                    <TouchableOpacity onPress={() => this.setState({editingProfile: false})}>
                                        <Text style={{fontWeight: 'bold'}}>Cancel Editing</Text>
                                    </TouchableOpacity>
                                    <Text>Name:</Text>
                                    <TextInput
                                        editable={true}
                                        placeholder={'Enter your name'}
                                        onChangeText={(text) => this.setState({name: text})}
                                        value={this.state.name}
                                        style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                    />
                                    <Text>Username:</Text>
                                    <TextInput
                                        editable={true}
                                        placeholder={'Enter your username'}
                                        onChangeText={(text) => this.setState({username: text})}
                                        value={this.state.username}
                                        style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                    />
                                    <TouchableOpacity 
                                        style={{backgroundColor: 'blue', padding: 10}}
                                        onPress={() => this.saveProfile()}>
                                        <Text style={{fontWeight: 'bold', color: 'white'}}>Save Changes</Text>
                                    </TouchableOpacity>
                                </View>) : (<View style={styles.buttonView}>   
                                    <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                                        <Text style={styles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.editProfile()}>
                                        <Text style={styles.buttonText}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate('Upload')}
                                        style={styles.buttonUpload}>
                                        <Text style={styles.textUpload}>Upload New +</Text>
                                    </TouchableOpacity>
                                </View>)}
                                <Image source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}} style={styles.profileImage}/>
                                                           
                            </View>
                            <View style={styles.loadPhotosView}>
                                <Text>Loading photos...</Text>
                            </View>
                        </View>
                    ): (
                        <UserAuth message={'Please login to view your profile'}/>
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
        marginHorizontal: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    buttonView: {
        flex: 1,
        paddingTop: 10,
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default connect(mapStateToProps, null)(Profile);
