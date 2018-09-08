import React from 'react';
import { deleteTask } from '../../firebase/actions';

const ModalTasks = (props) => {
    const showHideClass = props.isOpen ? "show" : "hide";
    const tasksOfDay = props.data.filter(task => task.day === props.day)

    return (
        <div className={`modal medium ${showHideClass}`}>
            <div className="modal-body">
            { tasksOfDay.length === 0 ?
                (<div>
                    <h3>It's empty!</h3>
                    <p>There is no tasks for this day :)</p>
                </div>)
                : 
                (<div>
                    <h3>You have Tasks!</h3>
                {tasksOfDay.map((task, i) => (
                    <p key={i}>
                        {task.name}
                        <span onClick={deleteTask.bind(this, task)}>&times;</span>
                    </p>
                ))}
                </div>)
            }
            </div>
        </div>
    );
}

export default ModalTasks;