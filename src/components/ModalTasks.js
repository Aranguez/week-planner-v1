import React, { Component } from 'react';
import { firestore } from '../firebase/config'

class ModalTasks extends Component {
    
    deleteTask = (doc) => {
        //console.log(firestore.collection('tasks').doc(doc.name))

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

        /*firestore
            .collection('tasks')
            .get()
            .then(res => {
                console.log(res)
                res.docs.map( task => {
                    if(task.data().name === doc.name){
                        console.log('must delete')
                        //task.data().delete().then(console.log('deleted'))
                        task.data().delete().then(console.log('deleted'))
                    }
                })
                
            })
            .catch(err => console.error(err))*/
    }

    render(){
        const tasksOfDay = this.props.data.filter(task => task.day === this.props.day)
        return (
            <div className={`modal medium ${ this.props.isOpen ? 'show' : ''}`}>
                <div className="modal-body">
                { tasksOfDay.length === 0 ?
                  (<div>
                    <h3>It's empty!</h3>
                    <p>There is no tasks for this day :)</p>
                  </div>)
                   : 
                  (<div>
                    <h3>You have Tasks!</h3>
                    {tasksOfDay.map((task, i) => (
                        <p key={i}>{task.name} <span onClick={this.deleteTask.bind(this, task)}>&times;</span></p>
                    ))}
                  </div>)}

                </div>
            </div>
        );
    }
}

export default ModalTasks;