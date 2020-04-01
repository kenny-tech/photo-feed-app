import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Feed = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.feedView}>
                <Text>Feed</Text>
            </View>
            <View>
                <Text>23 days ago</Text>
                <Text style={{textAlign: 'right'}}>@exampleUser</Text>
            </View>
            <View style={styles.photoView}>
                <Text>Loading photos...</Text>
            </View>
        </View>
    )
    
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

