import React from 'react'

import firebase from 'firebase/app';
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider()

const login = provider => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        return firebase.auth().signInWithPopup(provider).then( result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            var user = result.user;

            this.props.getUser(user.uid, user.displayName)

            }).catch(err => console.error(err))
    }).catch(err => console.error(err))
}

//COMPONENTE
const LoginModal = (props) => (
        <div className={`modal ${ props.isOpen ? "show animated fadeIn" : "hide" }`}>
            <div className="row">
                <div className="col col-6">
                    <button type="button" onClick={() => login(FacebookProvider)}>facebook</button>
                </div>
                <div className="col col-6">
                    <button type="button" onClick={() => login(GoogleProvider)}>Google</button>
                </div>
            </div>
        </div>
)

export default LoginModal
