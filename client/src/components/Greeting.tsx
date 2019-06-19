import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'

import { translate, Trans } from 'react-i18next';

const Greeting = props => {
    const user = props.userName.split(' ').splice(0,1)
    return (
        <h3 style={{'marginBottom': '40px'}}>
            <span className="color-red">{props.t('greeting.hello', { user: user })}</span><br/>
            <Trans i18nKey='greeting.message'>hope you have a great week</Trans>
        </h3>
    );
}

const mapStateToProps = state => ({
  userName: state.user.userName
})


export default compose(
    connect(mapStateToProps, null),
    translate('common')
    )(Greeting);
