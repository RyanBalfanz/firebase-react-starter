import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD29yfrssePfYIq3syJdS021wRg7v7oADU",
    authDomain: "fir-react-starter-d0f78.firebaseapp.com",
    databaseURL: "https://fir-react-starter-d0f78.firebaseio.com",
    projectId: "fir-react-starter-d0f78",
    storageBucket: "",
    messagingSenderId: "57377973906"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
