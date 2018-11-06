import React from 'react'

const Cancel = Component => {

    cancel = () => { /*cancel function*/ }

    return <Component onClick={this.cancel} className="btn btn-cancel">CANCEL</Component>
}

export default Cancel
