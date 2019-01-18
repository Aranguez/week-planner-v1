import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

//componentes
import Day from './Day'
import Slider from './Slider';
import ModalTasks from './modals/ModalTasks';

//week data
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayDate = new Date().getDay() //returns a number
const today = weekdays[todayDate]

class Timeline extends Component {

    constructor(props){
        super(props);
        this.state = {
            today,
            weekdays,
            selectedDay: ''
        }
    }

    showTasksModal = day => {
        this.setState({
            selectedDay: day
        })
    }

    render() {
        const { today, selectedDay, weekdays } = this.state

        return (

            <Fragment>
                
                { !this.props.loading &&
                    <Slider showTasksModal={this.showTasksModal}>
                        { weekdays.map((day, i) => (
                            <Day key={i}
                                 today={today === day}
                                 over={todayDate > i ? true : false}
                                 day={day}
                                 tasks={this.props.tasks}
                                 onHandleModal={this.showTasksModal}/>
                            ))} 
                    </Slider>
                    
                }

                <ModalTasks userId={this.props.user.userId}
                            selectedDay={selectedDay}
                            tasks={this.props.tasks}
                            showTasksModal={this.showTasksModal}/>
            
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.app.loading,
    user: state.user,
    tasks: state.tasks
})


export default connect(mapStateToProps, null)(Timeline)
