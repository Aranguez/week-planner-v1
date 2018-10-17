import React, { Component, Fragment } from 'react'

// eslint-disable-next-line
import { firestore } from '../../firebase/config'

export default class AddModal extends Component {

    constructor(props){
        super();
        this.state = {
            task: '',
            priority: false,
            reminder: '',
            day: '',
            isOpen: props.isOpen
        }
    }

    componentWillReceiveProps({selectedDay, isOpen}){
        this.setState({
            day: selectedDay,
            isOpen,
        })
    }

    onChangeTask = (e) => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);

        this.setState({
            [e.target.name]: message
        })
    }

    addTask = (e) => { //add new task
        e.preventDefault();
        console.log(this.props)
        const { task, day } = this.state

        firestore.collection('users')
            .where('id', '==', this.props.userId)
            .get()
            .then( snapshot => {
                snapshot.forEach( doc => {
                    
                    firestore.collection(`users/${doc.id}/tasks`)
                        .add({
                            id: new Date().valueOf(),
                            task,
                            done: false,
                            day
                        })
                        .then(() => {
                            console.log('tarea creada')
                            this.props.getData(doc.id)
                        })
                        .catch(err => console.error(err))
                })
            }).catch(err => console.error(err))
        
        this.setState({ task: '' })
        this.props.showAddModal()
    }

    render() {
        return (
            <Fragment>
                <div className={`modal ${ this.props.isOpen ? "show animated fadeIn" : "hide" }`}>
                    <div className="modal-header">
                        <h2 className="modal-title">Add a Task</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e => this.addTask(e)}>
                            <span className={`length-counter ${this.state.task.length === 25 ? 'red' : this.state.task.length > 12 && 'orange'}`}>
                                    {this.state.task.length}/25 left
                            </span>
                            <input  type="text"
                                    name="task"
                                    value={this.state.task}
                                    onChange={e => this.onChangeTask(e)}
                                    placeholder="Write your task"
                                    maxLength="25"/>

                            <div className="row">
                                <div className="col col-6">
                                    <label htmlFor="priority">Reminder</label>
                                    <input  type="checkbox"
                                            name="priority"
                                            onChange={() => this.setState({priority: !this.state.priority})}/>
                                </div>
                                <div className="col col-6">
                                    <label htmlFor="priority">Priority</label>
                                    <input  type="checkbox"
                                            name="priority"
                                            onChange={() => this.setState({priority: !this.state.priority})}/>
                                </div>
                            </div>

                            <div className="flex flex-center">
                                <div>
                                    <button type="submit"
                                            className="btn btn-confirm">Add</button>
                                    <button type="button"
                                            onClick={() => this.props.showAddModal()}
                                            className="btn btn-cancel">Cancel</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className={`blackout ${ this.props.isOpen ? 'show' : 'hide' }`}></div>
            </Fragment>
        )
    }
}
