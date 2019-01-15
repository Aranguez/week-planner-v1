//firebase
import { firestore } from '../../firebase/config';
import firebase from 'firebase/app';

export const getUser = (userId, userName) => dispatch => {

    let id = '';

    firestore.collection('users').where('id', '==', userId)
        .get()
        .then( snapshot => {
            id = snapshot.docs[0].id
            if (snapshot.docs.length === 0) {
                console.log('usuario agregado')
            } else {
                return dispatch({
                    type: 'GET_USER',
                    payload: {
                        userId: id,
                        userName,
                    },
                })
            }
            return dispatch({
                type: 'GET_USER',
                payload: id
            })
            
        })
}

export const logOut = () => dispatch => {
    firebase.auth().signOut().then(() => {
                console.log('sesion terminada')
                return dispatch({
                    type: 'LOGOUT',
                    payload: null
                })
            })
}