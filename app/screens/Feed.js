import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const Feed = () => {

    const [photoFeed, setPhotoFeed] = useState([0,1,2,3,4]);
    const [refresh, setRefresh] = useState(false);

    const loadNew = () => {
        setRefresh(true);
        setPhotoFeed([5,6,7,8]);
        setRefresh(false);
    }

    return (
        <View style={{flex:1}}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Feed</Text>
            </View>
            <FlatList
                refreshing={refresh}
                onRefresh={loadNew}
                data={photoFeed}
                keyExtractor={(item, index) => index.toString()}
                style={{flex:1, backgroundColor: '#eee'}}
                renderItem={({item, index}) =>(
                    <View key={index}>
                        <View style={{padding: 10}}>
                            <Text>Time Ago</Text>
                            <Text>@Rusty123</Text>
                        </View>
                        <View>
                            {/* <Image
                                source={{uri: 'https://source.unsplash.com/random/500x'+Math.floor((Math.random() * 800) + 500)}}
                                style={{resizeMode: 'cover', width: '100', height: 275}}
                            /> */}
                        </View>
                        <View>
                            <Text>Caption text here...</Text>
                            <Text>View Comments here...</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
    
};

export default Feed;