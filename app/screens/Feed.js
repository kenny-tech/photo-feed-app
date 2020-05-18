import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';

import { baseurl } from '../../config/config'

class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: {
                id: 1,
                name: 'Kenny'
            },
            feed: []
        }
    }

    loadFeed = () => {
        fetch(baseurl + '/photos')
        .then(response => response.json())
        .then(response => (this.setState({feed: response})))
        .then(response => (console.log('Response: ',this.state.feed)))
        .catch(error => console.log(error))
    }

    componentDidMount = () => {
        this.loadFeed()
    }

    pluralCheck = (s) => {
        if(s == 1){
            return ' ago';
        }else{
            return 's ago';
        }
    }

    timeConverter = (timestamp) => {

        let a, seconds, interval;
        a = new Date(timestamp * 1000);
        seconds = Math.floor((new Date() - a) / 1000);

        interval = Math.floor(seconds / 31536000);
        if(interval > 1){
            return interval+ ' year'+this.pluralCheck(interval)
        }

        interval = Math.floor(seconds / 2592000);
        if(interval > 1){
            return interval+ ' month'+this.pluralCheck(interval)
        }

        interval = Math.floor(seconds / 86400);
        if(interval > 1){
            return interval+ ' day'+this.pluralCheck(interval)
        }

        interval = Math.floor(seconds / 3600);
        if(interval > 1){
            return interval+ ' hour'+this.pluralCheck(interval)
        }

        interval = Math.floor(seconds / 60);
        if(interval > 1){
            return interval+ ' minute'+this.pluralCheck(interval)
        }

        return Math.floor(seconds)+ ' second'+this.pluralCheck(seconds)
    }

    render() {
        const { user, feed } = this.state;

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
                                <Text>{this.timeConverter(item.posted)}</Text>
                                <Text>@{item.username}</Text>
                            </View>
                            <Image source={{uri: item.image}} style={{width: 370, height: 200, marginVertical: 10, marginHorizontal: 20}}/>
                            <Text style={{marginHorizontal: 20}}>{item.caption}</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Comment', {photoId: 5})}>
                                <Text style={{color: 'blue', marginTop: 10, textAlign: 'center'}}>[ View comments ]</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
        )
    }
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

