import React from 'react';
import UserProfile from './Userprofile';

export class AdminComponent extends React.Component {

    componentDidMount() {
        fetch(UserProfile.getUrl() + '/checkadmin', { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.auth == 'failed') {
                window.location.assign('/log_adm')
            }
            else {
                this.setState({users_signed: data.users_profiles, users_not: data.other_users, user_count: data.user_count})
            }
        });   
    }

    constructor(props) {
        super(props);
        this.state = {
            users_signed: [],
            users_not: [],
            user_count: 0,
            page_signed: 0,
            page_not: 0
        }
    }
    changePage(e, next, signed) {
        e.preventDefault();
        var page = next ? this.state.page_not + 1 : this.state.page_not - 1;
        if (signed) {
            page = next ? this.state.page_signed + 1 : this.state.page_signed - 1;
        }
        var signed_char = signed ? '1' : '0';
        fetch(UserProfile.getUrl() + '/nextadminpage/' + page + "/" + signed_char, { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.auth == 'failed') {
                window.location.assign('/log_adm')
            }
            else {
                if (signed) {
                    this.setState({users_signed: data.users, page_signed: page})
                }
                else {
                    this.setState({users_not: data.users, page_not: page})
                }
            }
        });
    }

    render() {
        return (
        <div class="big_form_white">
            <p>User Count: {this.state.user_count}</p><br></br>
            <p>Users:</p>
            <div style={{float: 'left'}}>
                {this.state.users_signed.map((user, index) => {
                    return (
                        <div>
                            {user}
                        </div>
                    )
                })}
                <button disabled={this.state.page_signed == 0} onClick={(e) => this.changePage(e, false, true)}>Last Page</button>
                <button disabled={this.state.users_signed.length != 30} onClick={(e) => this.changePage(e, true, true)}>Next Page</button>
            </div>
            <div style={{float: 'right'}}>
            {this.state.users_not.map((user, index) => {
                    return (
                        <div>
                            {user}
                        </div>
                    )
                })}
                <button disabled={this.state.page_not == 0} onClick={(e) => this.changePage(e, false, false)}>Last Page</button>
                <button disabled={this.state.users_not.length != 30} onClick={(e) => this.changePage(e, true, false)}>Next Page</button>
            </div>
        </div>
        )
    }
}