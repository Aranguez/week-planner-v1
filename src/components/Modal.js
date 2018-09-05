import React, { Component, Fragment } from 'react'

// eslint-disable-next-line
import config, { firestore } from '../firebase/config'

export default class Modal extends Component {

    constructor(props){
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
                <div className={`modal medium ${this.state.isOpen === true ? 'show' : ''}`}>
                    <div className="modal-header">
                        <h1>Cuál es la tarea?</h1>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e => this.onSubmit(e)}>
                            <input type="text" name="task" value={this.state.task} onChange={e => this.onChangeTask(e)}/>
                            <button type="submit" className="btn btn-success">Agregar</button>
                            <button type="button" className="btn btn-danger" onClick={this.props.onHandleModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
                <div className={`blackout ${this.state.isOpen === true  ? 'show' : ''}`}></div>
            </Fragment>
        
        )
    }
}
