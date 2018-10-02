import React, { Component } from 'react'

import firebase from 'firebase/app';
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider()

//COMPONENTE
class LoginModal extends Component {

    login = provider => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return firebase.auth().signInWithPopup(provider).then( result => {
                var user = result.user;
                this.props.getUser(user.uid, user.displayName)
    
                }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }

    render(){
        return (
            <div className={`modal ${ this.props.isOpen ? "show animated fadeIn" : "hide" }`}>
                <div className="row">
                    <div className="col col-6">
                        <button type="button" onClick={() => this.login(FacebookProvider)}>facebook</button>
                    </div>
                    <div className="col col-6">
                        <button type="button" onClick={() => this.login(GoogleProvider)}>Google</button>
                    </div>
                </div>
            </div>
        )
    }
        
}

export default LoginModal
