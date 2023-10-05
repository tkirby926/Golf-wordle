import './css/SearchBarComponent.css';
import React from 'react';
import UserProfile from './Userprofile';
import Scheffle from './Scheffle_logo.jpeg';
import Chart from 'react-apexcharts'
import CanvasJSReact from '@canvasjs/react-charts';
import Wins from './Wins.jpeg';
import Majors from './Majors.jpeg';
import Debut from './Debut.jpeg';
import Age from './Age.jpeg';
import Country from './Country.jpeg';
import College from './College.jpeg';
import Golfer from './img.png';


export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: [],
            hide_popup: true,
            hide_login_popup: true,
            hide_create_popup: true,
            user: '',
            autocomp_results: [],
            win: false,
            error: '',
            answer: [],
            hide_winning_popup: true,
            cant_guess: false,
            history: [],
            history_labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            hide_dropdown: true,
            attr: [Wins, Majors, Debut, Age, Country, College],
            labels: ["Wins", "Majors", "Debut", "Age", "Avg. Drive", "Origin"]
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
    
    componentDidMount() {
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
                user: data.user == "null" ? '' : data.user, num_guesses: data.guesses.length,
                series: [{
                    name: 'series-1',
                    data: [data.history]
                    }]})
        })
    }

    returnGuess(index) {
        return (
            <div class="big_form">
                <img src={Golfer} style={{ border: 'thick solid white', borderRadius: '50%', height: '60px', marginTop: '5px'}}></img>
                <div style={{clear: 'both'}}><h2 style={{fontFamily: "'Nexa', sans-serif;", fontWeight: 'bolder', marginBottom: '0', marginTop: '0', fontSize: window.innerWidth < 450 ? '34px' : '50px'}}>{this.state.guesses[index][1] + " " + this.state.guesses[index][2]}</h2></div>
                <table cellSpacing='5px' height='0px' style={{tableLayout: 'fixed', margin: '0 auto', width: window.innerWidth < 450 ? '100%' : '95%'}}>
                    {this.state.guesses[index].slice(3, 9).map((attr, index1) => {
                        var text_size = String(100 / String(attr).length) + '%'
                        var type = '';
                        var arrow = '';
                        if (index1 == 5) { 
                            if (this.state.guesses[index][index1 + 10] != 's') {
                                type = "third2";
                            }
                            else {
                                type = "third2_cor";
                            }
                        }
                        else if (index == 4) {
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
                        if (index1 != 5) {
                            return (   
                            <div style={{display: 'table-cell', width: '10%', height: '35px'}}>
                                {/* <img src={this.state.attr[index1]} style={{width: '100%', height: '25px'}}></img> */}
                                <div class={type}  style={{alignItems: 'center', height: '100%', marginTop: '0', marginBottom: '0', textAlign: 'center'}}>
                                    <div style={{width: '100%', lineHeight: '0px', display: 'flex', justifyContent: 'center', fontWeight: 'bold', alignContent: 'center', height: '100%', fontSize: '110%'}}>
                                    <p>{attr}{arrow}</p>
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
                                <div class={type}  style={{alignItems: 'center', height: '100%', marginTop: '0', marginBottom: '0', textAlign: 'center', display: 'inline-block', width: '100%', justifyContent: 'center', alignContent: 'center'}}>
                                <div style={{width: '100%', lineHeight: '0px', display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%', fontSize: '110%', position: 'relative'}}>
                                    <img class="image" src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"></img>
                                </div>
                                </div>
                            </div>
                            )
                        }

                    })}
                </table>
            </div>
        )
    }

    closePopup(e) {
        e.preventDefault()
        this.setState({hide_popup: true})
    }

    acceptGuess(e, guessid) {
        e.preventDefault();
        var new_guesses = this.state.num_guesses + 1;
        fetch(UserProfile.getUrl() + "/api/v1/check_guess/" + guessid, { credentials: 'include', method: 'GET' })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            var x = this.state.guesses;
            x.push(data.guess_data)
            document.getElementById('search').value = '';
            if (data.no_guesses) {
                this.setState({cant_guess: true, autocomp_results: []})
            }
            else if (data.guess_data[9] == 's') {
                if (this.state.user != '') {
                    this.state.history[data.numguesses - 1]++;
                }
                this.setState({autocomp_results: [], num_guesses: new_guesses, guesses: x, cant_guess: true, win: true, answer: data.guess_data.slice(0, 9), hide_winning_popup: false})
            }
            else {
                this.setState({guesses: x, win: data.success, num_guesses: new_guesses, autocomp_results: []})
            }
        })
    }

    logIn(e) {
        e.preventDefault();
        this.setState({hide_login_popup: false, hide_create_popup: true})
    }

    closeLoginPopup(e) {
        e.preventDefault();
        this.setState({hide_login_popup: true})
    }

    showCreateProfileWindow(e) {
        e.preventDefault();
        this.setState({hide_login_popup: true, hide_create_popup: false, error: ''});
    }

    closeCreatePopup(e) {
        e.preventDefault();
        this.setState({hide_create_popup: true})
    }

    closeWinningPopup(e) {
        e.preventDefault();
        this.setState({hide_winning_popup: true})
    }

    submitLogin(e) {
        e.preventDefault();
        fetch(UserProfile.getUrl() + '/login/' + e.target[1].value + '/' + e.target[2].value, { credentials: 'include', method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.correct_login) {
                this.setState({user: data.user, hide_login_popup: true, error: ''})
                window.location.reload();
            }
            else {
                this.setState({error: "Login Failed"})
            }
        });
    }

    submitCreate(e) {
        e.preventDefault();
        if (e.target[2].value != e.target[3].value) {
            this.setState({error: "Passwords do not match. Please try again."})
            return;
        }
        if (e.target[1].value == e.target[3].value) {
            this.setState({error: "Passwords do not match. Please try again."})
            return;
        }
        var formdata = new FormData();
        formdata.append("username", e.target[1].value);
        formdata.append("password", e.target[2].value);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        };

        fetch(UserProfile.getUrl() + "/api/v1/create", requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.success == 'yes') {
                this.setState({user: e.target[1].value, hide_create_popup: true})
                window.location.reload();
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
                this.forceUpdate();
            }
            else {
                this.setState({error: data.error})
            }
        });
    }
    
    showDropDown() {
        this.setState({hide_dropdown: !this.state.hide_dropdown})
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
        console.log(1 % 5)
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

    render() {
        var im_wid = '15%';
        if (window.innerWidth < 750) {
            im_wid = '30%';
        }
        return (
            <div style={{width: '100%', position: 'relative'}}>
                <div hidden={this.state.user == ''} style={{ marginRight: '5%', width: '15%', marginTop: '5px', marginBottom: '5px'}}>
                    <div style={{display: 'block'}}>
                        <button class="button_head" style={{fontSize: '15px', width: '100%', marginTop: '1vh'}} onClick={(event) => this.showDropDown(event)}> Profile </button>
                    </div>
                </div>
                <div class="big_form_drop" style={{position: 'absolute', clear: 'both', width: '100vw', overflow: 'visible', zIndex: '10000'}} hidden={this.state.hide_dropdown}>
                           {this.showHistory()}
                    </div>
                <div style={{clear: 'both'}}>
                    <img src={Scheffle} style={{height: '12vh', maxWidth: '85vw', marginBottom: '2vh'}}></img>
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
                <div style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
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
                    {this.state.num_guesses > 7 && this.returnGuess(7)}
                </div>
                <div>
                    {this.state.num_guesses > 6 && this.returnGuess(6)}
                </div>
                <div>
                    {this.state.num_guesses > 5 && this.returnGuess(5)}
                </div>
                <div>
                    {this.state.num_guesses > 4 && this.returnGuess(4)}
                </div>
                <div>
                    {this.state.num_guesses > 3 && this.returnGuess(3)}
                </div>
                <div>
                    {this.state.num_guesses > 2 && this.returnGuess(2)}
                </div>
                <div>
                    {this.state.num_guesses > 1 && this.returnGuess(1)}
                </div>
                <div>
                    {this.state.num_guesses > 0 && this.returnGuess(0)}
                </div>
                <form class="popup" hidden={this.state.hide_login_popup} onSubmit={(e) => this.submitLogin(e)}>
                    <button style={{float: 'right'}} onClick={(e) => this.closeLoginPopup(e)}>X</button>
                    <p style={{fontWeight: 'bold'}}>Log in to your account to track your progress, or create an account using the link below</p>
                    <p style={{display: 'inline'}}>Username:</p> <input type='text' style={{display: 'inline'}}></input><br></br>
                    <p style={{display: 'inline'}}>Password:</p> <input type='password' style={{display: 'inline'}}></input><br></br><br></br>
                    <button class="button_standard" type='submit'>Submit</button><br></br>
                    <button class="link_button" onClick={(e) => this.showCreateProfileWindow(e)}>Create Profile Here</button>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </form>
                <form class="popup" hidden={this.state.hide_create_popup} onSubmit={(e) => this.submitCreate(e)}>
                    <button style={{float: 'right'}} onClick={(e) => this.closeCreatePopup(e)}>X</button>
                    <p style={{fontWeight: 'bold'}}>Create Profile</p>
                    <p style={{display: 'inline'}}>Username:</p> <input type='text' style={{display: 'inline'}}></input><br></br>
                    <p style={{display: 'inline'}}>Password:</p> <input type='password' style={{display: 'inline'}}></input><br></br>
                    <p style={{display: 'inline'}}>Confirm Password:</p> <input type='password' style={{display: 'inline'}}></input><br></br><br></br>
                    <button class="button_standard" type='submit'>Create Profile</button><br></br>
                    <button class="link_button" onClick={(e) => this.logIn(e)}>Log In to Existing Account Here</button>
                    <p style={{color: 'red'}}>{this.state.error}</p>
                </form>
                <form class="popup" hidden={this.state.hide_winning_popup}>
                    <button style={{float: 'right'}} onClick={(e) => this.closeWinningPopup(e)}>X</button>
                    <p>Congrats for getting today's golfer, {this.state.answer[1]} {this.state.answer[2]}</p>
                    {!this.state.hide_winning_popup && this.returnGuess(this.state.num_guesses - 1)}
                    {!this.state.hide_winning_popup && this.showHistory()}   
                </form>
                <div class="popup" hidden={this.state.hide_popup}>
                    <button style={{float: 'right'}} onClick={(e) => this.closePopup(e)}>X</button>
                    Sorry bitch you lose
                </div>
            </div>   
        )
    }

}