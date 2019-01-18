import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';

import { trueFalse, showEditModal } from '../../redux/actions/appAction';
import { editTask } from '../../redux/actions/taskAction';


class EditModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            task: '',
            priority: false,
            reminder: false,
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.taskToEdit)

        if (newProps.taskToEdit !== undefined) { 
            this.setState({
                id: newProps.taskToEdit.id,
                task: newProps.taskToEdit.task,
                priority: newProps.taskToEdit.priority,
                reminder: newProps.taskToEdit.reminder,
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
        this.props.editTask(this.props.userId, this.state)
        this.props.showEditModal(this.state)
    }

    render() {

        console.log(this.state)
        console.log(this.props.tasks)

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
    editModal: state.app.editModal.show,
    taskToEdit: state.app.editModal.taskToEdit,
    userId: state.user.userId,
    //for debugging
    tasks: state.tasks.tasksList
})

export default connect(mapStateToProps, { trueFalse, editTask, showEditModal })(EditModal)
