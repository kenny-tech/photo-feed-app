import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSource: '',
            uploading: true,
            progress: 50,
            caption: ''
        }
    }    

    s4 = () => {
        // generate random string
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         };
         return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    uniqueId = () => {
        return this.s4();
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

    findNewImage = () => {
        // this._checkPermissions();
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
              this.setState({
                imageSelected: false,
              });
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              this.setState({
                imageSelected: false,
              });
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              this.setState({
                imageSelected: false,
              });
            } else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                imageSource: source,
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: response.uri
              });
              let image = this.state.imageSource;
              // console.log('Uploaded image: ',this.state.imageSource);
            }
          });
    }

    uploadImage = (image) => {
        // upload image to server
        this.setState({
            uploading: true
        })
        Alert.alert('Uploading image to the server...')
    }

    uploadPublish = () => {
        if(this.state.caption !== '') {
            // upload and publish to the server
            this.uploadImage(this.state.imageSource);
            // Alert.alert('Upload and publish in progress...');
        } else {
            Alert.alert('Please enter a caption...');
        }     
    }

    render() {
        const { loggedin, imageSelected, uploading, progress } = this.state;
        
        return (
            <View style={styles.container}>
                {
                    loggedin ? 
                    (
                    <View style={styles.container}>
                        { imageSelected ? (<View style={{flex: 1}}><View>
                            <Text style={{fontSize: 28, paddingBottom: 15, textAlign: 'center'}}>Upload</Text>
                        </View>
                        <View style={{marginHorizontal: 20, paddingHorizontal: 30}}> 
                            <Text style={{margin: 5, textAlign: 'center'}}>Caption: </Text>
                            <TextInput
                                editable={true}
                                placeholder={'Enter your caption...'}
                                maxLength={150}
                                multiline={true}
                                numberOfLine={4}
                                onChangeText={(text) => this.setState({caption: text})}
                                style={{marginVertical:10, height:100, width: 300, padding:5, boderColor: 'grey', borderWidth: 1, borderRadius:3, backgroundColor:'white', color:'black'}}
                            />
                            <TouchableOpacity
                            onPress={ () => this.uploadPublish() }
                            style={{alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Upload & Publish</Text>
                            </TouchableOpacity>
                            {
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
                            }
                            <Image source={this.state.imageSource} style={{marginTop: 10, resizeMode:'cover', width: 300, height: 300}}/>
                            </View>
                        </View>) : (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
                        <TouchableOpacity
                        style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
                        onPress={() => this.findNewImage()}>
                            <Text style={{color: 'white'}}>Select Photo</Text>
                        </TouchableOpacity>
                        <Image 
                            source={this.state.imageSource} 
                            style={{resizeMode: 'cover', width: '100%', height: 275}}
                            /></View>)}
                    </View>): (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
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
    }
})

export default Upload;

