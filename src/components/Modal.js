import React, { Component, Fragment } from 'react'

// eslint-disable-next-line
import config, { firestore } from '../firebase/config'

export default class Modal extends Component {

    constructor(props){ //data, isOpen, onHandleModal, day, getData
        super();
        this.state = {
            task: '',
        }
    }

    componentWillReceiveProps({isOpen, day}){
        this.setState({
            isOpen,
            day
        })
    }

    onChangeTask = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const task = {
            name: this.state.task,
            day: this.state.day
        }

        firestore.collection('tasks')
                    .add(task)
                    .then(this.props.getData())
                    .catch(err => console.error(err))
        
        this.setState({
            task: ''
        })
        
        this.props.onHandleModal()
    }

    render() {

        return (
            <Fragment>
                <div className={`modal medium ${this.state.isOpen ? 'show' : ''}`}>
                    <div className="modal-header">
                        <h1>What is the task?</h1>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e => this.onSubmit(e)}>
                            <input type="text" name="task" value={this.state.task} onChange={e => this.onChangeTask(e)}/>
                            <button type="submit" className="btn btn-success">ADD</button>
                            <button type="button" className="btn btn-danger" onClick={this.props.onHandleModal}>CANCEL</button>
                        </form>
                    </div>
                </div>
                <div className={`blackout ${this.state.isOpen === true  ? 'show' : ''}`}></div>
            </Fragment>
        
        )
    }
}
