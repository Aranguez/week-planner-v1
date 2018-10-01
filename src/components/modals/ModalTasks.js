import React, { Component, Fragment } from 'react';

import Button from '../reusable/Button'
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
        console.log(id)
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

    

    showAddModal = (day) => {
        this.setState({
            addModal: !this.state.addModal,
            selectedDay: day
        })
    }

    render(){
        return (
            <Fragment>
                <div className={`modal animated ${ this.props.isOpen ? "show fadeIn" : "hide" }`}>
                    <div className="modal-header col col-12">
                        <h2>Tasks for {this.props.selectedDay}</h2>
                        <div className="add-btn" onClick={ () => this.showAddModal() }>
                            <span>Add a Task</span>
                            <button type="button">
                                    <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                    { this.state.tasksOfDay.length === 0 ?
                        (<div className="row">
                            <div className="col col-12">
                                <h3>It's empty!</h3>
                                <p>There is no tasks for this day</p>
                            </div>
                        </div>)
                        : (
                        <div className="row">
                            <div className="col col-6">
                            <h4>Todo List</h4>
                            {this.state.tasksOfDay.map((task, i) => (
                                !task.done && (
                                    <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-square" onClick={() => this.finishTask(task.id)}></i>
                                            <i className="far fa-edit"></i>
                                        </span>
                                        <span> {task.task}</span>
                                    </p>
                                )
                                
                                ))
                            }
                            </div>
                            <div className="col col-6">
                            <h4>Done Tasks</h4>
                            {this.state.tasksOfDay.map((task, i) => (
                                    task.done && (
                                    <p key={i}>
                                        <span className="clear-task">
                                            <i className="fas fa-check-square" onClick={() => this.undone(task.id)}></i>
                                            <span onClick={() => this.finishTask(task.id)}
                                                  className="clear">{task.task}</span>
                                        </span>
                                    </p>
                            )))
                            }
                            </div>
                        </div>
                    )}
                        <div className="row">
                            <div className="col col-12">
                                <Button onClick={() => this.props.showTasksModal(this.props.selectedDay, true) }  title="close"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/*<div className={`blackout ${ this.props.isOpen ? 'show' : 'hide' }`}></div>*/}
    
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