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
    console.log('task a añadir', task)
    firestore.collection(`users/${userId}/tasks`)
        .add(task)
        .then(() => {
            console.log('añade')
            return dispatch({
                type: 'ADD_TASK',
                payload: task
            })
        })
        .catch(err => console.error(err))
        //.then(() => realtimeUpdate(userId, task.id))
}

export const checkTask = (userId, taskId) => dispatch => {
    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId)
            .get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().done) {
                        doc.ref.update({
                            done: false
                        }).then(() => {
                            return dispatch({
                                type: 'CHECK_TASK',
                                payload: doc.data()
                            })
                        })
                        
                    } else {
                        doc.ref.update({
                            done: true
                        }).then(() => {
                            return dispatch({ // se repite lo mismo
                                type: 'CHECK_TASK',
                                payload: doc.data()
                            })
                        })
                        
                    }
                })
                
            })
            .catch(err => console.error(err))
            //.then(() => realtimeUpdate(taskId))
}

export const editTask = (userId, taskToEdit) => dispatch => {
    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskToEdit.id)
            .get()
            .then( snapshot => {
                snapshot.forEach( doc => {
                    doc.ref.update({
                        task: taskToEdit.task,
                        priority: taskToEdit.priority,
                        reminder: taskToEdit.reminder
                    })
                });
                return dispatch({
                    type: 'EDIT_TASK',
                    payload: taskToEdit
                })
            })
            .catch(err => console.error(err))
            //.then(() => realtimeUpdate(userId, taskToEdit.id))

}

export const deleteTask = (userId, taskId) => dispatch => {

    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId)
        .get()
        .then( snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().done) {
                    doc.ref.delete()
                        .then(() => {
                            return dispatch({
                                type: 'DELETE_TASK',
                                payload: doc.data().id
                            })
                        }).catch(err => console.error(err))
                }
            })
        })
        .catch(err => console.error(err))
}

export const realtimeUpdate = (userId, taskId) => dispatch => {
    console.log('realtime update')
    firestore.collection(`users/${userId}/tasks`).where('id', '==', taskId ).onSnapshot( snapshot => {

        snapshot.docChanges().forEach( change => {
            switch (change.type) {
                case 'added':
                    return dispatch({
                        type: 'ADD_TASK',
                        payload: change.doc.data()
                    })
                case 'modified':
                console.log('fue modificado', change.doc.data())
                    return dispatch({
                        type: 'UPDATE_EDIT_TASK',
                        payload: change.doc.data()
                    })
                case 'removed':
                    return dispatch({
                        type: 'REMOVE_TASK',
                        payload: change.doc.data()
                    })
                default:
                    return
            }
        });
    })  
}