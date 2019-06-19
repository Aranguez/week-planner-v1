import React, { Component, ChangeEvent } from 'react'

import { connect } from 'react-redux';
import { compose } from 'redux';

import { translate, Trans } from 'react-i18next';
import { trueFalse, configure } from '../redux/actions/appAction';

class Config extends Component<any, IConfigState> {

    constructor(props){
        super(props);
        this.state = {
            lang: '',
            dark: false
        }
    }

    submitChanges = (e) => {
        e.preventDefault();
        this.props.i18n.changeLanguage(this.state.lang);
        this.props.configure(this.state.lang, this.state.dark);
        this.props.trueFalse('config');
        this.props.trueFalse('slideMenu');
    }

    handleOnChange = (e: ChangeEvent) => {
        const element = e.target as HTMLElement;
        this.setState({
            [element.name]: element.value,
        })
    }

    render() {
        return (
        <form onSubmit={this.submitChanges} className={`config-panel animated ${this.props.show ? 'show' : 'hide'}`}>
            <h3 className="color-red"><b><Trans i18nKey="slideMenu.configuration">Configuration</Trans></b></h3>
            <div className="list-item">
                <span><Trans i18nKey="configuration.language">Language</Trans></span>
                <select name="lang" onChange={this.handleOnChange}>
                    <option defaultValue="en">EN</option>
                    <option value="es">ES</option>
                    <option value="jp">JP</option>
                </select>
            </div>
            <div className="list-item">
                <span><Trans i18nKey="configuration.darkTheme">Dark theme</Trans></span>
                <select name="dark" onChange={this.handleOnChange}>
                    <option selected defaultValue="no">
                        <Trans i18nKey="configuration.no">No</Trans>
                    </option>
                    <option value="yes">
                        <Trans i18nKey="configuration.yes">Yes</Trans>
                    </option>
                </select>
            </div>
            <button
                className="btn btn-confirm"
                type="submit">
                    <Trans i18nkey="button.apply">Apply</Trans>
            </button>
            <button
                className="btn btn-cancel"
                type="button" onClick={() => this.props.trueFalse('config')}>
                    <Trans i18nkey="button.cancel">Cancel</Trans>
            </button>
        </form>
        )
    }
}

const mapStateToProps = state => ({
    show: state.app.config
})


export default compose(
    connect(mapStateToProps, { trueFalse, configure }),
    translate('common')
)(Config);

interface IConfigState {
    lang: string,
    dark: boolean
}

interface IConfigProps {
    
}