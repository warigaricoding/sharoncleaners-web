importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js')
importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js")

var firebaseConfig = {
    apiKey: "AIzaSyAbb1QHsnlnSV152wd8H7MZ8pgXjk8de8c",
    authDomain: "sharoncleaners-web.firebaseapp.com",
    databaseURL: "https://sharoncleaners-web.firebaseio.com",
    projectId: "sharoncleaners-web",
    storageBucket: "sharoncleaners-web.appspot.com",
    messagingSenderId: "262180334172",
    appId: "1:262180334172:web:a085c0531447be8a8e9499",
    measurementId: "G-6DXJJB44E9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging()
messaging

