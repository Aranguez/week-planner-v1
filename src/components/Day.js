import React, { Component, Fragment } from 'react'
//import moment from 'moment'
import Modal from './Modal'
import ModalTasks from './ModalTasks';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const weekdays = [...days];

// moment()._locale._weekdays
//gets ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default class Day extends Component {

    constructor(props){
        super();
        this.state = {
            today: new Date().getDay(),
            weekdays,
            modal: false,
            selectedDay: '',
            tasksDays: []
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            tasksDays: newProps.data.map( task => task.day )
        })
    }

    onHandleModal = (day) => {
        this.setState({
            modal: !this.state.modal,
            selectedDay: day
        })
    }

    render() {

        return (
            <Fragment>
                <div className="timeline">
                    { this.state.weekdays.map( (day, i) => (
                        <Fragment>
                            <div key={i}
                                className='day-box'
                                onClick={() => this.onHandleModal(day)}>
                                { this.state.tasksDays.includes(day) &&
                                    <span className="task"></span>
                                }
                                <span className={ i === this.state.today ? 'is-today' : ''}>{day}</span>
                            </div>
                        </Fragment>
                    ))}
                </div>

                <ModalTasks isOpen={this.state.modal}
                            day={this.state.selectedDay}
                            data={this.props.data}
                            getData={this.props.getData}/>

                {/*<Modal isOpen={this.state.modal}
                       onHandleModal={this.onHandleModal}
                       day={this.state.selectedDay}
                       getData={this.props.getData}
                            data={this.props.data}/>*/}
            </Fragment>
        )
    }
}
