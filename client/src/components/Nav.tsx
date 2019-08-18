import React from "react";
import { connect } from "react-redux";
import { trueFalse } from "../redux/actions/appAction";

const Nav: React.FC<any> = props => {
  return (
    <div className="nav">
      <i
        className="fas fa-bars"
        onClick={() => props.trueFalse("slideMenu")}
      />
      <span className="logo">
        WeeklyPlanner<small className="color-red badge">Alpha</small>
      </span>
      <i className="fas fa-bell" onClick={() => console.log("click")} />
    </div>
  );
};

export default connect(
  null,
  { trueFalse }
)(Nav);
