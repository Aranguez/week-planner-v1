import React from 'react';

const Greeting = ({ user }) => {
    return (
        <h3 style={{'marginBottom': '40px'}}>
            <span className="color-red">Hello { user }</span><br/>
            <span>hope you have a great week</span>
        </h3>
    );
}

export default Greeting;
