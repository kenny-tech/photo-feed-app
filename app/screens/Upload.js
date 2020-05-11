import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux'

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

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSource: '',
            uploading: true,
            progress: 50,
            caption: '',
            base64Value: '',
            url: ''
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
              const base64Value = response.data;
          
              this.setState({
                imageSource: source,
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: response.uri,
                base64Value: base64Value
              });
              let image = this.state.imageSource;
            }
          });
    }

    uploadImage = (imageUrl) => {
        // upload image to server
        this.setState({
            uploading: true
        })
        this.processUpload()
        // Alert.alert('Uploading image to the server...')
    }

    processUpload = () => {

        let userId = this.props.user.data.id;
        let username = this.props.user.data.username;
        let caption = this.state.caption;
        let dateTime = Date.now();
        let timestamp = Math.floor(dateTime / 1000);
        let posted = timestamp;
        let base64Image = 'data:image/jpeg;base64,' + this.state.base64Value;



        // $base64Image = 'data:image/jpeg;base64' + this.state.base64Value;

        // console.log('Base64 image: ',base64Image)


        // var photoObj = {
        //     username: userId,
        //     caption: caption,
        //     posted: timestamp,
        //     url, base64Image
        // };
        this.props.add_photo(userId,caption,posted,base64Image);
        console.log('User details: ',this.props.user.data)

        // update database
        // add to main feed

        // set user photos object

        Alert.alert('Image Uploaded!!');

        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: ''
        });

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

    gobackToUpload = () => {
        this.setState({
            imageSelected: false,
            imageSource: '',
        })
    }

    render() {
        const { imageSelected, uploading, progress } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.profileView}>
                    <TouchableOpacity onPress={() => this.gobackToUpload()}>
                        <Text style={{fontSize:12, fontWeight: "bold", paddingLeft: 10}}>Go Back</Text>
                    </TouchableOpacity>
                    <View style={{marginHorizontal: 10}}>
                        <Text>Upload</Text>
                    </View>
                </View>
                {
                    this.props.isLoggedIn ? 
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
                        <UserAuth message={'Please login to upload your photo'} />
                    )
                }
            </View>
        )
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_photo: (userId,caption,posted,base64Image) => { dispatch(add_photo(userId,caption,posted,base64Image))},
    }
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
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

