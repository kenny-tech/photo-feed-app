import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';

import { baseurl } from '../../config/config'

const Feed = ({ navigation }) => {
    const [feed, setFeed] = useState([]);

    const loadFeed = () => {
        fetch(baseurl + '/photos')
        .then(response => response.json())
        .then(response => (setFeed(response)))
        .then(response => (console.log('Response: ',feed)))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        loadFeed()
    });

    const pluralCheck = (s) => {
        if(s == 1){
            return ' ago';
        }else{
            return 's ago';
        }
    }

    const timeConverter = (timestamp) => {

        let a, seconds, interval;
        a = new Date(timestamp * 1000);
        seconds = Math.floor((new Date() - a) / 1000);

        interval = Math.floor(seconds / 31536000);
        if(interval > 1){
            return interval+ ' year'+pluralCheck(interval)
        }

        interval = Math.floor(seconds / 2592000);
        if(interval > 1){
            return interval+ ' month'+pluralCheck(interval)
        }

        interval = Math.floor(seconds / 86400);
        if(interval > 1){
            return interval+ ' day'+pluralCheck(interval)
        }

        interval = Math.floor(seconds / 3600);
        if(interval > 1){
            return interval+ ' hour'+pluralCheck(interval)
        }

        interval = Math.floor(seconds / 60);
        if(interval > 1){
            return interval+ ' minute'+pluralCheck(interval)
        }

        return Math.floor(seconds)+ ' second'+pluralCheck(seconds)
    }

    return (
        <View style={styles.container}>
            <View style={styles.feedView}>
                <Text>Feed</Text>
            </View>
            <FlatList
                data={feed}
                renderItem={({ item }) => (
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 5}}>
                            <Text>{timeConverter(item.posted)}</Text>
                            <Text>@{item.username}</Text>
                        </View>
                        <Image source={{uri: item.image}} style={{width: 370, height: 200, marginVertical: 10, marginHorizontal: 20}}/>
                        <Text style={{marginHorizontal: 20}}>{item.caption}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Comment', {
                                    photoId: item._id, image: item.image
                                });
                              }}
                        >
                            <Text style={{color: 'blue', marginTop: 10, textAlign: 'center'}}>[ View comments ]</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item._id}
            />
        </View>
    )

}

 
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

