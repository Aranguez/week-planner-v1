import React from 'react';

const TotalTasks = props => {
    return (
        <div className="panel">
            <div>
                <h1>{ props.tasksDays.length }</h1>
                <span>total tasks</span>
            </div>
        </div>
    );
}

export default TotalTasks;
