import React, { Component, Fragment } from 'react'
//import moment from 'moment'
import Modal from './Modal'

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
            data: [],
            tasksDays: []
        }
    }

    componentWillReceiveProps(newProps){
        this.setState(prevState => ({
            data: [...prevState.data, ...newProps.data],
            tasksDays: newProps.data.map( task => task.day )
        }))
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
                        <div key={i}
                             className='day-box'
                             onClick={() => this.onHandleModal(day)}>
                             { this.state.tasksDays.includes(day) &&
                                <span className="task"></span>
                             }
                             <span className={ i === this.state.today ? 'is-today' : ''}>{day}</span>
                        </div>
                    ))}
                </div>
                <Modal isOpen={this.state.modal}
                       onHandleModal={this.onHandleModal}
                       day={this.state.selectedDay}
                       getData={this.props.getData}/>
            </Fragment>
        )
    }
}
