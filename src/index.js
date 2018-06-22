import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import Root from './root'
import storage from './data_Container/store'
// import {clearLocalStorage} from './data_Container/clear'

ReactDOM.render(

	<Root store={storage} />,
	document.getElementById('board'));
