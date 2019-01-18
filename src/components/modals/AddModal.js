import React, { Fragment, Component } from 'react'

import { connect } from 'react-redux';
import { addTask } from '../../redux/actions/taskAction';
import { trueFalse } from '../../redux/actions/appAction';

class AddModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: '',
            priority: false,
            reminder: '',
            day: '',
            isOpen: props.isOpen
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            day: newProps.selectedDay
        })
    }

    onChangeTask = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);

        this.setState({
            [e.target.name]: message
        })
    }

    addTask = e => {
        e.preventDefault();
        const { task, day, priority, reminder } = this.state
        let id = new Date().valueOf()

        const newTask = {
            id,
            task,
            done: false,
            priority,
            reminder,
            day
        }

        this.props.addTask(newTask, this.props.userId)
        this.props.trueFalse('addModal')
    }

    render() {

        return (
            <Fragment>
                <div className={`modal ${ this.props.addModal ? "show animated fadeIn" : "hide" }`}>
                    <div className="modal-header">
                        <h2 className="modal-title">Add a Task</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.addTask}>
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
                                    <label htmlFor="priority">Reminder</label>
                                    <input  type="checkbox"
                                            name="priority"
                                            onChange={() => this.setState({reminder: !this.state.priority})}/>
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
                                            onClick={() => this.props.trueFalse('addModal')}
                                            className="btn btn-cancel">Cancel</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className={`blackout ${ this.props.addModal ? 'show' : 'hide' }`}></div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  addModal: state.app.addModal,
  userId: state.user.userId
})


export default connect(mapStateToProps, { addTask, trueFalse })(AddModal);