import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { realtimeUpdate } from '../../redux/actions/taskAction';
import { trueFalse } from '../../redux/actions/appAction';

// eslint-disable-next-line
import { firestore } from '../../firebase/config'


class EditModal extends Component {

    constructor(props){
        super();
        this.state = {
            task: props.taskToEdit.task,
            priority: props.taskToEdit.priority,
            reminder: props.taskToEdit.reminder,
            isOpen: props.isOpen
        }
    }

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

    onChangeCheckbox = e => {
        const name = e.target.name
        this.setState( prevState => ({
            name: !prevState[name]
        }))
    }

    editTask = e => {
        e.preventDefault();

        firestore.collection(`users/${this.props.userId}/tasks`).where('id', '==', this.props.taskToEdit.id)
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
            .then(this.props.realtimeUpdate(this.props.taskToEdit.id))
            .catch(err => console.error(err))
        
        this.props.showEditModal()
    }

    render() {

        return (
            <Fragment>
                <div className={`modal ${ this.props.editModal ? "show animated fadeIn" : "hide" }`}>
                    <div className="modal-header">
                        <h2 className="modal-title">Edit a Task</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.editTask}>
                            <span className={`length-counter ${this.state.task.length === 25 ? 'red' : this.state.task.length > 12 && 'orange'}`}>
                                    {this.state.task.length}/25 left
                            </span>
                            <input  type="text"
                                    name="task"
                                    value={this.state.task}
                                    onChange={this.onChangeTask}
                                    placeholder="Write your task"
                                    maxLength="25"/>

                            <div className="row">
                                <div className="col col-6">
                                    <label htmlFor="reminder">Reminder</label>
                                    <input  type="checkbox"
                                            name="reminder"
                                            onChange={this.onChangeCheckbox}/>
                                </div>
                                <div className="col col-6">
                                    <label htmlFor="priority">Priority</label>
                                    <input  type="checkbox"
                                            name="priority"
                                            onChange={this.onChangeCheckbox}/>
                                </div>
                            </div>

                            <div className="flex flex-center">
                                <div>
                                    <button type="submit"
                                            className="btn btn-confirm">Save</button>
                                    <button type="button"
                                            onClick={() => this.props.trueFalse('editModal')}
                                            className="btn btn-cancel">Cancel</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className={`blackout ${ this.props.editModal ? 'show' : 'hide' }`}></div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    editModal: state.app.editModal,
    userId: state.user.userId
})

export default connect(mapStateToProps, { realtimeUpdate, trueFalse })(EditModal)
