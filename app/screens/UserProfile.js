import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

import { logout } from '../actions/auth';

const UserProfile = ({ navigation }) => {

    const user = useSelector(state => state.auth.user)

    const logoutUser = () => {
        dispatch(logout());
    }

    return (
           
        <View style={styles.container}>     
            <View style={{flex: 1}}>
                <View style={styles.profileView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{fontSize:12, fontWeight: "bold", paddingLeft: 10}}>Go Back</Text>
                    </TouchableOpacity>
                    <Text>User Profile</Text>
                </View>
                <View style={styles.profileImageTopView}>
                    <Image source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}} style={styles.profileImage}/>
                    <View style={{marginRight: 5}}>
                        <Text>{user.data.name}</Text>
                        <Text>@{user.data.username}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => logoutUser()}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Upload')}
                            style={styles.buttonUpload}>
                            <Text style={styles.textUpload}>Upload New +</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>   
    )

}

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
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
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


