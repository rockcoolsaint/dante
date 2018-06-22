import React from 'react'
import '../style/addmenu.css'
import '../style/App.css'

const orderError = (props) => (
    <div id="bigmenu">
        <div id="addmenu" className="vbo">
            <div id="err">
                <h4 className="qa">
                    {props.error}
                    <a className="qw"
                        onClick={props.evnt}>x</a>
                </h4>
            </div>
        </div>
    </div>
)

export default orderError
