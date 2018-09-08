import React, { Fragment } from 'react'

const ModalWrapper = props => {
    return (
        <Fragment>
            <div className={`modal medium ${props.isOpen ? "show" : "hide"}`}>
                <div className="modal-header">
                    <h3>{props.title}</h3>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
            <div className={`blackout ${props.isOpen ? 'show' : ''}`}></div>
        </Fragment>
    )
}

export default ModalWrapper