import React from 'react'
import '../style/signIn.css'
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon'

const FirstPagePreloader=()=>(
    <div 	className="signInPopup">
        <div className="popupHolder lkjq">
            <PreloaderIcon
            type={ICON_TYPE.PUFF}
            size={100}
            strokeWidth={8} // min: 1, max: 50
            strokeColor="#9c1c26"
            duration={800}
            />
        </div>
    </div>
)


export default FirstPagePreloader