import React from 'react';

const Button = ({onClick, title}) => (
    <button type="button" onClick={onClick} className="btn btn-danger">{title}</button>
)

export default Button;