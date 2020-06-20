import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert, Image, FlatList } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import UserAuth from '../components/Auth'
import { add_comment, fetch_comment } from '../actions/comment';

const Comment = ({ navigation, route }) => {

    const [commentList, setCommentList] = useState([]);
    const [photoId, setPhotoId] = useState('');
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        checkParams();
    }, []);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const comments = useSelector(state => state.comment.comment);

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


    const checkParams = () => {

        let photoId = route.params.photoId
        // Alert.alert(photoId);
        if(photoId) {
            setPhotoId(photoId);
            fetchComments(photoId);   
        }
    }

    const fetchComments = (photoId) => {
        dispatch(fetch_comment(photoId));
        // setCommentList(comments);
        // setComments(comments);
        console.log('Fetched comments: ',comments);
        setCommentList(comments);
    }

    const postComment = () => {

        if(comment != '') {
            let dateTime = Date.now();
            let timestamp = Math.floor(dateTime / 1000);
            let posted = timestamp;
            let username = user.data.username;

            dispatch(add_comment(photoId,username,posted,comment));
            Alert.alert('Comment successfully added');
        }else{
            Alert.alert('Please enter a comment before posting');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.commentView}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Comment</Text>
            </View>
            <Image source={{uri: route.params.image}} style={{width: 370, height: 200, marginVertical: 10, marginHorizontal: 20}}/>
            {
                commentList === undefined || comment.length == 0 ? (
                    // no comments show empty state
                    <View style={{marginHorizontal: 20, marginVertical: 10}}>
                        <Text>No comment available</Text>
                    </View>
                ) : (
                    // There are comments
                    <View>
                        <FlatList
                            data={commentList}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={{marginHorizontal: 10, marginVertical: 10}}>
                                        <Text style={{marginHorizontal: 20, fontWeight: 'bold'}}>{item.comment}</Text>                                    
                                        <Text style={{marginHorizontal: 20, fontStyle: 'italic', fontSize: 10}}>By: {item.username}, Posted: {timeConverter(item.posted)}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item._id}
                        />
                    </View>
                )
            }
            {
                isLoggedIn ? 
                (
                    <KeyboardAvoidingView behavior="padding" enabled style={{borderTopWidth: 1, borderTopColor: 'grey', padding: 10, marginBottom: 15}}>
                         <View style={{marginHorizontal: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Post Comment</Text>
                             <TextInput 
                                editable={true}
                                placeholder={'Enter your comment here...'}
                                onChangeText={text => setComment(text)}
                                style={{marginVertical: 10, height: 50, padding: 5, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                             />
                             <TouchableOpacity
                                onPress={() => postComment()}
                                style={{backgroundColor: 'blue', borderRadius: 3, width: 100, height: 30, justifyContent: 'center'}}>
                                 <Text style={{color:'white', textAlign: 'center'}}>Post</Text>
                             </TouchableOpacity>
                         </View>
                    </KeyboardAvoidingView>
                ): (
                    <UserAuth message={'Please login to add comment'}/>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentView: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        alignItems: 'center'
    },
    bottom: {
        width: '100%',
        height: 50,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
})

export default Comment;

