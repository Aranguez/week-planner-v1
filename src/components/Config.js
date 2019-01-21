import React, { Component } from 'react'

import { connect } from 'react-redux';
import { compose } from 'redux'

import { translate  } from 'react-i18next';
import { trueFalse, configure } from '../redux/actions/appAction';

class Config extends Component {

    constructor(props){
        super(props);
        this.state = {
            lang: '',
            dark: false
        }
    }

    submitChanges = e => {
        e.preventDefault();

        const { i18n } = this.props;
        i18n.changeLanguage(this.state.lang)
        this.props.configure(this.state.lang, this.state.dark)
        console.log('cambia a ', this.state.lang)
        this.props.trueFalse('config')
        this.props.trueFalse('slideMenu')
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        console.log(this.state)
        return (
        <form onSubmit={this.submitChanges} className={`config-panel animated ${this.props.show ? 'show' : 'hide'}`}>
            <h3 className="color-red"><b>Configuration</b></h3>
            <div className="list-item">
                <span>Language</span>
                <select name="lang" onChange={this.handleOnChange}>
                    <option defaultValue value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="jp">JP</option>
                </select>
            </div>
            <div className="list-item">
                <span>Dark theme</span>
                <select name="dark" onChange={this.handleOnChange}>
                    <option defaultValue={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>
            <button className="btn btn-confirm" type="submit">Apply</button>
            <button className="btn btn-cancel" type="button" onClick={() => this.props.trueFalse('config')}>Cancel</button>
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
