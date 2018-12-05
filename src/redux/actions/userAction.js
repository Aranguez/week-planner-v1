//firebase
import { firestore } from '../../firebase/config';
import firebase from 'firebase/app';

export const getUser = () => {
    return dispatch => { //no entra a la funcion
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                firestore.collection('users').where('id', '==', user.uid)
                    .get()
                    .then( snapshot => {
                        if (snapshot.docs.length === 0) {
                            console.log('usuario agregado')
                        } else {
                            console.log('dispatch')
                            dispatch({
                                type: 'GET_USER',
                                userId: snapshot.docs[0].id,
                            })
                        }
                        return dispatch({
                            type: 'GET_USER',
                            userId: snapshot.docs[0].id,
                        })
                    })
                    .catch(err => console.error('error al encontrar usuario', err))
            }
        });
    }
}

export const getData = data => ({
    type: 'GET_USER_DATA',
    data
})