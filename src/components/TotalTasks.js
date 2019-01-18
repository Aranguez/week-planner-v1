import React from 'react';
import { connect } from 'react-redux';

const TotalTasks = props => {

    console.log(props.tasks)
    return (
        <div className="panel">
            <div>
                <h1>{ props.tasks.length }</h1>
                <span>total tasks</span>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasksList
})

export default connect(mapStateToProps, null)(TotalTasks);
