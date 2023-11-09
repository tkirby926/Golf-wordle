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
                this.setState({users: data.users, user_count: data.user_count})
            }
        });   
    }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user_count: 0,
            page: 0
        }
    }
    changePage(e, next) {
        e.preventDefault();
        var page = next ? this.state.page + 1 : this.state.page - 1;
        fetch(UserProfile.getUrl() + '/nextadminpage/' + page, { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.auth == 'failed') {
                window.location.assign('/log_adm')
            }
            else {
                this.setState({users: data.users, page: page})
            }
        });
    }

    render() {
        return (
        <div>
            <p>{this.state.user_count}</p><br></br>
            {this.state.users.map((user, index) => {
                return (
                    <div>
                        {user}
                    </div>
                )
            })}
            <button disabled={this.state.users.length != 30} onClick={(e) => this.changePage(e, true)}>Next Page</button>
            <button disabled={this.state.page == 0} onClick={(e) => this.changePage(e, false)}>Last Page</button>
        </div>
        )
    }
}