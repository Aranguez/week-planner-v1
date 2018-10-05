import React, { Component } from 'react'

class Day extends Component { 

    constructor(props){
        super();
        this.state = { //repensar
            tasks: props.tasks,
            day: props.day
        }   
    }

    componentWillReceiveProps(newProps){ //evitar esto
        this.setState({
            tasks: newProps.tasks
        })
    }
    
    render(){
        let undoneTasks = []
        let doneTasks = []

        if (this.state.tasks.length > 0){
            undoneTasks = this.state.tasks.filter(task => task.day === this.state.day && !task.done)
            doneTasks = this.state.tasks.filter(task => task.day === this.state.day && task.done)
        }
            

        let height = undoneTasks.length*12;
        return (
            <div className="box" id={this.props.day}>
                <div className={`day-box ${ this.props.today ? 'is-today' : '' }`}
                     onClick={ () => this.props.onHandleModal(this.props.day, false) }>
                    <span className='day'>
                        {this.props.day.substr(0,3)}
                        {this.props.today && <span className="is-today">today</span>}
                    </span>

                    <span className="max-tasks"
                          style={{'color': `${undoneTasks.length >= 7 ? '#FF3A69' : '#ccc'}`}}>
                          max</span>
                    <span className="undone-tasks"
                          style={{'color': `${undoneTasks.length === 0 ? '#ccc' : '#FF3A69'}`}}>
                          {undoneTasks.length}</span>
                    <span className="done-tasks"
                          style={{'color': `${doneTasks.length === 0 ? '#ccc' : '#00cf6f'}`}}>
                          {doneTasks.length}</span>

                </div>
                { undoneTasks.length > 0 && (<span className="task" style={{'height': height + '%'}}></span>) }
            </div>
        )
    }
    
}

export default Day

