import React from 'react';
import { connect } from 'react-redux';

const Greeting = ({ userName }) => {
    const user = userName.split(' ').splice(0,1)
    return (
        <h3 style={{'marginBottom': '40px'}}>
            <span className="color-red">Hello { user }</span><br/>
            <span>hope you have a great week</span>
        </h3>
    );
}

const mapStateToProps = (state) => ({
  userName: state.user.userName
})


export default connect(mapStateToProps, null)(Greeting);
