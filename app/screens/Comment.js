import React, { useImperativeHandle } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

import UserAuth from '../components/Auth'

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments_list: [],
            user: {
                id: 1,
                name: 'Kenny'
            }
        }
    }

    componentDidMount = () => {
        this.checkParams()
    }

    checkParams = () => {
        var photoId = this.props.route.params.photoId
        Alert.alert(photoId);
        if(photoId) {
            this.setState({
                photoId: photoId
            });
            this.fetchComments(photoId);   
        }
    }

    addCommmentToList = (comments_list, data, comment) => {

    }

    fetchComments = (photoId) => {
        // fetch photo id comments order by posted
        // const exists = get comments
        // if(exists) {
        //     // add comments to Flatlist
        // }else{
        //     this.setState({
        //         comments_list: []
        //     })
        // }
        // for ( var comment in data) {
        //     this.addCommmentToList(comments_list, data, comment)
        // }
    }

    postComment = () => {
        let comment = this.state.comment;
        if(comment != '') {
            // process
            // let imageId = this.state.photoId;
            // let commentId = this.uniqueId();
            // let dateTime = Date.now();
            // let timeStamp = Math.floor(dateTime / 1000);
            
            // let commentObj = {
            //     posted: timeStamp,
            //     author: userId,
            //     comment: comment
            // }

            // post comment

            // reload comment
            // this.reloadCommentList();

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
        return (
            <View style={styles.container}>
                <View style={styles.commentView}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{fontSize:12, fontWeight: "bold", paddingLeft: 10}}>Go Back</Text>
                    </TouchableOpacity>
                    <Text>Comment</Text>
                </View>
                {
                    this.state.comments_list.length == 0 ? (
                        // no comments show empty state
                        <View style={{marginHorizontal: 10, marginVertical: 10}}>
                            <Text>No comment available</Text>
                        </View>
                    ) : (
                        // There are comments
                        <FlatList
                            data = {this.state.comments_list}
                        />
                    
                    )
                }
                {
                    this.props.isLoggedIn ? 
                    (
                        <KeyboardAvoidingView behavior="padding" enabled style={{borderTopWidth: 1, borderTopColor: 'grey', padding: 10, marginBottom: 15}}>
                             <View>
                                <Text style={{fontWeight: 'bold'}}>Post Comment</Text>
                                 <TextInput 
                                    editable={true}
                                    placeholder={'Enter your comment here...'}
                                    onChangeText={(text) => this.setState({comment: text})}
                                    style={{marginVertical: 10, height: 50, padding: 5, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                                 />
                                 <TouchableOpacity
                                    onPress={() => this.postComment}
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
        flexDirection: "row",
        justifyContent: "space-between"
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
    };
};

export default connect(mapStateToProps, null)(Comment);

