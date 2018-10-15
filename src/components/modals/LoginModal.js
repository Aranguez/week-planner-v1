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
                <div className="modal-header">
                    <div className="row">
                        <div className="col col-12">
                            <h2><span>Login</span></h2>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col col-12">
                                <input type="text" placeholder="Correo electrónico"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-12">
                                <input type="text" placeholder="Contraseña"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-6">
                                <button className="btn btn-success"
                                        onClick={e => e.preventDefault()}>Login</button>
                            </div>
                            <div className="col col-6">
                                <button className="btn btn-danger"
                                        onClick={e => e.preventDefault()}>Register</button>
                            </div>
                        </div>

                    </form>
                    <hr style={{'marginTop': '20px', 'opacity': '.5'}}/>
                    <div className="row">
                        <div className="col col-6">
                            <button type="button"
                                    className="btn facebook"
                                    onClick={() => this.login(FacebookProvider)}>
                                        <i className="fab fa-facebook-f"></i> facebook
                            </button>
                        </div>
                        <div className="col col-6">
                            <button type="button"
                                    className="btn google"                                
                                    onClick={() => this.login(GoogleProvider)}>
                                        <i className="fab fa-google"></i> Google
                            </button>
                        </div>
                    </div>
                </div>
                {/*<div className="shadow"></div>*/}
            </div>
        )
    }
        
}

export default LoginModal
