import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  resetAuthForm() {
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    txtEmail.value = "";
    txtPassword.value = "";
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snapshot => {
      this.setState({
        speed: snapshot.val()
      });
    });

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const btnSignup = document.getElementById('btnSignup');

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise
          .then(_ => this.resetAuthForm())
          .catch(e => console.log(e.message));
    });

    btnSignup.addEventListener('click', e => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise
        .then(_ => this.resetAuthForm())
        .catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
      } else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.speed}</h1>
        <div className="container">
          <input id="txtEmail" type="email" placeholder="Email"></input>
          <input id="txtPassword" type="password" placeholder="Password"></input>
          <button id="btnLogin" className="btn btn-action">Log in</button>
          <button id="btnSignup" className="btn btn-secondary">Sign up</button>
          <button id="btnLogout" className="btn btn-action hide">Log out</button>
        </div>
      </div>
    );
  }
}

export default App;
