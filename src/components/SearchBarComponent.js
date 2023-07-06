import './css/SearchBarComponent.css';
import React from 'react';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: []
        }
    }

    checkAns(e) {
        e.preventDefault();
        fetch('blahblahblah')
        .then()
        
    }

    returnGuess(index) {
        return (
            <div>
                <div style={{clear: 'both'}}>{this.state.guesses[index][0] + " " + this.state.guesses[index][1]}</div>
                <div style={{display: 'table'}}>
                    {this.state.guesses[index].splice(2, 10).map((time, index1) => {
                        <div class={index1 < 2 ? "first2" : index < 4 ? "second2" : index < 6 ? "third2" : "last2"}>

                        </div>
                    })}
                </div>
            </div>
        )
    }

    checkKey(e) {
        e.preventDefault();
        if (e.which == 13) {
            this.setState({num_guesses: this.state.num_guesses + 1})
        }
    }

    render() {
        return (
            <div>
            <div class="box">
                <form name="search">
                    <input type="text" style={{caretColor: 'transparent'}} onKeyUp={(e) => this.checkKey(e)} placeholder="Guess Here" id='search' class="input" name="txt" onKeyUp={(e)=>this.checkAns(e)} />
                </form>
            </div>
            <div>
                {this.state.guesses.length > 0 && this.returnGuess(0)}
            </div>
            <div>
                {this.state.guesses.length > 1 && this.returnGuess(1)}
            </div>
            <div>
                {this.state.guesses.length > 2 && this.returnGuess(2)}
            </div>
            <div>
                {this.state.guesses.length > 3 && this.returnGuess(3)}
            </div>
            <div>
                {this.state.guesses.length > 4 && this.returnGuess(4)}
            </div>
            <div>
                {this.state.guesses.length > 5 && this.returnGuess(5)}
            </div>
            <div>
                {this.state.guesses.length > 6 && this.returnGuess(6)}
            </div>
            <div>
                {this.state.guesses.length > 7 && this.returnGuess(7)}
            </div>
            </div>
        )
    }

}