import React, { Component } from 'react'

// eslint-disable-next-line
import { firestore } from '../../firebase/config'

import AddButton from '../reusable/AddButton';
import Button from '../reusable/Button';

export default class AddModal extends Component {

    constructor(props){
        super();
        this.state = {
            task: '',
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
        this.setState({
            [e.target.name]: e.target.value
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
            <div className={`modal ${ this.props.isOpen ? "show animated fadeIn" : "hide" }`}>
                <div className="modal-header">
                    <h2>Add a Task</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={e => this.addTask(e)}>
                        <input  type="text"
                                name="task"
                                value={this.state.task}
                                onChange={e => this.onChangeTask(e)}
                                placeholder="Your task"
                                maxLength="20"/>
                        <div>
                            <AddButton/>
                            <Button onClick={() => this.props.showAddModal() } title="CANCEL"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}
