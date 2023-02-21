import React from "react";
import { connect } from "react-redux";
import { trueFalse } from "../../redux/actions/appAction";

type NavProps = {
  trueFalse: (a: string) => void;
};

const Nav: React.FC<NavProps> = ({ trueFalse }) => (
  <div className="nav">
    <i className="fas fa-bars" onClick={() => trueFalse("slideMenu")} />
    <span className="logo">
      WeeklyPlanner<small className="color-red badge">Alpha</small>
    </span>
    <i className="fas fa-bell" onClick={() => console.log("click")} />
  </div>
);

export default connect(
  null,
  { trueFalse }
)(Nav);
