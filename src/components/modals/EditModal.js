import React, { Fragment, Component } from 'react'

// eslint-disable-next-line
import { firestore } from '../../firebase/config'

export default class EditModal extends Component {

    constructor(props){
        super();
        this.state = {
            task: props.taskToEdit.task,
            priority: props.taskToEdit.priority,
            reminder: props.taskToEdit.reminder,
            isOpen: props.isOpen
        }
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps
    }*/
    

    /*getSnapshotBeforeUpdate(e){
        console.log(e)
    }

    componentDidUpdate(e){
        console.log(e)
        return null
    }*/

    componentWillReceiveProps(newProps){

        if (newProps.taskToEdit !== undefined) {
            this.setState({
                task: newProps.taskToEdit.task,
                priority: newProps.taskToEdit.priority,
                reminder: newProps.taskToEdit.reminder,
                isOpen: newProps.isOpen
            })
        } else {
            return 
        }
    }

    onChangeTask = e => {
        const { value, maxLength } = e.target;
        const task = value.slice(0, maxLength);

        this.setState({ task })
    }

    editTask = (e, id) => {
        e.preventDefault();

        firestore.collection(`users/${this.props.userId}/tasks`).where('id', '==', id)
            .get()
            .then( snapshot => {
                snapshot.forEach( doc => {
                    doc.ref.update({
                        task: this.state.task,
                        priority: this.state.priority,
                        reminder: this.state.reminder
                    })
                });
            })
            .then(this.props.realtimeUpdate(id))
            .catch(err => console.error(err))
        
        this.props.showEditModal()
    }

    render() {

        //console.log('EditModal renders')
        //console.log(this.state)

        console.log(this.state.taskToEdit)

        return (
            <Fragment>
                <div className={`modal ${ this.props.isOpen ? "show animated fadeIn" : "hide" }`}>
                    <div className="modal-header">
                        <h2 className="modal-title">Edit a Task</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e => this.editTask(e, this.props.taskToEdit.id)}>
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
                                    <label htmlFor="reminder">Reminder</label>
                                    <input  type="checkbox"
                                            name="reminder"
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
                                            className="btn btn-confirm">Save</button>
                                    <button type="button"
                                            onClick={() => this.props.showEditModal()}
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
