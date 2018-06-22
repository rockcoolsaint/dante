import React,{Component} from 'react'

export default class Reauthorize extends Component{
    componentDidMount(){
        const { match:{params} }=this.props,
        url=params.url.split("-").join('/')

        //window.location = url
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}