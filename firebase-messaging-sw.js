importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDEkH3xjcGdxOB6_q-k-Kg3gdNHIFdj1PY",
    authDomain: "recipy-64478.firebaseapp.com",
    databaseURL: "https://recipy-64478.firebaseio.com",
    projectId: "recipy-64478",
    storageBucket: "recipy-64478.appspot.com",
    messagingSenderId: "221486582056",
    appId: "1:221486582056:web:6c25eb4b0956e9bb78681d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
