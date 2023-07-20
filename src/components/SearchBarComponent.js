import './css/SearchBarComponent.css';
import React from 'react';
import UserProfile from './Userprofile';
import Scheffle from './Scheffle_logo.jpeg';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: [['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 8, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'],
            ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33']],
            hide_popup: true,
            hide_login_popup: true,
            user: '',
            autocomp_results: [],
            win: false
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
    }
    
    componentDidMount() {
        fetch(UserProfile.getUrl() + "/api/v1/check_user", { credentials: 'include', method: 'GET' })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            var hide_popup = true;
            if (data.user == 'null') {
                hide_popup = false;
            }
            this.setState({guesses: data.guesses, user: data.user, hide_login_popup: hide_popup, num_guesses: data.guesses.length})
        })
    }

    returnGuess(index) {
        return (
            <div class="big_form">
                <div style={{clear: 'both'}}><h2 style={{fontFamily: 'Copperplate', fontSize: window.innerWidth < 450 ? '30px' : '40px'}}>{this.state.guesses[index][1] + " " + this.state.guesses[index][2]}</h2></div>
                <table cellSpacing='5px' style={{margin: '0 auto', width: window.innerWidth < 450 ? '95%' : '80%'}}>
                    {this.state.guesses[index].slice(3, 10).map((attr, index1) => {
                        var type;
                        if (index1 < 6) type = "third2";
                        if (index1 < 4) type = "second2";
                        if (index1 < 2) type = "first2";
                        return (
                        <div class={type}>
                            {attr}
                        </div>
                        )
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
        this.setState({num_guesses: new_guesses})
        fetch(UserProfile.getUrl() + "/api/v1/check_guess/" + guessid, { credentials: 'include', method: 'GET' })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            var x = this.state.guesses;
            x.push(data.guess_data)
            this.setState({guesses: x, win: data.success})
        })
        if (new_guesses == 8) {
            this.setState({hide_popup: false})
            document.getElementById('search').value = "You lose"
        }
    }

    closeLoginPopup(e) {
        e.preventDefault();
        this.setState({hide_login_popup: true})
    }

    render() {
        var im_wid = '15%';
        var font_size = '18px';
        if (window.innerWidth < 750) {
            im_wid = '30%';
            font_size = '14px';
        }
        return (
            <div style={{width: '100%', position: 'relative'}}>
            <div class="box">
                <form name="search">
                    <input disabled={this.state.num_guesses >= 8} type="text" style={{caretColor: 'transparent'}}  placeholder="Guess Here" id='search' class="input" name="txt" onKeyUp={(e) => this.autoComp(e)} />
                    <div>{this.state.autocomp_results.slice(0, 5).map((result, index) => {
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
            <div class="popup" hidden={this.state.hide_login_popup}>
                <button style={{float: 'right'}} onClick={(e) => this.closeLoginPopup(e)}>X</button>
                Sorry bitch you lose
            </div>
            <div class="popup" hidden={this.state.hide_popup}>
                <button style={{float: 'right'}} onClick={(e) => this.closePopup(e)}>X</button>
                Sorry bitch you lose
            </div>
            </div>   
        )
    }

}