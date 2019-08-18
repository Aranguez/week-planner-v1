import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { trueFalse, showEditModal } from "../../redux/actions/appAction";
import { editTask } from "../../redux/actions/taskAction";
import { Task } from '../../types';

type Props = {
  editModal: Boolean;
  editTask: (a, b) => void;
  showEditModal: (a) => void;
  taskToEdit: Task; //Task
  tasks: Task[]; //Task[]
  trueFalse: (a) => void;
  userId: String;
};

const EditModal: React.FC<Props> = ({
  taskToEdit,
  editTask,
  userId,
  showEditModal,
  editModal,
  trueFalse
}) => {
  const [modalState, setModalState] = useState({
    id: "",
    task: "",
    priority: false,
    reminder: false
  });

  useEffect(() => {
    if (taskToEdit !== undefined) {
      setModalState({
        id: taskToEdit.id,
        task: taskToEdit.task,
        priority: taskToEdit.priority,
        reminder: taskToEdit.reminder
      });
    } else {
      return;
    }
  }, [taskToEdit]);

  const onChangeTask = e => {
    const { value, maxLength } = e.target;
    const task = value.slice(0, maxLength);
    setModalState({ ...modalState, task });
  };

  const onChangeCheckbox = e => {
    const name = e.target.name;
    setModalState({
      ...modalState,
      [name]: !modalState[name]
    });
  };

  const onEditTask = e => {
    e.preventDefault();
    editTask(userId, modalState);
    showEditModal(modalState);
  };

  return (
    <>
      <div className={`modal ${editModal ? "show animated fadeIn" : "hide"}`}>
        <div className="modal-header">
          <h2 className="modal-title">Edit a Task</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={onEditTask}>
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
                <label htmlFor="reminder">Reminder</label>
                <input
                  type="checkbox"
                  name="reminder"
                  onChange={onChangeCheckbox}
                />
              </div>
              <div className="col col-6">
                <label htmlFor="priority">Priority</label>
                <input
                  type="checkbox"
                  name="priority"
                  onChange={onChangeCheckbox}
                />
              </div>
            </div>

            <div className="flex flex-center">
              <div>
                <button type="submit" className="btn btn-confirm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => trueFalse("editModal")}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={`blackout ${editModal ? "show" : "hide"}`} />
    </>
  );
};

const mapStateToProps = state => ({
  editModal: state.app.editModal.show,
  taskToEdit: state.app.editModal.taskToEdit,
  userId: state.user.userId,
  //for debugging
  tasks: state.tasks.tasksList
});

export default connect(
  mapStateToProps,
  { trueFalse, editTask, showEditModal }
)(EditModal);
