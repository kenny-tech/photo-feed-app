import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, Image, Alert, FlatList } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import { baseurl } from '../../config/config'
import { updateProfile } from '../actions/auth';
import UserAuth from '../components/Auth'


const Profile = ({ navigation }) => {
    const [editingProfile, setEditingProfile] = useState(false);
    const [name, setName] = useState(isLoggedIn? user.data.name : '');
    const [username, setUsername] =  useState(isLoggedIn? user.data.username : '');
    const [userId, setUserId] = useState(isLoggedIn? user.data.id : '');

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const userPhotos = useSelector(state => state.photo.userPhotos);

    const dispatch = useDispatch()

    useEffect(() => {
        loadUserPhoto();
    }, [])

    const loadUserPhoto = () => {
        // let userId = this.state.userId;
        fetch(baseurl + '/userPhotos/' + userId)
        .then(response => response.json())
        .then(response => (setUserPhotos(response.data)))
        .catch(error => console.log(error)) 
    }

    const editProfile = () => {
        // this.setState({editingProfile: true})
        setEditingProfile(true);
    }

    const saveProfile = () => {

        let userId = user.data.id;

        if(name !== '' && username != '')
        {
            dispatch(updateProfile(name, username, userId));

            setEditingProfile(false);

            // this.setState({
            //     editingProfile: false
            // })
            Alert.alert('Profile successfully updated');
        }
    }

    return (
        <View style={styles.container}>
            {
                isLoggedIn ? 
                (
                    <View style={{flex: 1}}>
                        <View style={styles.profileView}>
                            <Text>Profile</Text>
                        </View>
                        <View style={{marginHorizontal: 60, marginVertical: 20}}>
                            <Text>{user.data.name}</Text>
                            <Text>@{user.data.username}</Text>
                        </View>  
                        <View style={styles.profileImageTopView}>
                            {editingProfile == true ? (
                            <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20, borderBottomWidth: 1, marginLeft: 50}}>
                                <Text>Editing</Text>
                                <TouchableOpacity onPress={() => setEditingProfile(false)}>
                                    <Text style={{fontWeight: 'bold'}}>Cancel Editing</Text>
                                </TouchableOpacity>
                                <Text>Name:</Text>
                                <TextInput
                                    editable={true}
                                    placeholder={'Enter your name'}
                                    onChangeText={text => setName(text)}
                                    defaultValue={user.data.name}
                                    style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                />
                                <Text>Username:</Text>
                                <TextInput
                                    editable={true}
                                    placeholder={'Enter your username'}
                                    onChangeText={text => setUsername(text)}
                                    defaultValue={user.data.username}
                                    style={{width: 200, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                                />
                                <TouchableOpacity 
                                    style={{backgroundColor: 'blue', padding: 10}}
                                    onPress={() => saveProfile()}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>) : (<View style={styles.buttonView}>   
                                <TouchableOpacity style={styles.button} onPress={() => logout()}>
                                    <Text style={styles.buttonText}>Logout</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => editProfile()}>
                                    <Text style={styles.buttonText}>Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Upload')}
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
                                    data={userPhotos}
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

export default Profile
