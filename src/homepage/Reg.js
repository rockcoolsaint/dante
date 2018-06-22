import React, { Component } from 'react';
import './Appstyle.css';
import { Form, FormControl, Button } from "react-bootstrap";
import ArrowForward from 'react-icons/lib/md/arrow-forward';
import Autocomplete from './Map';





export default class Reg extends Component {
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.setAddress=this.setAddress.bind(this);


    this.state = {
        contactName: '',
        mobileNumber: '',
        company: '',
        budget: '',
        noOfPeople: '',
        mealType: '',
        type: '',
        address: '',
        eventDate: '',
        email: ''
    };
}

    onSubmit = () => {
        console.log(this.state)
        fetch ("https://salty-escarpment-2400.herokuapp.com/api/v1/bukka/company/save",
        {
            method: 'post',
            headers: 
            {'content-type': 'application/json',
             'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then((res)=>console.log(res))
        .catch((e)=>console.log(e))
    }


    setAddress (address){
        console.log("yess!")
        this.setState({address})
    };



    render () {

       // const {  contactName, mobileNumber, company, budget, noOfPeople, mealType, type, address, eventDate} = this.props
        return (
            <div className="formcom">
            <Form inline={false}>
            <br />
            <h3>FILL THIS FORM</h3>

            <h4>and we will take care of the rest</h4>
            <br />
            <FormControl
                className="input"
                placeholder="Name"
                type="text"
                defaultValue={this.state.contactName}
                onChange={e => this.setState({contactName: e.target.value})} />
            
        
        
            <FormControl
                className="input"
                placeholder="Mobile Number"
                type="tel"
                defaultValue={this.state.mobileNumber}
                onChange={e => this.setState({mobileNumber: e.target.value})} />
            
            <FormControl
                className="input"
                placeholder="Email"
                type="mail"
                defaultValue={this.state.email}
                onChange={e => this.setState({email: e.target.value})} />
        
            <FormControl
                className="input"
                placeholder="Company"
                type="text"
                defaultValue={this.state.company}
                onChange={e => this.setState({company: e.target.value})} />
            
        
    
            <FormControl
                className="input"
                placeholder="Budget"
                defaultValue={this.state.budget}
                onChange={e => this.setState({budget: e.target.value})} />
            
        
        
            <FormControl
                className="input"
                placeholder="Number of People"
                type="number"
                defaultValue={this.state.noOfPeople}
                onChange={e => this.setState({noOfPeople: e.target.value})} />
            
                
                <select className="select" 
                        id="select-meal"
                        onChange={e => this.setState({mealType: e.target.value})}>
                <option>Select Meal...</option>
                <option value="rice">Breakfast</option>
                <option value="rice">Lunch</option>
                <option value="rice">Dinner</option>
                </select>
                
        
            <FormControl
                className="input"
                placeholder="Type"
                defaultValue={this.state.type}
                onChange={e => this.setState({type: e.target.value})} />
            
        
        
            <Autocomplete setAddress={this.setAddress} />

            <FormControl
                className="input"
                type="date"
                placeholder="Event Date"
                defaultValue={this.state.eventDate}
                onChange={e => this.setState({eventDate: e.target.value})} />
            
            <br />
            <Button className="btn btn-red one" onClick={() => this.onSubmit()}>Submit <span className="arrow1style"><ArrowForward/></span></Button>
            <br />
            <br />
            <h3 className="condstyle">Have an account? <a>Log in</a></h3>
            <p className="condistyle">By proceeding, I agree to Bukka terms and conditions. I have read and understand the<a>Bukka Terms and Conditions</a>.</p>
        </Form>
        
        </div>
        );

    
    }
};