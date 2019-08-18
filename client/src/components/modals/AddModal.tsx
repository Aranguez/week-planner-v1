import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { addTask } from "../../redux/actions/taskAction";
import { trueFalse } from "../../redux/actions/appAction";

//import { translate } from "react-i18next";

const AddModal: React.FC<any> = props => {
  const [modalState, setModalState] = useState({
    task: "",
    priority: false,
    reminder: "",
    day: ""
  });

  useEffect(() => {
    setModalState({
      ...modalState,
      day: props.selectedDay
    });
  }, [props]);

  const onChangeTask = e => {
    const { value, maxLength } = e.target;
    const message = value.slice(0, maxLength);

    setModalState({
      ...modalState,
      [e.target.name]: message
    });
  };

  const addTask = e => {
    e.preventDefault();
    const { task, day, priority, reminder } = modalState;
    let id = new Date().valueOf();

    const newTask = {
      id,
      task,
      done: false,
      priority,
      reminder,
      day
    };

    props.addTask(newTask, props.userId);
    props.trueFalse("addModal");
  };

  return (
    <Fragment>
      <div
        className={`modal ${props.addModal ? "show animated fadeIn" : "hide"}`}
      >
        <div className="modal-header">
          <h2 className="modal-title">Add a Task</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={addTask}>
            <span
              className={`length-counter ${
                modalState.task.length === 25
                  ? "red"
                  : modalState.task.length > 12 && "orange"
              }`}
            >
              {modalState.task.length}/25 left
            </span>
            <input
              type="text"
              name="task"
              value={modalState.task}
              onChange={onChangeTask}
              placeholder="Write your task"
              maxLength={25}
            />

            <div className="row">
              <div className="col col-6">
                <label htmlFor="priority">Reminder</label>
                <input
                  type="checkbox"
                  name="reminder"
                  // onChange={() =>
                  //   setModalState({
                  //     ...modalState,
                  //     reminder: !modalState.priority
                  //   })
                  // }
                />
              </div>
              <div className="col col-6">
                <label htmlFor="priority">Priority</label>
                <input
                  type="checkbox"
                  name="priority"
                  onChange={() => setModalState({ ...modalState, priority: !modalState.priority })}
                />
              </div>
            </div>

            <div className="flex flex-center">
              <div>
                <button type="submit" className="btn btn-confirm">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => props.trueFalse("addModal")}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={`blackout ${props.addModal ? "show" : "hide"}`} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  addModal: state.app.addModal,
  userId: state.user.userId
});

export default compose(
  connect(
    mapStateToProps,
    { addTask, trueFalse }
  ),
  //translate("common")
)(AddModal);
