import React from 'react'

//componentes
//import AddModal from './modals/AddModal'
//import ModalTasks from './modals/ModalTasks';

const Day = props => {
    // eslint-disable-next-line
    this.state = {
        modal: false,
    }
        
    return (
        <div className="day-box">
            { props.tasks &&
            <span className="task"></span> }
            <span className={ props.today === props.day ? 'is-today' : '' }>{props.day}</span>
        </div>
    )
}

export default Day

