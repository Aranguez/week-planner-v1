import { firestore } from '../../firebase/config';

export const getTasks = userId => dispatch => {
    firestore.collection('users').where('id', '==', userId)
        .get()
        .then( snapshot => {
            firestore.collection(`users/${snapshot.docs[0].id}/tasks`)
                .get()
                .then(snapshot => {
                    let data = []
                    snapshot.forEach( doc => {
                        data.push(doc.data())
                    })

                    return dispatch({
                        type: 'GET_TASKS',
                        payload: data
                    })
                })
                .catch(err => console.error(err))
        })
}

export const addTask = (task, userId) => dispatch => {
    firestore.collection(`users/${userId}/tasks`)
        .add(task)
        .then(() => {
            return realtimeUpdate(userId, task.id)
        })
        .catch(err => console.error(err))
}

export const checkTask = (userId, taskId) => {
    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId)
            .get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().done) {
                        doc.ref.update({
                            done: false
                        })
                    } else {
                        doc.ref.update({
                            done: true
                        })
                    }
                })
            })
            .then( realtimeUpdate(taskId) )
            .catch(err => console.error(err))
}

export const deleteTask = (userId, taskId) => {

    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId)
        .get()
        .then( snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().done) {
                    doc.ref.delete()
                        .then(() => {
                            realtimeUpdate(userId, taskId)
                        }).catch(err => console.error(err))
                }
            })
        })
        .catch(err => console.error(err))
}

export const realtimeUpdate = (userId, taskId) => {
    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId ).onSnapshot( snapshot => {

        snapshot.docChanges().forEach( change => {
            switch (change.type) {
                case 'added':
                    return {
                        type: 'ADD_TASK',
                        payload: change.doc.data()
                    }
                case 'modified':
                    return {
                        type: 'EDIT_TASK',
                        payload: change.doc.data()
                    }
                case 'removed':
                    return {
                        type: 'REMOVE_TASK',
                        payload: change.doc.data()
                    }
                default:
                    return
            }
        });
    })  
}