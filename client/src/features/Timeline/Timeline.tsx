import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//componentes
import Day from "../Day/Day";
import Slider from "../Slider/Slider";
import ModalTasks from "../../components/modals/ModalTasks";
import { Task, User } from '../../types';

const todayDate = new Date().getDay(); //returns a number
//let today; //no tiene ninguna funcionalidad

// type weekDays = {
//   en: Object;
//   es: Object;
//   jp: Object;
// };

type TimelineProps = {
  dispatch: (action) => any;
  lang: String;
  loading: Boolean;
  tasks: Task[];
  user: User;
  weekDays: any;
};

const Timeline: React.FC<TimelineProps> = props => {
  const [timelineState, setTimelineState] = useState({
    today: "",
    weekDays: [],
    selectedDay: ""
  });

  useEffect(() => {
    switch (props.lang) {
      case "en":
        setTimelineState({
          ...timelineState,
          today: props.weekDays.en[todayDate],
          weekDays: props.weekDays.en
        });
        break;
      case "es":
        setTimelineState({
          ...timelineState,
          today: props.weekDays.en[todayDate],
          weekDays: props.weekDays.es
        });
        break;
      case "jp":
        setTimelineState({
          ...timelineState,
          today: props.weekDays.en[todayDate],
          weekDays: props.weekDays.jp
        });
        break;
      default:
        break;
    }
  }, [props.lang]);

  const showTasksModal = day => {
    setTimelineState({
      ...timelineState,
      selectedDay: day
    });
  };

  return (
    <>
      {!props.loading && (
        <Slider showTasksModal={showTasksModal} today={todayDate}>
          {timelineState.weekDays.map((day, i) => (
            <Day
              key={i}
              today={timelineState.today === props.weekDays.en[i]}
              over={todayDate > i ? true : false}
              day={day}
              engDay={props.weekDays.en[i]}
              tasks={props.tasks}
              onHandleModal={showTasksModal}
            />
          ))}
        </Slider>
      )}

      <ModalTasks
        userId={props.user.userId}
        selectedDay={timelineState.selectedDay || props.weekDays.en[todayDate]}
        showTasksModal={showTasksModal}
      />
    </>
  );
};

const mapStateToProps = state => ({
  weekDays: state.app.weekDays,
  lang: state.app.language,
  loading: state.app.loading,
  user: state.user,
  tasks: state.tasks.tasksList
});

export default connect(
  mapStateToProps,
  null
)(Timeline);
