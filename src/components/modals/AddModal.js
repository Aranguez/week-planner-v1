import React, { Component } from 'react'

// eslint-disable-next-line
import { firestore } from '../../firebase/config'

import ModalWrapper from './ModalWrapper'
import AddButton from '../reusable/AddButton';
import CancelButton from '../reusable/CancelButton';

export default class AddModal extends Component {

    constructor(props){ //data, isOpen, onHandleModal, day, getData
        super();
        this.state = {
            task: '',
            day: ''
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            day: newProps.day
        })
    }

    onChangeTask = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => { //add new task
        e.preventDefault();

        const task = {
            name: this.state.task,
            day: this.state.day
        }

        firestore
            .collection('tasks')
                .add(task)
                .then(this.props.getData())
                .catch(err => console.error(err))
        
        this.setState({ task: '' })
        this.props.onHandleModal()
    }

    render() {
        return (
            <ModalWrapper title="What is the task?"
                            isOpen={this.props.isOpen}>

                <form onSubmit={e => this.onSubmit(e)}>
                    <input  type="text"
                            name="task"
                            value={this.state.task}
                            onChange={e => this.onChangeTask(e)}/>
                    <AddButton/>
                    <CancelButton onClick={this.props.onHandleModal}/>
                </form>
            </ModalWrapper>
        )
    }
}
