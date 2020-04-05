import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
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
            avatarSource: ''
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
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
              console.log('Uploaded image: ',this.state.avatarSource);
            }
          });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loggedin == true ? 
                    (
                    <View style={styles.container}>
                        <Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
                        <TouchableOpacity
                        style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
                        onPress={() => this.findNewImage()}>
                            <Text style={{color: 'white'}}>Select Photo</Text>
                        </TouchableOpacity>
                        <Image source={this.state.avatarSource} style={{width: 500, height: 300}}/>
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
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Upload;

