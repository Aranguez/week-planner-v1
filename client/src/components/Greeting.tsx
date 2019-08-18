import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useTranslation, Trans } from 'react-i18next';

const Greeting: React.FC<any> = props => {
  const [t/*, i18n*/] = useTranslation();
  const user = props.userName.split(" ").splice(0, 1);
  return (
    <h3 style={{ marginBottom: "40px" }}>
      <span className="color-red">
        {user}
        {t("greeting.hello", { user: user })}
      </span>
      <br />
      <Trans i18nKey="greeting.message">hope you have a great week</Trans>
    </h3>
  );
};

const mapStateToProps = state => ({
  userName: state.user.userName
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  //withTranslation('common')
)(Greeting);
