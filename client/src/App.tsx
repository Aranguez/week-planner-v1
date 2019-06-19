import React, { Component } from "react";
import "./App.css";
import WeekPlanner from "./components/WeekPlanner";
import { translate } from "react-i18next";

class App extends Component<any, any> {
  render() {
    return <WeekPlanner />;
  }
}

export default translate("common")(App);
