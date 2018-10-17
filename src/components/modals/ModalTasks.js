import React, { Component, Fragment } from 'react';

import AddModal from './AddModal';

import { firestore } from '../../firebase/config'

class ModalTasks extends Component {

    constructor(props){
        super();
        this.state = {
            loading: false,
            addModal: false,
            selectedDay: '',
            tasksOfDay: [],
            doneTasks: []
        }
    }

    componentWillReceiveProps({selectedDay, tasks}){
        this.setState({
            selectedDay,
            tasksOfDay: tasks.filter(task => task.day === selectedDay)
        })
    }

    finishTask = id => {
        firestore.collection('users')
            .where('id', '==', this.props.userId)
            .get()
            .then(snapshot => {
                snapshot.forEach( doc => {
                  firestore.collection(`users/${doc.id}/tasks`)
                    .where('id', '==', id)
                    .get()
                    .then( snapshot => {
                        snapshot.forEach(doc => {
                            if (doc.data().done) {
                                doc.ref.delete()
                            } else{
                                doc.ref.update({
                                    done: true
                                })
                            }
                        })
                    })
                    .then( () => this.props.getData(doc.id))
                    .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err))
    }

    undone = id => {
        firestore.collection('users')
            .where('id', '==', this.props.userId)
            .get()
            .then(snapshot => {
                snapshot.forEach( doc => {
                  firestore.collection(`users/${doc.id}/tasks`)
                    .where('id', '==', id)
                    .get()
                    .then( snapshot => {
                        snapshot.forEach(doc => {
                            doc.ref.update({
                                done: false
                            })
                        })
                    })
                    .then( () => this.props.getData(doc.id))
                    .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err))
    }

    edit = (e, id) => {
        e.preventDefault();
        /*const elem = document.getElementById(id);

        if(!elem.classList.contains('edit')){
            elem.classList.add('edit')
            elem.attributes.removeNamedItem('readonly')
        } else{
            elem.classList.remove('edit')
            elem.setAttribute('readonly', true)
        }*/
    }

    showAddModal = (day) => {
        this.setState({
            addModal: !this.state.addModal,
            selectedDay: day
        })
    }

    render(){
        return (
            <Fragment>
                <div className={`tasks-display animated ${ this.props.isOpen ? "show fadeIn" : "hide" }`}>
                    <div className="header col col-12">
                        <h2 style={{'fontSize': '1.2em'}}>Tasks for <span className="color-red">{this.props.selectedDay}</span></h2>
                        <div className="add-btn" onClick={ () => this.showAddModal() }>
                            <button type="button">
                                    <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="body">
                    { this.state.tasksOfDay.length === 0 ?
                        (<div className="row">
                            <div className="col col-12">
                                <h3>It's empty!</h3>
                                <p>There is no tasks for this day</p>
                            </div>
                        </div>)
                        : (
                        <div className="row">
                            <div className="col col-12">
                            {this.state.tasksOfDay.map((task, i) => (
                                !task.done ? (
                                    <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-square"
                                               onClick={() => this.finishTask(task.id)}></i>
                                            <i className="far fa-edit"
                                               onClick={e => this.edit(e, task.id)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ) : <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-check-square"
                                               onClick={() => this.undone(task.id)}></i>
                                            <i className="fa fa-trash"
                                               onClick={() => this.finishTask(task.id)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                    )}
                        
                    </div>
                </div>
    
                {/* ADD TASK MODAL */}
                <AddModal isOpen={this.state.addModal}
                          userId={this.props.userId}
                          selectedDay={this.props.selectedDay}
                          showAddModal={this.showAddModal}
                          getData={this.props.getData}/>

            </Fragment>
        );
    }
}

export default ModalTasks;