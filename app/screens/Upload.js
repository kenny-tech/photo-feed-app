import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import ImagePicker from 'react-native-image-picker';

import UserAuth from '../components/Auth'
import { add_photo } from '../actions/photo';

const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const Upload = ({ navigation }) => {

    const [imageSource, setImageSource] = useState('');
    const [uploading, setUploading] = useState(true);
    const [progress, setProgress] = useState(50);
    const [caption, setCaption] = useState('');
    const [base64Value, setBase64Value] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [imageSelected, setImageSelected] = useState(false);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const s4 = () => {
        // generate random string
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         };
         return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const uniqueId = () => {
        return s4();
    }

    const findNewImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
                // console.log('User cancelled image picker');
                setImageSelected(false);
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
                setImageSelected(false);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
                setImageSelected(false);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const base64Value = response.data;
                
                setImageSource(source);
                setImageSelected(true);
                setImageUri(response.uri);
                setBase64Value(base64Value);

                let image = imageSource;

            }
          });
    }

    const uploadImage = (imageUrl) => {
        setUploading(true);
        processUpload()
    }

    const processUpload = () => {

        let userId = user.data.id;
        let username = user.data.username;
        let dateTime = Date.now();
        let timestamp = Math.floor(dateTime / 1000);
        let posted = timestamp;
        let base64Image = 'data:image/jpeg;base64,' + base64Value;
        dispatch(add_photo(userId,caption,posted,base64Image,username))
        Alert.alert('Image Uploaded!!');
        navigation.navigate('Feed');

    }

    const uploadPublish = () => {
        if(caption !== '') {
            // upload and publish to the server
            uploadImage(imageSource);
        } else {
            Alert.alert('Please enter a caption...');
        }     
    }

    const gobackToUpload = () => {
        setImageSelected(false);
        setImageSource('');
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Upload</Text>
            </View>
            {
                isLoggedIn ? 
                (
                <View style={styles.container}>
                    { imageSelected ? (<View style={{flex: 1}}><View>
                    </View>
                    <View style={{marginHorizontal: 20, paddingHorizontal: 30}}> 
                        <Text style={{margin: 5, textAlign: 'center'}}>Caption: </Text>
                        <TextInput
                            editable={true}
                            placeholder={'Enter your caption...'}
                            maxLength={150}
                            multiline={true}
                            numberOfLine={4}
                            onChangeText={text => setCaption(text)}
                            defaultValue={caption}
                            style={{marginVertical:10, height:100, width: 300, padding:5, boderColor: 'grey', borderWidth: 1, borderRadius:3, backgroundColor:'white', color:'black'}}
                        />
                        <TouchableOpacity
                        onPress={ () => uploadPublish() }
                        style={{alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Upload & Publish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => gobackToUpload()} style={{paddingVertical: 10}}>
                            <Text style={{textAlign: 'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        {/* {
                            uploading ? (
                                <View style={{marginTop: 10}}>
                                    <Text>{progress}%</Text>
                                    {
                                        progress != 100 ? (
                                            <ActivityIndicator size="small" color="blue"/>
                                        ) : (
                                            <Text>Processing</Text>
                                        )
                                    }

                                </View>
                            ) : (
                                <View></View>
                            )
                        } */}
                        <Image source={imageSource} style={{marginTop: 10, resizeMode:'cover', width: 300, height: 300}}/>
                        </View>
                    </View>) : (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
                    <TouchableOpacity
                    style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
                    onPress={() => findNewImage()}>
                        <Text style={{color: 'white'}}>Select Photo</Text>
                    </TouchableOpacity>
                    <Image 
                        source={imageSource} 
                        style={{resizeMode: 'cover', width: '100%', height: 275}}
                        /></View>)}
                </View>): (
                    <UserAuth message={'Please login to upload your photo'} />
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileView: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        alignItems: 'center'
    },
})

export default Upload;
