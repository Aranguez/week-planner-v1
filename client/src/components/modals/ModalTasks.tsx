import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate, Trans } from 'react-i18next';

import { trueFalse, showEditModal } from '../../redux/actions/appAction';
import { checkTask, deleteTask } from '../../redux/actions/taskAction';

import AddModal from './AddModal';
import EditModal from './EditModal';

class ModalTasks extends Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            addModal: false,
            editModal: false,
            editTask: '',
            selectedDay: '',
            tasksOfDay: []
        }
    }
    
    componentWillReceiveProps({selectedDay}){
        this.setState({
            selectedDay
        })
    }

    showAddModal = (day) => {
        this.setState({
            addModal: !this.state.addModal,
            selectedDay: day
        })
    }

    showEditModal = task => {
        this.setState({
            editModal: !this.state.editModal,
            editTask: task,
        })
    }

    render(){
        const tasksOfDay = this.props.tasks.filter(task => {
            return task.day === this.state.selectedDay //puede ser mejor
        })

        return (
            <Fragment>
                <div className={`tasks-display animated show fadeIn`}>
                    <div className="header col col-12">
                        <h2 style={{'fontSize': '1.2em'}}>
                            {this.props.t('home.taskFor', { day:this.props.selectedDay })}</h2>
                        <div className="add-btn" onClick={() => this.props.trueFalse('addModal') }>
                            <button type="button">
                                    <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="body">
                    { tasksOfDay.length === 0 ?
                        (<div className="row">
                            <div className="col col-12">
                                <h3><Trans i18nKey="home.itsEmpty">It's empty!</Trans></h3>
                                <p><Trans i18nKey="home.itsEmptyMessage">There is no tasks for this day</Trans></p>
                            </div>
                        </div>)
                        : (
                        <div className="row">
                            <div className="col col-12">
                            {tasksOfDay.map((task, i) => (
                                !task.done ? (
                                    <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-square"
                                               onClick={() => this.props.checkTask(this.props.userId, task.id)}></i>
                                            <i className="far fa-edit"
                                               onClick={e => this.props.showEditModal(task)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ) : <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-check-square"
                                               onClick={() => this.props.checkTask(this.props.userId, task.id)}></i>
                                            <i className="fa fa-trash"
                                               onClick={() => this.props.deleteTask(this.props.userId, task.id)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                    )}
                        
                    </div>
                </div>

                <AddModal selectedDay={this.props.selectedDay}/>
                <EditModal taskToEdit={this.state.editTask}/>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasksList,
    userId: state.user.userId
})

const mapDispatchToProps = {
    trueFalse,
    showEditModal,
    checkTask,
    deleteTask
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate('common')
)(ModalTasks);