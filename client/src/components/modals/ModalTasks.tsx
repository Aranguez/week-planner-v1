import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { /*translate*/ Trans } from "react-i18next";

import { trueFalse, showEditModal } from "../../redux/actions/appAction";
import { checkTask, deleteTask } from "../../redux/actions/taskAction";

import AddModal from "./AddModal";
import EditModal from "./EditModal";

const ModalTasks: React.FC<any> = props => {
  const [modalTasks, setModalTasks] = useState({
    addModal: false,
    editModal: false,
    editTask: "",
    selectedDay: "",
    tasksOfDay: []
  })

  useEffect(() => {
    setModalTasks({
      ...modalTasks,
      selectedDay: props.selectedDay
    })
  }, [props.selectedDay])

  // const showAddModal = day => {
  //   setModalTasks({
  //     ...modalTasks,
  //     addModal: !modalTasks.addModal,
  //     selectedDay: day
  //   });
  // };

  // const showEditModal = task => {
  //   setModalTasks({
  //     ...modalTasks,
  //     editModal: !modalTasks.editModal,
  //     editTask: task
  //   });
  // };

  const tasksOfDay = props.tasks.filter(task => {
    return task.day === modalTasks.selectedDay; //puede ser mejor
  });
    
  return (
    <>
      <div className={`tasks-display animated show fadeIn`}>
        <div className="header col col-12">
          <h2 style={{ fontSize: "1.2em" }}>
            {props.selectedDay}
            {/* {props.t("home.taskFor", { day: props.selectedDay })} */}
          </h2>
          <div
            className="add-btn"
            onClick={() => props.trueFalse("addModal")}
          >
            <button type="button">
              <i className="fas fa-plus-circle" />
            </button>
          </div>
        </div>
        <div className="body">
          {tasksOfDay.length === 0 ? (
            <div className="row">
              <div className="col col-12">
                <h3>
                  <Trans i18nKey="home.itsEmpty">It's empty!</Trans>
                </h3>
                <p>
                  <Trans i18nKey="home.itsEmptyMessage">
                    There is no tasks for this day
                  </Trans>
                </p>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col col-12">
                {tasksOfDay.map((task, i) =>
                  !task.done ? (
                    <p key={i}>
                      <span className="delete-btn">
                        <i
                          className="far fa-square"
                          onClick={() =>
                            props.checkTask(props.userId, task.id)
                          }
                        />
                        <i
                          className="far fa-edit"
                          onClick={e => props.showEditModal(task)}
                        />
                      </span>
                      <input
                        type="text"
                        className="task-name"
                        id={task.id}
                        value={task.task}
                        readOnly
                      />
                    </p>
                  ) : (
                    <p key={i}>
                      <span className="delete-btn">
                        <i
                          className="far fa-check-square"
                          onClick={() =>
                            props.checkTask(props.userId, task.id)
                          }
                        />
                        <i
                          className="fa fa-trash"
                          onClick={() =>
                            props.deleteTask(props.userId, task.id)
                          }
                        />
                      </span>
                      <input
                        type="text"
                        className="task-name"
                        id={task.id}
                        value={task.task}
                        readOnly
                      />
                    </p>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <AddModal selectedDay={props.selectedDay} />
      <EditModal taskToEdit={modalTasks.editTask} />
    </>
  );
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasksList,
  userId: state.user.userId
});

const mapDispatchToProps = {
  trueFalse,
  showEditModal,
  checkTask,
  deleteTask
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
  //translate('common')
)(ModalTasks);
