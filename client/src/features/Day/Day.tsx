import React from 'react';

const Day = props => { 

    const { tasks, engDay, day, today  } = props

    //pasar esta logica al state
    let undoneTasks = tasks.filter( task => task.day === engDay && !task.done );
    let doneTasks = tasks.filter(task => task.day === engDay && task.done)

    let undoneHeight = undoneTasks.length * 12;
    let doneHeight   = doneTasks.length * 12;

    return (
        <div className="box" id={day}>
            <div className={`day-box ${ today ? 'is-today' : '' /*|| over ? 'day-over' : ''*/ }`}
                    onClick={ () => props.onHandleModal(engDay, false) }>
                <span className='day'>
                    {day.substr(0,3)}
                    {today && <span className="is-today">today</span>}
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

export default Day

