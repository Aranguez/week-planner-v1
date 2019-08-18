import React, { useState } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { /*translate*/ Trans } from "react-i18next";
import { trueFalse, configure } from "../redux/actions/appAction";

type ConfigProps = {
  configure: (a, b) => void;
  show: Boolean;
  trueFalse: (a: string) => void;
}

const Config: React.FC<ConfigProps> = ({ trueFalse, show, configure }) => {
  const [configState, setConfigState] = useState({
    lang: "",
    dark: false
  });

  const submitChanges = e => {
    e.preventDefault();
    // props.i18n.changeLanguage(configState.lang);
    configure(configState.lang, configState.dark);
    trueFalse("config");
    trueFalse("slideMenu");
  };

  const handleOnChange = e => {
    setConfigState({
      ...configState,
      [e.target.name]: e.target.value
    })
  };

  return (
    <form
      onSubmit={submitChanges}
      className={`config-panel animated ${show ? "show" : "hide"}`}
    >
      <h3 className="color-red">
        <b>
          <Trans i18nKey="slideMenu.configuration">Configuration</Trans>
        </b>
      </h3>
      <div className="list-item">
        <span>
          <Trans i18nKey="configuration.language">Language</Trans>
        </span>
        <select name="lang" onChange={handleOnChange}>
          <option defaultValue="true" value="en">
            EN
          </option>
          <option value="es">ES</option>
          <option value="jp">JP</option>
        </select>
      </div>
      <div className="list-item">
        <span>
          <Trans i18nKey="configuration.darkTheme">Dark theme</Trans>
        </span>
        <select name="dark" onChange={handleOnChange}>
          <option defaultValue="false">
            <Trans i18nKey="configuration.no">No</Trans>
          </option>
          <option value="true">
            <Trans i18nKey="configuration.yes">Yes</Trans>
          </option>
        </select>
      </div>
      <button className="btn btn-confirm" type="submit">
        {/* <Trans i18nkey="button.apply">Apply</Trans> */}
      </button>
      <button
        className="btn btn-cancel"
        type="button"
        onClick={() => trueFalse("config")}
      >
        {/* <Trans i18nkey="button.cancel">Cancel</Trans> */}
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  show: state.app.config
});

export default compose(
  connect(
    mapStateToProps,
    { trueFalse, configure }
  ),
  //translate('common')
)(Config);
