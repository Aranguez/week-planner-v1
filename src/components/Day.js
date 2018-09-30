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
        let tasks = []
        if (this.state.tasks.length > 0)
            tasks = this.state.tasks.filter(task => {
                return task.day === this.state.day && !task.done
            })

        let height = tasks.length*12;
        return (
            <div className="box" id={this.props.day}>
                <div className={`day-box ${ this.props.today ? 'is-today' : '' }`}
                     onClick={ () => this.props.onHandleModal(this.props.day, false) }>
                    <span className='day'>{this.props.day.substr(0,3)}</span>
                </div>
                { tasks.length > 0 && (<span className="task" style={{'height': height + '%'}}></span>) }
            </div>
        )
    }
    
}

export default Day

