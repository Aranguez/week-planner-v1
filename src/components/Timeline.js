import React, { Component, Fragment } from 'react'

//componentes
import AddModal from './modals/AddModal'
import ModalTasks from './modals/ModalTasks';
import Day from './Day'

//firebase
import { firestore } from '../firebase/config'

//week data
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Timeline extends Component {

    constructor(){
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

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        firestore.collection('tasks')
        .get()
        .then(res => {
          const data = res.docs.map( task => task.data() )
          this.setState({
            data,
            tasksDays: data.map(item => {
                const task = {
                    day: item.day,
                    task: item.name
                }
                return task
            }),
            loading: false,
          })
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
                    { this.state.weekdays.map((day, i) => {
                        if (this.state.tasksDays[i] !== undefined) {
                            if (this.state.tasksDays[i].day.length > 0) {
                                return (
                                    <Day key={i}
                                        today={this.state.today}
                                        day={day}
                                        tasks={this.state.tasksDays[i].task}/>
                                )
                            } else {
                                return (
                                    <Day key={i}
                                        today={this.state.today}
                                        day={day}/>
                                )
                            }
                        } 
                    })}
                </div>

                <ModalTasks isOpen={this.state.modal}
                            day={this.state.selectedDay}
                            data={this.state.data}
                            getData={this.getData}/>

                <AddModal isOpen={this.state.modal}
                          onHandleModal={this.onHandleModal}
                          day={this.state.selectedDay}
                          getData={this.getData}
                          data={this.state.data}/>
            </Fragment>
        )
    }
}

export default Timeline

//modals

/*<ModalTasks isOpen={this.state.modal}
                               day={this.state.selectedDay}
                               data={this.state.data}
                               getData={this.getData}/>*/

                /*<AddModal  isOpen={this.state.modal}
                            onHandleModal={this.onHandleModal}
                            day={this.state.selectedDay}
                            getData={this.getData}
                            data={this.state.data}/>*/
