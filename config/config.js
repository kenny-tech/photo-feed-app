import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCYBfhmOYZb9AKwMM9tLkWarLsg1lUvsHg",
    authDomain: "photo-feed-d5820.firebaseapp.com",
    databaseURL: "https://photo-feed-d5820.firebaseio.com",
    projectId: "photo-feed-d5820",
    storageBucket: "photo-feed-d5820.appspot.com",
    messagingSenderId: "790481111898",
    appId: "1:790481111898:web:ee463249a790b4cb39c163"
};

// Initialize Firebase
firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage()