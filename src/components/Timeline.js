import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

//componentes
import Day from './Day'
import Slider from './Slider';
import ModalTasks from './modals/ModalTasks';

//week data
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const esWeekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
const jpWeekdays = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];
const todayDate = new Date().getDay() //returns a number

let today;

class Timeline extends Component {

    constructor(props){
        super(props);
        this.state = {
            today,
            weekdays,
            selectedDay: ''
        }
    }

    componentWillReceiveProps(newProps){
        console.log('NUEVOS PROPS', newProps)
        switch (newProps.lang) {
            case 'en':
                this.setState({
                    weekdays: weekdays,
                    selectedDay: weekdays[todayDate]
                })
                break;
            case 'es':
                this.setState({
                    weekdays: esWeekdays,
                    selectedDay: esWeekdays[todayDate]
                })
                break;
            case 'jp':
                this.setState({
                    weekdays: jpWeekdays,
                    selectedDay: jpWeekdays[todayDate]
                })
                break;
            default:
                break;
        }
    }

    showTasksModal = day => {
        this.setState({
            selectedDay: day
        })
    }

    render() {
        const { today, selectedDay, weekdays } = this.state

        console.log(this.props.lang)

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
                            showTasksModal={this.showTasksModal}/>
            
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.app.language,
    loading: state.app.loading,
    user: state.user,
    tasks: state.tasks.tasksList
})


export default connect(mapStateToProps, null)(Timeline)
