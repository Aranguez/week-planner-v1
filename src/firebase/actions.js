import { firestore } from '../firebase/config'

//functions of firebase
export const deleteTask = (doc) => {
    firestore
        .collection('tasks')
        .where('name', '==', doc.name)
        .get()
        .then( snapshot => {
                snapshot.forEach(function(doc) {
                doc.ref.delete();
            });
            this.props.getData()
        })
        .then(console.log('deleted !!'))
        .catch(err => console.error(err));
}

export const addTask = (task) => {
    firestore
        .collection('tasks')
        .add(task)
        .then(this.props.getData())
        .catch(err => console.error(err))
}

