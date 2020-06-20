import React from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, Image, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'

import { baseurl } from '../../config/config'
import { updateProfile } from '../actions/auth';
import { logout } from '../actions/auth';
import UserAuth from '../components/Auth'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editingProfile: false,
            name: this.props.isLoggedIn? this.props.user.data.name : '',
            username: this.props.isLoggedIn? this.props.user.data.username : '',
            userId: this.props.isLoggedIn? this.props.user.data.id : '',
            userPhotos: []
        }
    }

    componentDidMount = () => {
        this.loadUserPhoto();
    }

    loadUserPhoto = () => {
        let userId = this.state.userId;
        fetch(baseurl + '/userPhotos/' + userId)
        .then(response => response.json())
        .then(response => (this.setState({userPhotos: response.data})))
        .catch(error => console.log(error)) 
    }

    editProfile = () => {
        this.setState({editingProfile: true})
    }

    saveProfile = () => {
        let name = this.state.name;
        let username = this.state.username;
        let userId = this.props.user.data.id;

        console.log('Username: ',username);

        if(name !== '' && username != '')
        {
            this.props.updateProfile(name, username, userId);
            this.setState({
                editingProfile: false
            })
            Alert.alert('Profile successfully updated');
        }
    }

    logoutUser = () => {
        this.props.logout();
    }

    render() {

        const { userPhotos } = this.state;

        return (
            <View style={styles.container}>
                {
                    this.props.isLoggedIn ? 
                    (
                        <View style={{flex: 1}}>
                            <View style={styles.profileView}>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>Profile</Text>
                            </View>
                            <View style={{marginHorizontal: 60, marginVertical: 20}}>
                                <Text>{this.props.user.data.name}</Text>
                                <Text>@{this.props.user.data.username}</Text>
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
                                        value={this.props.user.data.name}
                                        style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                    />
                                    <Text>Username:</Text>
                                    <TextInput
                                        editable={true}
                                        placeholder={'Enter your username'}
                                        onChangeText={(text) => this.setState({username: text})}
                                        value={this.props.user.data.username}
                                        style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                    />
                                    <TouchableOpacity 
                                        style={{backgroundColor: 'blue', padding: 10}}
                                        onPress={() => this.saveProfile()}>
                                        <Text style={{fontWeight: 'bold', color: 'white'}}>Save Changes</Text>
                                    </TouchableOpacity>
                                </View>) : (<View style={styles.buttonView}>   
                                    <TouchableOpacity style={styles.button} onPress={() => this.logoutUser()}>
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
                            
                            {
                                userPhotos === undefined || userPhotos.length == 0 ? 
                                (<View style={styles.loadPhotosView}>
                                    <Text>No photos uploaded yet...</Text>
                                </View>) :
                                (<View style={styles.loadPhotosView}> 
                                    <FlatList
                                        data={this.state.userPhotos}
                                        renderItem={({ item }) => (
                                            <View>
                                                <Image source={{uri: item.image}} style={{width: 370, height: 200, marginVertical: 10, marginHorizontal: 20}}/>
                                            </View>
                                        )}
                                        keyExtractor={item => item._id}
                                    />
                                </View>
                                )
                            }  
                            
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
    }

})

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        userPhotos: state.photo.userPhotos,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (name, username, userId) => { dispatch(updateProfile(name, username, userId))},
        logout: () => { dispatch(logout())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
