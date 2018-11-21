import React, { Component, Fragment } from 'react'

//componentes
import Day from './Day'
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

    showTasksModal = (day, close) => {

        this.setState({
            tasksModal: true,
            selectedDay: day
        })
        
        document.querySelectorAll('.box')
                .forEach( item => {
                    item.classList.remove('active-day')
                })
        
        const el = document.querySelector(`#${day}`)

        if (el.classList.contains('active-day') || close) {
            el.classList.remove('active-day')
        } else{
            el.classList.add('active-day')
        }
    }

    render() {

        //console.log('Timeline renders');

        const { 
            today,
            tasksModal,
            selectedDay,
            weekdays,
        } = this.state

        return (

            <Fragment>

                    
                { this.props.loading &&
                    <div className="loading animated fadeIn">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>    
                }
                
                { !this.props.loading &&
                    <div className="slider">
                        <div className="timeline animated slideInUp">
                            { weekdays.map((day, i) => (
                            <Day key={i}
                                today={today === day}
                                over={todayDate > i ? true : false}
                                day={day}
                                tasks={this.props.tasksDays}
                                onHandleModal={this.showTasksModal}/>
                            ))} 
                        </div>
                    </div>
                    
                }

                <ModalTasks isOpen={tasksModal}
                            userId={this.props.userId}
                            selectedDay={selectedDay}
                            tasks={this.props.tasksDays}
                            getData={this.props.getData}
                            showTasksModal={this.showTasksModal}
                            realtimeUpdate={this.props.realtimeUpdate}/>
            
            </Fragment>
        )
    }
}

export default Timeline
