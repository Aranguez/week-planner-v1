import React from 'react';

const CancelButton = ({onClick}) => (
    <button type="button" onClick={onClick} className="btn btn-danger">CANCEL</button>
)

export default CancelButton;