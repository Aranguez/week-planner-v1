import React, { Component } from 'react';
import { translate, Trans  } from 'react-i18next';

class Clock extends Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            hours: '',
            mins: '',
            secs: ''
        }
    }

    componentDidMount(){
        this.clock()
        setInterval( this.clock, 1000 );
    }

    clock = () => {
        let time = new Date();
        let hours: number = Math.abs(time.getHours() - 23);
        let mins: number = Math.abs(time.getMinutes() - 60);
        let secs: number = Math.abs(time.getSeconds() - 60);
    
        if (hours < 10) {
            hours = parseInt('0' + hours);
        }

        if (mins < 10) {
            mins = parseInt('0' + mins)
        }

        if (secs < 10) {
            secs = parseInt('0' + secs)
        }

        this.setState({
            hours,
            mins,
            secs
        })
    }
    
    render(){
        return (
            <div className="panel">
                <div>
                    <h1>
                        <span> {this.state.hours}</span>
                        <span>:{this.state.mins}</span>
                        <span>:{this.state.secs}</span>
                    </h1>
                    <Trans i18nKey='home.timeLeft'>to finish this day</Trans>
                </div>
            </div>
        );
    }
};

export default translate('common')(Clock)