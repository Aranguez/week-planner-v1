import React, { Component } from 'react'

import { connect } from 'react-redux';
import { trueFalse, configure } from '../redux/actions/appAction';

class Config extends Component {

    constructor(props){
        super(props);
        this.state = {
            lang: 'EN',
            dark: false
        }
    }

    submitChanges = e => {
        e.preventDefault();
        this.props.configure(this.state)
        this.props.trueFalse('config')
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
                    <option defaultValue="EN">EN</option>
                    <option value="ES">ES</option>
                    <option value="JP">JP</option>
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


export default connect(mapStateToProps, { trueFalse, configure })(Config);
