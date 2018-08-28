import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import Draft from './Components/Draft'

import App from "./App";
import Cbb from "./Cbb";
import Wnba from "./Wnba";
import Oleagues from "./OtherLeagues";
import Switch from '../node_modules/react-router-dom/Switch';
import Home from './Components/Home';
import SignupModal from "./Components/Modals/signupModal.jsx";
import axios from 'axios'
console.log('Got thru', process.env.REACT_APP_YOUTUBE_API_KEY);


class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            LastName: '',
            username: '',
            password: '',
            signupUsername: '',
            signupPassword: '',
            signupPasswordCheck: '',
            signupEmail: '',
            signupEmailCheck: '',
            isOpen: false,
        }
    }
    handleModal = () => {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen });
    }

    handleInput = (e) => {
        const { password } = this.state
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmitNewUser = (e) => {
        e.preventDefault()
        const { firstName, lastName, signupUsername, signupPassword, signupEmail } = this.state;
        axios
          .post("/users/newuser", {
            firstName: firstName,
            lastName: lastName,
            username: signupUsername,
            password: signupPassword,
            email: signupEmail,
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
            this.setState({ message: "Error logging in" });
          });
    }

    render() {
        const { username, password, signupUsername, signupPassword, signupPasswordCheck, signupEmail, signupEmailCheck, isOpen } = this.state;
        console.log("isOpen", isOpen);
        const signupMessage = () => {
            if (signupUsername === "" || signupPassword === "" || signupPasswordCheck === "" || signupEmail === "" || signupEmailCheck === '') {
                return ''
            } else if (signupPassword !== signupPasswordCheck && signupEmail !== signupEmailCheck) {
                return "Your Password and Email must match!";
            } else if (signupPassword !== signupPasswordCheck) {
                return "Password must match!";
            } else if (signupEmail !== signupEmailCheck) {
                return "Email must match!";
            }
        };
        return <div className="App">
            Passsword<input onChange={this.handleInput} type="text" name="password" />
            Username<input onChange={this.handleInput} type="text" name="username" />
            <button>Login</button>
            <button onClick={this.handleModal}>Signup</button>
            <Link to="/">
                {}
                <h3 className="home_title">Basketball Today</h3>
            </Link>
            <Route exact path="/" render={() => <div>
                <div className="navbar">
                    <Link to="/nba">NBA</Link>
                    {" | "}
                    <Link to="/cbb">CBB</Link>
                    {" | "}
                    <Link to="/wnba">WNBA</Link>
                    {" | "}
                    <Link to="/obb">Oversea BB</Link>
                </div>

                <br />
                {console.log("username", username)}
                {console.log("password", password)}
                {console.log("signupUsername", signupUsername)}
                {console.log("signupPassword", signupPassword)}
                {console.log("signupPasswordCheck", signupPasswordCheck)}
                {console.log("signupEmail", signupEmail)}
                {console.log("signupEmailCheck", signupEmailCheck)}
                <Home />
            </div>} />
            <Route path="/nba" component={App} />
            <Route path="/cbb" component={Cbb} />
            <Route path="/wnba" component={Wnba} />
            <Route path="/obb" component={Oleagues} />

            <SignupModal 
            show={this.state.isOpen} 
            onClose={this.handleModal}
            onSignup={this.handleSubmitNewUser}
            >
                Signup Here!
                <br />
                <br />
                <label className='modal-words'>First Name</label> <input className="signup-inputs" onChange={this.handleInput} type="text" name="firstName" /> {' '}
                <label className='modal-words'> Last Name </label> <input className="signup-inputs" onChange={this.handleInput} type="text" name="lastName" /> {' '}
                <label className='modal-words'>Username </label> <input className="signup-inputs" onChange={this.handleInput} type="text" name="signupUsername" /> {' '}
                <label className='modal-words'>Passsword </label> <input className="signup-inputs" onChange={this.handleInput} type="text" name="signupPassword" /> {' '}
                <label className='modal-words'>Re-enter Passsword </label> <input className="signup-inputs" onChange={this.handleInput} type="text" name="signupPasswordCheck" /> {' '}
                <label className='modal-words'>Email </label> <input className="signup-inputs" onChange={this.handleInput} type="email" name="signupEmail" /> {' '}
                <label className='modal-words'>Re-enter Email </label> <input className="signup-inputs" onChange={this.handleInput} type="email" name="signupEmailCheck" />
                <br />
                {signupMessage()}
            </SignupModal>
        </div>;
    }
}

export default LandingPage;
