import React, { Component } from 'react';
import './Appstyle.css';
import foto from '../assets/image3.jpg';
import Money from 'react-icons/lib/fa/money';
import Calender from 'react-icons/lib/fa/calendar';
import Car from 'react-icons/lib/fa/automobile';


export default class Home extends Component {
    constructor(Props) {
        super(Props);
    }


    onSubmit = () => {
        fetch("https://salty-escarpment-2400.herokuapp.com/api/v1/bukka/company/save",
            {
                method: 'post',
                headers:
                    {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                body: JSON.stringify(this.state)
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
    }

    render() {
        return (
            <div className="container-fluid m-event-cont">
                <nav className="navbar navbar-light"></nav>
                <img className="bukkastyle" src='http://res.cloudinary.com/www-mybukka-com/image/upload/v1505586721/logo-light_xnxon0.png' alt="bukka" />
                <div className="firststyle">
                    <h1>Partner with Bukka</h1>
                    <h1 className="lightstyle m-hidden">Eat what your <br />heart desires<br />at your own time</h1>
                </div>
                <div className="Event-img-holder">
                    <img src={foto} alt="image3" />
                </div>


                <div className="branchesstyle">
                    <h1>A new way to <br /> <span className="lightstyle">partner with Bukka</span></h1>
                    <br />
                    <br />
                    <div className="row m-branch">
                        <div className="col-sm-4">
                            <span className="iconsstyle"><Calender /></span>

                            <br />
                            <h2 className="lightstyle">Subscribe</h2>
                            <br />
                            <p className="lightstyle">Complete a subscription form for the service you want. Give us quick information about you and your workplace and we would get back to you within 24hours.</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="iconsstyle"><Car /></span>
                            <br />
                            <h2 className="lightstyle">Select your company</h2>
                            <br />
                            <p className="lightstyle">Select company or event name above after subscription has been approved to access menu from your assigned personal chef.</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="iconsstyle"><Money /></span>

                            <br />
                            <h2 className="lightstyle">Enjoy your meal</h2>
                            <br />

                            <p className="lightstyle">The earlier you place your order, the sooner it would be prepared and delivered. Breakfast order before: 10am, Lunch order before: 1pm.</p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="readystyle">
                        <h1>Ready to get started?<br /> <span className="lightstyle">Sign up today and let us care for you</span></h1>
                    </div>
                </div>

            </div>
        )
    }
}
