import React, { PureComponent } from 'react'

class Day extends PureComponent { 

    render(){

        let undoneTasks = this.props.tasks.filter( task => 
            task.day === this.props.engDay && !task.done );
        let doneTasks = this.props.tasks.filter(task =>
            task.day === this.props.engDay && task.done)

        let undoneHeight = undoneTasks.length * 12;
        let doneHeight = doneTasks.length * 12;

        return (
            <div className={`box`} id={this.props.day}>
                <div className={`day-box ${ this.props.today ? 'is-today' : '' /*|| props.over ? 'day-over' : ''*/ }`}
                        onClick={ () => this.props.onHandleModal(this.props.engDay, false) }> {/* evitar crear funciones en render*/}
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
    
                { undoneTasks.length > 0 && (
                    <span className="task undone"
                            style={{'height': undoneHeight + '%'}}></span>) }
    
                { doneTasks.length > 0 && (
                    <span className="task done"
                        style={{'height': doneHeight + '%'}}></span>) }
            </div>
        )
    }
}

export default Day

