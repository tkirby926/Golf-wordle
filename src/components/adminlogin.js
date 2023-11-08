import React from 'react';
import './css/HomeComponent.css';
import UserProfile from './Userprofile';

export class AdminLoginComponent extends React.Component {

    submitLogin(e) {
        e.preventDefault();
        fetch(UserProfile.getUrl() + '/adminlogin/' + e.target[0].value + '/' + e.target[1].value, { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.correct_login) {
                window.location.assign('/admin')
            }
            else {
                this.setState({error: "Login Failed"})
            }
        });   
    }

    constructor(props) {
        this.state = {}
    }

    render() {
        return (
        <form class="popup" onSubmit={(e) => this.submitLogin(e)}>
            <div style={{width: '30%', minWidth: '300px', display: 'block', margin: '0 auto'}}>
                <p style={{display: 'inline', float: 'left', margin: '0', padding: '0'}}>Username:</p> <input type='text' style={{display: 'inline', float: 'right', marginBottom: '5px'}}></input><br></br>
                <p style={{clear: 'both', display: 'inline', float: 'left', margin: '0', padding: '0'}}>Password:</p> <input type='password' style={{display: 'inline', float: 'right'}}></input><br></br><br></br>
            </div>
            <button style={{clear: 'both'}} class="button_standard" type='submit'>Submit</button><br></br>
            <p style={{color: 'red'}}>{this.state.error}</p>
        </form>
        )
    }

}