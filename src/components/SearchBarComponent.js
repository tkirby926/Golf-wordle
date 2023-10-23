import './css/SearchBarComponent.css';
import React from 'react';
import UserProfile from './Userprofile';
import Scheffle from './Scheffle_logo.jpeg';
import Chart from 'react-apexcharts';
import Golfer from './img.jpeg';
import Check from './check.webp';
import RedX from './Redx.webp';
import { data } from 'browserslist';
import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';
import Am_flag from './Am_flag.jpeg';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: [],
            hide_losing_popup: true,
            hide_login_popup: true,
            hide_create_popup: true,
            user: '',
            autocomp_results: [],
            error: '',
            answer: [],
            hide_winning_popup: true,
            hide_friends_popup: true,
            cant_guess: false,
            history: [],
            history_labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            hide_dropdown: true,
            labels: ["Wins", "Majors", "World Rank", "Age", "Avg. Drive", "Origin"],
            hide_rules_popup: true,
            search_status: 'r',
            friends: [],
            requests: [],
            hint_requested: false,
            hint: '',
            hide_hint_confirmation: true,
        }
    }

    autoComp(e) {
        e.preventDefault();
        if (document.getElementById('search').value != '') {
            fetch(UserProfile.getUrl() + "/api/v1/autocomp/" + document.getElementById('search').value, { credentials: 'include', method: 'GET' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({autocomp_results: data.results})
            })
        }
        else {
            this.setState({autocomp_results: []})
        }
    }

    checkNull(arr) {
        if (arr[0] == '' || arr[0] == 'undefined') {
            return []
        }
        else {
            return arr;
        }
    }

    checkDate() {
        var today = new Date();
        if (sessionStorage.getItem('last_update') == undefined) {
            return false;
        }
        if (today.getDate() == new Date(sessionStorage.getItem('last_update')).getDate()) {
            return true;
        }
        return false;
    }
    
    componentDidMount() {
        if (sessionStorage.getItem('user') != null && this.checkDate()) {
            var num_guesses = parseInt(sessionStorage.getItem('num_guesses'));
            var user = sessionStorage.getItem('user') == 'null' ? '' : sessionStorage.getItem('user');
            var history = sessionStorage.getItem('history').split(',').map(Number);
            var guess_string = sessionStorage.getItem('guesses').split(',');
            var requests = sessionStorage.getItem('requests').split(',');
            var friends = sessionStorage.getItem('friends').split(',');
            var answer = sessionStorage.getItem('answer').split(',');
            var hint_req = sessionStorage.getItem('hint_requested') == 'true' ? true : false;
            var hint = sessionStorage.getItem('hint');
            answer = this.checkNull(answer);
            requests = this.checkNull(requests);
            friends = this.checkNull(friends);
            var rules_popup = sessionStorage.getItem('hide_rules_popup') == 'false' ? false : true;
            var cant_guess = sessionStorage.getItem('cant_guess') == 'false' ? false : true;
            if (answer.length > 1) {
                answer[0] = parseInt(answer[0])
                answer[3] = parseInt(answer[3])
                answer[4] = parseInt(answer[4])
                answer[5] = parseInt(answer[5])
                answer[6] = parseInt(answer[6])
                answer[7] = parseInt(answer[7])
            }
            var friends_readable = []
            var guesses_readable = []
            if (guess_string.length != 1) {
                for (let i = 0; i < guess_string.length / 16; i += 1) {
                    const chunk = []
                    for (let j = 0; j < 16; j++) {
                        if (j == 0 || j == 3 || j == 4 || j == 5 || j == 6 || j == 7) {
                            guess_string[i*16 + j] = parseInt(guess_string[i*16 + j])
                        }
                        chunk.push(guess_string[i*16 + j])
                    }
                    guesses_readable.push(chunk);
                }
            }
            if (friends.length != 1) {
                for (let i = 0; i < friends.length / 2; i += 1) {
                    const chunk = []
                    for (let j = 0; j < 2; j++) {
                        if (j == 1) {
                            friends[i*2 + j] = parseInt(friends[i*2 + j])
                        }
                        chunk.push(friends[i*2 + j])
                    }
                    friends_readable.push(chunk);
                }
            }
            this.setState({user: user, answer: answer,
                           friends: friends_readable, requests: requests,
                           num_guesses: num_guesses, hide_rules_popup: rules_popup,
                           series: sessionStorage.getItem('series'), guesses: guesses_readable, 
                           cant_guess: cant_guess, history: history, hint_requested: hint_req,
                           hint: hint});
        }
        else {
            fetch(UserProfile.getUrl() + "/api/v1/check_user", { credentials: 'include', method: 'GET' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                var cant_guess = false;
                if (data.no_guesses) {
                    cant_guess = true;
                }

                this.setState({cant_guess: cant_guess, guesses: data.guesses, history: data.history, 
                    user: data.user == "null" ? '' : data.user, 
                    answer: cant_guess ? data.chosenplayer : [],
                    friends: data.friends,
                    requests: data.requests,
                    num_guesses: data.guesses.length,
                    hint_requested: data.hint != '' ? true : false,
                    hint: data.hint,
                    hide_rules_popup: data.user == "null" ? false : true,
                    series: [{
                        name: 'series-1',
                        data: [data.history]
                    }],
                    last_check_timestamp: new Date()
                })
                sessionStorage.setItem('cant_guess', cant_guess)
                sessionStorage.setItem('guesses', data.guesses)
                sessionStorage.setItem('history', data.history)
                sessionStorage.setItem('user', data.user);
                sessionStorage.setItem('answer', cant_guess ? data.chosenplayer : []);
                sessionStorage.setItem('friends', data.friends)
                sessionStorage.setItem('requests', data.requests)
                sessionStorage.setItem('num_guesses', data.guesses.length)
                sessionStorage.setItem('hide_rules_popup', data.user == "null" ? false : true)
                var today = new Date();
                sessionStorage.setItem('last_update', today);
                sessionStorage.setItem('hint_requested', data.hint != '' ? true : false);
                sessionStorage.setItem('hint', data.hint);
                sessionStorage.setItem('series', [{
                    name: 'series-1',
                    data: [data.history]
                }])
            })
                
        }
    }

    returnGuess(index, wrong_ans) {
        var guess = this.state.guesses[index]
        if (wrong_ans) {
            guess = this.state.answer;
        }
        return (
            <div class="big_form">
                <img src={Golfer} style={{ border: 'thick solid white', borderRadius: '50%', height: '60px', marginTop: '5px'}}></img>
                <div style={{clear: 'both'}}><h2 style={{fontFamily: "'Nexa', sans-serif;", fontWeight: 'bolder', marginBottom: '0', marginTop: '0', fontSize: window.innerWidth < 450 ? '34px' : '50px'}}>{guess[1] + " " + guess[2]}</h2></div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0', padding: '0'}}>
                <table margin='0' padding='0' borderCollapse="collapse" cellSpacing='0px' height='0px' style={{tableLayout: 'fixed', margin: '0 auto', width: window.innerWidth < 450 ? '98%' : '95%'}}>
                    {guess.slice(3, 9).map((attr, index1) => {
                        var type = 'first2';
                        var arrow = '';
                        var suffix = '';
                        if (!wrong_ans) {
                            if (index1 == 5) { 
                                if (this.state.guesses[index][index1 + 10] != 's') {
                                    type = "third2";
                                }
                                else {
                                    type = "third2_cor";
                                }
                            }
                            else if (index1 == 4) {
                                suffix = 'y';
                                if (this.state.guesses[index][index1 + 10] == 'u') {
                                    arrow = '\u2191'
                                    type = "third2"; 
                                }
                                else if (this.state.guesses[index][index1 + 10] == 'd') {
                                    arrow = '\u2193';
                                    type = "third2"; 
                                }
                                else {
                                    type = "third2_cor";
                                }
                            }
                            else if (index1 == 2 || index1 == 3) { 
                                if (this.state.guesses[index][index1 + 10] == 'u') {
                                    arrow = '\u2191'
                                    type = "second2"; 
                                }
                                else if (this.state.guesses[index][index1 + 10] == 'd') {
                                    arrow = '\u2193';
                                    type = "second2"; 
                                }
                                else {
                                    type = "second2_cor";
                                }
                                if (index1 == 2) {
                                    suffix = 'th';
                                    if (this.state.guesses[index][5] % 10 == 3) {
                                        suffix = 'rd';
                                    }
                                    if (this.state.guesses[index][5] % 10 == 2) {
                                        suffix = 'nd';
                                    }
                                    if (this.state.guesses[index][5] % 10 == 1) {
                                        suffix = 'st';
                                    }
                                }
                            }
                            else {
                                if (this.state.guesses[index][index1 + 10] == 'u') {
                                    arrow = '\u2191';
                                    type = "first2"; 
                                }
                                else if (this.state.guesses[index][index1 + 10] == 'd') {
                                    arrow = '\u2193';
                                    type = "first2"; 
                                }
                                else {
                                    type = "first2_cor";
                                }
                            }
                        }
                        if (index1 != 5) {
                            return (   
                            <div style={{display: 'table-cell', width: '10%'}}>
                                {/* <img src={this.state.attr[index1]} style={{width: '100%', height: '25px'}}></img> */}
                                <div class={type}  style={{alignItems: 'center', height: '100%', marginTop: '0', marginBottom: '0', textAlign: 'center'}}>
                                    <div style={{width: '100%', lineHeight: '0px', display: 'flex', justifyContent: 'center', fontWeight: 'bold', alignContent: 'center', height: '100%', fontSize: '110%'}}>
                                    <p style={{display: 'inline'}}>{attr}<p style={{display: 'inline', fontSize: '10px'}}>{suffix}</p>{arrow}</p>
                                    </div>
                                    {/* {this.state.guesses[index1 + 10] == 'w'}
                                    
                                    <div style={{fontSize: '20px', display: 'inline'}}>{arrow}</div> */}
                                </div>
                            </div>
                            )
                        }
                        else {
                            return (
                            <div style={{display: 'table-cell', width: '10%', height: '35px'}}>
                                <div class={type}  style={{alignItems: 'center', height: '87%', marginTop: '0', marginBottom: '0', textAlign: 'center', display: 'inline-block', width: '95%', justifyContent: 'center', alignContent: 'center'}}>
                                <div style={{width: '100%', lineHeight: '0px', display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%', fontSize: '110%', position: 'relative'}}>
                                    <img style={{border: '1.5px solid black', borderRadius: '8px', display: 'block'}} class="image" src={Am_flag}></img>
                                </div>
                                </div>
                            </div>
                            )
                        }

                    })}
                </table>
                </div>
            </div>
        )
    }

    closeLosingPopup(e) {
        e.preventDefault()
        this.setState({hide_losing_popup: true})
    }

    acceptGuess(e, guessid) {
        e.preventDefault();
        if (!this.checkDate()) {
            this.forceUpdate();
        }
        fetch(UserProfile.getUrl() + "/api/v1/check_guess/" + guessid, { credentials: 'include', method: 'GET' })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            var x = this.state.guesses;
            x.push(data.guess_data)
            var num_guess = x.length;
            if (data.numguesses != undefined) {
                num_guess = data.numguesses;
                if (num_guess != x.length) {
                    this.resetStorage();
                }
            }
            document.getElementById('search').value = '';
            if (data.no_guesses) {
                this.setState({cant_guess: true, autocomp_results: []})
                sessionStorage.setItem('cant_guess', true);
            }
            else if (data.guess_data[9] == 's') {
                if (this.state.user != '') {
                    this.state.history[num_guess - 1]++;
                    sessionStorage.setItem('history', this.state.history);
                }
                this.setState({autocomp_results: [], num_guesses: num_guess, guesses: x, cant_guess: true, answer: data.guess_data.slice(0, 9), hide_winning_popup: false})
                sessionStorage.setItem('guesses', x);
                sessionStorage.setItem('num_guesses', num_guess);
                sessionStorage.setItem('cant_guess', true);
                sessionStorage.setItem('answer', data.guess_data.slice(0, 9));
            }
            else {
                this.setState({guesses: x, num_guesses: num_guess, autocomp_results: []})
                sessionStorage.setItem('guesses', x);
                sessionStorage.setItem('num_guesses', num_guess);
                if (data.numguesses >= 8) {
                    if (this.state.history.length > 0) {
                        this.state.history[this.state.history.length - 1]++;
                        sessionStorage.setItem('history', this.state.history);
                    }
                    this.setState({cant_guess: true, answer: data.chosen_player, hide_losing_popup: false, hide_winning_popup: true})
                    sessionStorage.setItem('cant_guess', true);
                    sessionStorage.setItem('answer', data.chosen_player);
                }
            }
        })
    }

    logIn(e) {
        e.preventDefault();
        this.setState({hide_login_popup: false, hide_create_popup: true, hide_rules_popup: true, hide_winning_popup: true, error: ''})
    }

    closeLoginPopup(e) {
        e.preventDefault();
        this.setState({hide_login_popup: true})
    }

    showFriendsPopup(e) {
        e.preventDefault();
        this.setState({hide_friends_popup: !this.state.hide_friends_popup, hide_losing_popup: true, hide_winning_popup: true, hide_dropdown: true, hide_rules_popup: true})
    }

    showCreateProfileWindow(e) {
        e.preventDefault();
        this.setState({hide_dropdown: true, hide_login_popup: true, hide_create_popup: false, hide_winning_popup: true, hide_rules_popup: true, error: ''});
    }

    closeCreatePopup(e) {
        e.preventDefault();
        this.setState({hide_create_popup: true})
    }

    closeEndingPopup(e, win) {
        e.preventDefault();
        if (win) {
            this.setState({hide_winning_popup: true})
        }
        else {
            this.setState({hide_losing_popup: true})
        }
    }

    resetStorage() {
        for (const key in sessionStorage) {
            if (sessionStorage.hasOwnProperty(key)) {
              sessionStorage.removeItem(key);
            }
        }
        window.location.reload();
    }

    submitLogin(e) {
        e.preventDefault();
        fetch(UserProfile.getUrl() + '/login/' + e.target[0].value + '/' + e.target[1].value, { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.correct_login) {
                this.setState({user: data.user, hide_login_popup: true, error: ''})
                this.resetStorage();
            }
            else {
                this.setState({error: "Login Failed"})
            }
        });
    }

    submitCreate(e) {
        e.preventDefault();
        if (e.target[1].value != e.target[2].value) {
            this.setState({error: "Passwords do not match. Please try again."})
            return;
        }
        var formdata = new FormData();
        formdata.append("username", e.target[0].value);
        formdata.append("password", e.target[1].value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        };

        fetch(UserProfile.getUrl() + "/api/v1/create", requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.success == 'yes') {
                this.setState({user: e.target[0].value, hide_create_popup: true})
                this.resetStorage();
            }
            else {
                this.setState({error: data.error})
            }
        });
    }

    logOut(e) {
        e.preventDefault();
        fetch(UserProfile.getUrl() + '/api/v1/logout', { credentials: 'include', method: 'DELETE' })
        .then(response => response.json())
        .then((data) => {
            if (data.user === "") {
                this.setState({user: '', guesses: [], num_guesses: 0, hide_login_popup: false})
                this.resetStorage();
            }
            else {
                this.setState({error: data.error})
            }
        });
    }

    closeRulesPopup(e) {
        e.preventDefault();
        this.setState({hide_rules_popup: true})
    }
    
    showDropDown() {
        this.setState({hide_dropdown: !this.state.hide_dropdown, hide_friends_popup: true, hide_login_popup: true, hide_losing_popup: true, hide_rules_popup: true, hide_create_popup: true})
    }

    showHistory() {
        if (this.state.user == '') {
            return "";
        }
        var maxi = Math.max(...this.state.history);
        const labelFormatter = (value) => {
            return Math.round(value); // This rounds the value to the nearest whole number
          };
        var series = [{
            name: "Freq",
            data: [{
              x: '1',
              y: this.state.history[0]
            }, {
              x: '2',
              y: this.state.history[1]
            }, {
              x: '3',
              y: this.state.history[2]
            }, {
              x: '4',
              y: this.state.history[3]
            }, {
              x: '5',
              y: this.state.history[4]
            }, {
              x: '6',
              y: this.state.history[5]
            }, {
              x: '7',
              y: this.state.history[6]
            }, {
              x: '8',
              y: this.state.history[7]
            }, {
                x: 'Fail',
                y: this.state.history[8]
              }]
          }];
          var options = {
            chart: {
              type: 'bar',
              height: 380,
              toolbar: {
                  show: false
              }
            },
            yaxis: {
                title: {
                    text: 'Frequency'
                },
                tickAmount: 4, // Set the number of ticks you want
                max: maxi + (4 - (maxi % 4)), 
                forceNiceScale: true,
                labels: {
                    formatter: labelFormatter
                } 
            },
            xaxis: {
                title: {
                    text: 'Number of Guesses'
                },
              type: 'category',
              labels: {
                formatter: (value, index) => {
                    return value
                }
              }
            },
            title: {
                text: 'Guess History',
            },
            tooltip: {
              x: {
                formatter: function(val) {
                  return "1"
                }  
              }
            }}
		return (
		<div>
			<Chart options={options} series={series} type="bar" width='100%' height={320} />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        )
    }

    returnLabel(index) {
        var border_r = 'thin solid black';
        var border_l = 'thin solid black';
        var f_size = '12px';
        if (index == 0) {
            border_l = 'none';
        }
        if (index == 4) {
            f_size = '11px';
        }
        if (index == 5) {
            border_r = 'none';
        }
        return (<div style={{display: 'table-cell', width: '10%', borderRight: border_r, borderLeft: border_l}}>
                    {/* <img src={this.state.attr[index]} style={{width: '100%', height: '25px'}}></img> */}
                    <h4 style={{fontFamily: "'Nexa', sans-serif;", fontSize: f_size}}>{this.state.labels[index]}</h4>
                </div>
                )
    }

    showEndingBanner(win) {
        var wrong_ans = false;
        var message = "Congrats for getting today's golfer, ";
        if (!win) {
            message = "Sadly, you did not get today's golfer. Today's golfer was ";
            wrong_ans = true;
        }
        return (
        <form class="popup">
            <span class='button_like' style={{float: 'right'}} onClick={(e) => this.closeEndingPopup(e, win)}>X</span>
            <p>{message}{this.state.answer[1]} {this.state.answer[2]}.</p>
            {this.returnGuess(this.state.num_guesses - 1, wrong_ans)}
            {this.showHistory()}
            <p hidden={this.state.user != ''} style={{fontWeight: 'bold'}}>Please Log In or Create an Account <button onClick={(e) => this.logIn(e)} class="link_button">HERE</button> in order to keep track of your daily guess history and average score.</p>   
        </form>)
    }

    showDropdownTitle() {
        return (<p>Today's golfer of the day:</p>)
    }

    sendRequest(e) {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("user", e.target[0].value);
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formdata
        }
        fetch(UserProfile.getUrl() + '/api/v1/add_friend', requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.status !== "success") {
                this.setState({search_status: 'b'})
            }
            else {
                this.setState({search_status: 's'})
            }
        });
    }

    resetSearchState(e) {
        e.preventDefault();
        this.setState({search_status: 'r'})
    }

    acceptFriend(e, index) {
        fetch(UserProfile.getUrl() + '/api/v1/accept_friend/' + this.state.requests[index], { credentials: 'include', method: 'PUT' })
        .then(response => response.json())
        .then((data) => {
            if (data.status === "success") {
                var arr = this.state.requests;
                arr.splice(index, 1);
                var arr2 = this.state.friends;
                arr2.push(data.friend_info);
                this.setState({requests: arr, friends: arr2})
                sessionStorage.setItem('requests', arr)
                sessionStorage.setItem('friends', arr2)
            }
        });
    }

    rejectFriend(e, index) {
        fetch(UserProfile.getUrl() + '/api/v1/reject_friend/' + this.state.requests[index], { credentials: 'include', method: 'DELETE' })
        .then(response => response.json())
        .then((data) => {
            if (data.status === "success") {
                var arr = this.state.requests;
                arr.splice(index, 1);
                this.setState({requests: arr})
                sessionStorage.setItem('requests', arr)
            }
        });
    }

    showHint(e) {
        e.preventDefault();
        fetch(UserProfile.getUrl() + '/api/v1/show_hint', { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.status === "success") {
                this.setState({hint_requested: true, hint: data.hint, hide_hint_confirmation: true})
                sessionStorage.setItem('hint', data.hint);
                sessionStorage.setItem('hint_requested', true);
            }
        });
    }

    showFriends() {
        var button_message = 'Submit'
        var font_size = 'initial';
        if (this.state.search_status == 's') {
            button_message = 'Sent';
        }
        else if (this.state.search_status == 'b') {
            button_message = 'User not found';
            font_size = '8px';
        }
        return (
            <div>
                <form style={{height: '30px'}} onSubmit={(e) => this.sendRequest(e)}>
                    <input class="input1" onKeyUp={(e) => this.resetSearchState(e)} type="text" id='search1' name="search" placeholder="Add Friend By Username"/>
                    <button class="button_standard" type='submit' style={{width: '20%', height: '30px', marginRight: '10px', fontSize: font_size, minWidth: '0', float: 'right', padding: '2px'}}>{button_message}</button>
                </form>
                <div style={{clear: 'both'}} hidden={this.state.requests.length == 0}>
                    <p>Friend Requests:</p>
                    {this.state.requests.map((req, index) => {
                        return (
                            <div class="req">
                                <p style={{width: '60%', float: 'left', margin: '0'}}>{req}</p>
                                <img onClick={(e) => this.acceptFriend(e, index)} src={Check} style={{width: '5%', float: 'left', cursor: 'pointer'}}></img>
                                <img onClick={(e) => this.rejectFriend(e, index)} src={RedX} style={{marginLeft: '5%', width: '5%', float: 'left', cursor: 'pointer'}}></img>
                            </div>
                        )
                    })}
                </div>
                <div style={{clear: 'both'}}>
                <p>Friends:</p>
                <div class="req_header" style={{display: this.state.friends.length == 0 ? 'none' : 'flex'}}>
                    <p style={{width: '60%', float: 'left', margin: '0'}}>username</p>
                    <p style={{width: '25%', float: 'left', margin: '0'}}>Guess #</p>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{fontWeight: 'bold', textAlign: 'center', margin: '0 auto', width: '90%', fontSize: '13px'}} hidden={this.state.friends.length != 0}>
                        <p>You don't have any friends yet. Use the search bar to find friends by their username.</p>
                    </div>
                </div>
                {this.state.friends.map((friend, index) => {
                    var num = friend[1];
                    if (friend[1] == 9) {
                        num = 'failed';
                    }
                    else if (friend[1] == 0) {
                        num = '---';
                    }
                        return (
                            <div class="req">
                                <p style={{width: '60%', float: 'left', margin: '0'}}>{friend[0]}</p>
                                <p style={{width: '20%', float: 'left', margin: '0'}}>{num}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        )
    }

    showHintConfirmation(e) {
        e.preventDefault();
        this.setState({hide_hint_confirmation: false, hide_login_popup: true, hide_losing_popup: true, hide_winning_popup: true, hide_create_popup: true})
    }

    showRulesPopup(e) {
        e.preventDefault();
        this.setState({hide_rules_popup: !this.state.hide_rules_popup, hide_login_popup: true, hide_create_popup: true, hide_dropdown: true})
    }

    clsoeHintConfirmation(e) {
        e.preventDefault();
        this.setState({hide_hint_confirmation: true})
    }

    render() {
        var im_wid = '15%';
        var div_width = '100%';
        if (window.innerWidth < 750) {
            im_wid = '30%';
            div_width = '98%';
        }
        return (
            <div style={{width: div_width, position: 'relative', paddingBottom: '50px'}}>
                <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6567831601079042"
     crossorigin="anonymous"></script>
                </head>
                {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6567831601079042"
                crossorigin="anonymous"></script> */}
                <div  style={{ marginRight: '5%', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
                    <div style={{display: 'flex'}}>
                        <button class="button_standard" style={{display: this.state.user == '' ? 'none' : 'initial', fontSize: '15px', marginTop: '1vh', marginLeft: '10px', float: 'left', marginRight: '2px'}} onClick={(event) => this.showDropDown(event)}> Profile </button>
                        <button class="button_standard" style={{fontSize: '15px', marginTop: '1vh', marginLeft: '10px', float: 'left'}} onClick={(event) => this.showRulesPopup(event)}> Rules </button>
                        <button class="button_standard" style={{display: this.state.user == '' ? 'none' : 'initial', fontSize: '15px', marginTop: '1vh', marginLeft: '10px', float: 'right', marginRight: '10px'}} onClick={(event) => this.showFriendsPopup(event)}> Friends </button>
                    </div>
                </div>
                <div class="big_form_drop" style={{position: 'absolute', clear: 'both', width: '95%', overflow: 'visible', zIndex: '10000'}} hidden={this.state.hide_dropdown}>
                    {this.state.answer.length > 0 && this.showDropdownTitle()}
                    <div style={{width: '95%', margin: '0 auto'}}>
                        {this.state.answer.length > 0 && this.returnGuess(8, true)}
                    </div>
                    {this.showHistory()}
                </div>
                <div class="big_form_drop" style={{position: 'absolute', clear: 'both', width: '350px', maxWidth: '95%', overflow: 'visible', zIndex: '10000', right: '0'}} hidden={this.state.hide_friends_popup}>
                    {this.state.user != '' && this.showFriends()}
                </div>
                <div style={{clear: 'both'}}>
                    <img src={Scheffle} style={{height: '12vh', maxWidth: '85vw', marginBottom: '2vh', marginTop: '2vh', borderRadius: '5px'}}></img>
                </div>
                <div class="box">
                    <div class="big_form_white" hidden={this.state.user == ''}>
                        <p style={{lineHeight: '1px'}}>{this.state.user}</p>
                        <p style={{lineHeight: '1px', fontSize: '10px', fontWeight: 'normal', cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                        onClick={(e) => this.logOut(e)}>Log out</p>
                    </div>
                    <div class="big_form_white" hidden={this.state.user != ''}>
                        <p style={{lineHeight: '1px', cursor: 'pointer'}}
                        onClick={(e) => this.logIn(e)}>Log in</p>
                    </div>  
                    <form name="search">
                        <input disabled={this.state.num_guesses >= 8} type="text" style={{caretColor: 'transparent'}} disabled={this.state.cant_guess}  placeholder={this.state.cant_guess ? "Thanks for Playing" : "Guess Here"} id='search' class="input" name="txt" onKeyUp={(e) => this.autoComp(e)} />
                        <div style={{position: 'absolute', width: '100%'}}>{this.state.autocomp_results.slice(0, 5).map((result, index) => {
                                return (
                                <tr class="user_button" onClick = {(e) => this.acceptGuess(e, result[0])}>
                                    <td style={{width: im_wid}}>
                                        <img src={Scheffle} style={{height: '35px', display: 'table-cell', borderRadius: '50%', border: 'thin solid white'}}></img>
                                    </td>
                                    <td style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                        <span style={{width: '80%', fontWeight: 'bold'}}>{result[1]} {result[2]}</span>
                                    </td>
                                </tr>
                                )
                        })}</div>
                    </form>
                </div>
                <button class={this.state.cant_guess ? "big_form_gray" : "big_form_green"} style={{cursor: 'pointer'}} onClick={(e) => this.showHintConfirmation(e)} hidden={this.state.hint_requested} disabled={this.state.cant_guess}>
                    <p>Show Hint</p>
                </button>
                <div class="popup" hidden={this.state.hide_hint_confirmation}>
                    <p>Are you sure you want to see the hint? It will show the last event won by the golfer of the day.</p>
                    <div style={{width: '100%'}}>
                        <div style={{margin: '0 auto', display: 'inline-block'}}>
                            <button class="button_standard" style={{float: 'left'}} onClick={(e) => this.showHint(e)}>Yes</button>
                            <button class="button_standard" style={{float: 'left', marginLeft: '10px'}} onClick={(e) => this.clsoeHintConfirmation(e)}>No</button>
                        </div>
                    </div>
                </div>
                <div class="big_form_green" hidden={!this.state.hint_requested}>
                    <p style={{marginBottom: '0'}}>Last Tournament Won:</p>
                    <p style={{marginTop: '0'}}>{this.state.hint}</p>
                </div>
                <div style={{width: '100%', maxWidth: '600px', margin: '0 auto', marginTop: '15px'}}>
                    <table cellSpacing='5px' height='50px' style={{tableLayout: 'fixed', margin: '0 auto', backgroundColor: 'white', borderRadius: '25px', width: window.innerWidth < 450 ? '100%' : '95%'}}>
                        {this.returnLabel(0)}
                        {this.returnLabel(1)}
                        {this.returnLabel(2)}
                        {this.returnLabel(3)}
                        {this.returnLabel(4)}
                        {this.returnLabel(5)}
                    </table>
                </div>
                <div>
                    {this.state.num_guesses > 7 && this.returnGuess(7, false)}
                </div>
                <div>
                    {this.state.num_guesses > 6 && this.returnGuess(6, false)}
                </div>
                <div>
                    {this.state.num_guesses > 5 && this.returnGuess(5, false)}
                </div>
                <div>
                    {this.state.num_guesses > 4 && this.returnGuess(4, false)}
                </div>
                <div>
                    {this.state.num_guesses > 3 && this.returnGuess(3, false)}
                </div>
                <div>
                    {this.state.num_guesses > 2 && this.returnGuess(2, false)}
                </div>
                <div>
                    {this.state.num_guesses > 1 && this.returnGuess(1, false)}
                </div>
                <div>
                    {this.state.num_guesses > 0 && this.returnGuess(0, false)}
                </div>
                <form class="popup" hidden={this.state.hide_login_popup} onSubmit={(e) => this.submitLogin(e)}>
                    <span class='button_like' style={{float: 'right'}} onClick={(e) => this.closeLoginPopup(e)}>X</span>
                    <p style={{fontWeight: 'bold'}}>Log in to your account to track your progress, or create an account using the link below</p>
                    <div style={{width: '30%', minWidth: '300px', display: 'block', margin: '0 auto'}}>
                        <p style={{display: 'inline', float: 'left', margin: '0', padding: '0'}}>Username:</p> <input type='text' style={{display: 'inline', float: 'right', marginBottom: '5px'}}></input><br></br>
                        <p style={{clear: 'both', display: 'inline', float: 'left', margin: '0', padding: '0'}}>Password:</p> <input type='password' style={{display: 'inline', float: 'right'}}></input><br></br><br></br>
                    </div>
                    <button style={{clear: 'both'}} class="button_standard" type='submit'>Submit</button><br></br>
                    <button class="link_button" onClick={(e) => this.showCreateProfileWindow(e)}>Create Profile Here</button>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </form>
                <form class="popup" hidden={this.state.hide_create_popup} onSubmit={(e) => this.submitCreate(e)}>
                    <span class='button_like' style={{float: 'right'}} onClick={(e) => this.closeCreatePopup(e)}>X</span>
                    <p style={{fontWeight: 'bold'}}>Create Profile</p>
                    <div style={{width: '30%', minWidth: '300px', display: 'block', margin: '0 auto'}}>
                        <p style={{display: 'inline', float: 'left', margin: '0', padding: '0'}}>Username:</p> <input type='text' style={{display: 'inline', float: 'right', marginBottom: '5px'}}></input><br></br>
                        <p style={{clear: 'both', display: 'inline', float: 'left', margin: '0', padding: '0'}}>Password:</p> <input type='password' style={{display: 'inline', float: 'right', marginBottom: '5px'}}></input><br></br>
                        <p style={{clear: 'both', display: 'inline', float: 'left', margin: '0', padding: '0'}}>Confirm Password:</p> <input type='password' style={{display: 'inline', float: 'right'}}></input><br></br><br></br>
                    </div>
                    <button style={{clear: 'both', marginTop: '5px', minWidth: '150px'}} class="button_standard" type='submit'>Create Profile</button><br></br>
                    <button class="link_button" onClick={(e) => this.logIn(e)}>Log In to Existing Account Here</button>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </form>
                {!this.state.hide_winning_popup && this.showEndingBanner(true)}
                {!this.state.hide_losing_popup && this.showEndingBanner(false)}
                <form class="popup" id="RulesContainer" style={{textAlign: 'left', fontSize: window.innerWidth < 750 ? '11px' : '14px'}} hidden={this.state.hide_rules_popup}>
                    <div class='popup_content'>
                    <span class='button_like' style={{float: 'right'}} onClick={(e) => this.closeRulesPopup(e)}>X</span>
                    <p style={{clear: 'both'}}>Welcome to the Scheffle! If you already know the rules, feel free to close this window. Otherwise, they are explained below!</p>  
                    <p>The objective of the game is to figure out today's golfer of the day in the least amount of guesses. Start by picking a PGA Tour Professional using the search bar.
                         Once selected, you will see your chosen player's number of career wins, number of career major championships, current World Golf Ranking, Age, 
                         Average Driving Distance, and Country of Origin. In addition, you will see the following hints to narrow your search for the correct golfer:</p>
                         <ul>
                             <li>If a field for your selected golfer is colored green, that means that the golfer of the day and your guesses golfer share that value (for example,
                                 if the bubble for "Majors" is colored green, then it means the golfer you guessed and the golfer of the day have the same number of major championship wins).
                             </li>
                             <li>If a field for your selected golfer has an up arrow next to the value, it means the golfer of the day has a higher number for that category than your guessed
                                  golfer (this does not apply for the Country of Origin category).
                             </li>
                             <li>If a field for your selected golfer has an down arrow next to the value, it means the golfer of the day has a lower number for that category than your guessed
                                  golfer (this does not apply for the Country of Origin category).
                             </li>
                             <li>If all fields are marked in green for your guessed golfer, that means you correctly guessed the golfer of the day!
                             </li>
                             <li style={{fontWeight: 'bold'}}>If you get stuck, you can use the "Show Hint" Button to see the last PGA tournament won by the golfer of the day.
                             </li>
                        </ul>
                        <p>You will have 8 guesses to correctly guess the golfer of the day before failing. However, try to solve the puzzle in the smallest number of guesses possible!</p>
                        <p hidden={this.state.user != ''} style={{fontWeight: 'bold'}}>Please Log In or Create an Account <button onClick={(e) => this.logIn(e)} class="link_button">HERE</button> in order to keep track of your daily guess history and average score.</p>
                        </div>
                </form>
            </div>   
        )
    }

}