import React, { useImperativeHandle } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

import UserAuth from '../components/Auth'
import { add_comment, fetch_comment } from '../actions/comment';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments_list: [],
            photoId: '',
            comment: '',
        }
    }

    componentDidMount = () => {
        this.checkParams()
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


    checkParams = () => {
        let photoId = this.props.route.params.photoId
        // Alert.alert(photoId);
        if(photoId) {
            this.setState({
                photoId: photoId
            });
            this.fetchComments(photoId);   
        }
    }

    fetchComments = (photoId) => {
        this.props.fetch_comment(photoId);
    }

    postComment = () => {
        let comment = this.state.comment;
        
        if(comment != '') {
            let photoId = this.state.photoId;
            let dateTime = Date.now();
            let timestamp = Math.floor(dateTime / 1000);
            let posted = timestamp;
            let username = this.props.user.data.username;

            this.props.add_comment(photoId,username,posted,comment);
            if(this.props.comment === 'success') {
                Alert.alert('Comment successfully added');
            }
        }else{
            Alert.alert('Please enter a comment before posting');
        }
    }

    // reloadCommentList = () => {
    //     this.setState({
    //         comments_list: []
    //     });
    //     this.fetchComments(this.state.photoId)
    // }

    render() {

        const { comment } = this.props;
        // console.log('Comments here 123: ', comment)
        return (
            <View style={styles.container}>
                <View style={styles.commentView}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Comment</Text>
                </View>
                {
                    comment === undefined || comment.length == 0 ? (
                        // no comments show empty state
                        <View style={{marginHorizontal: 20, marginVertical: 10}}>
                            <Text>No comment available</Text>
                        </View>
                    ) : (
                        // There are comments
                        <View>
                            <Image source={{uri: this.props.route.params.image}} style={{width: 370, height: 200, marginVertical: 10, marginHorizontal: 20}}/>
                            <FlatList
                                data={comment}
                                renderItem={({ item }) => (
                                    <View>
                                        <View style={{marginHorizontal: 10, marginVertical: 10}}>
                                            <Text style={{marginHorizontal: 20, fontWeight: 'bold'}}>{item.comment}</Text>                                    
                                            <Text style={{marginHorizontal: 20, fontStyle: 'italic', fontSize: 10}}>By: {item.username}, Posted: {this.timeConverter(item.posted)}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    )
                }
                {
                    this.props.isLoggedIn ? 
                    (
                        <KeyboardAvoidingView behavior="padding" enabled style={{borderTopWidth: 1, borderTopColor: 'grey', padding: 10, marginBottom: 15}}>
                             <View style={{marginHorizontal: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Post Comment</Text>
                                 <TextInput 
                                    editable={true}
                                    placeholder={'Enter your comment here...'}
                                    onChangeText={(text) => this.setState({comment: text})}
                                    style={{marginVertical: 10, height: 50, padding: 5, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                                 />
                                 <TouchableOpacity
                                    onPress={() => this.postComment()}
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
};

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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        comment: state.comment.comment,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_comment: (photoId,username,posted,comment) => { dispatch(add_comment(photoId,username,posted,comment))},
        fetch_comment: (photoId) => { dispatch(fetch_comment(photoId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

