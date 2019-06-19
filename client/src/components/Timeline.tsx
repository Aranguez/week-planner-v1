import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

//componentes
import Day from './Day'
import Slider from './Slider';
import ModalTasks from './modals/ModalTasks';

const todayDate = new Date().getDay() //returns a number
let today; //no tiene ninguna funcionalidad

class Timeline extends Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            today,
            weekDays: [],
            selectedDay: ''
        }
    }

    componentWillReceiveProps(newProps){
        switch (newProps.lang) {
            case 'en':
                this.setState({
                    today: this.props.weekDays.en[todayDate],
                    weekDays: this.props.weekDays.en,
                })
                break;
            case 'es':
                this.setState({
                    today: this.props.weekDays.en[todayDate],
                    weekDays: this.props.weekDays.es,
                })
                break;
            case 'jp':
                this.setState({
                    today: this.props.weekDays.en[todayDate],
                    weekDays: this.props.weekDays.jp,
                    
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
        const { today, selectedDay, weekDays } = this.state
        console.log('today', today);
        
        return (

            <Fragment>
                
                { !this.props.loading &&
                    <Slider showTasksModal={this.showTasksModal} today={todayDate}>
                        { weekDays.map((day, i) => (
                            <Day key={i}
                                 today={today === this.props.weekDays.en[i]}
                                 over={todayDate > i ? true : false}
                                 day={day}
                                 engDay={this.props.weekDays.en[i]}
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
    weekDays: state.app.weekDays,
    lang: state.app.language,
    loading: state.app.loading,
    user: state.user,
    tasks: state.tasks.tasksList
})


export default connect(mapStateToProps, null)(Timeline)
