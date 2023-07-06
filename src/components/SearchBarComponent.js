import './css/SearchBarComponent.css';
import React from 'react';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: [['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 8, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'],
            ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33']]
        }
    }

    checkAns(e) {
        e.preventDefault();
        fetch('blahblahblah')
        .then()
        
    }

    returnGuess(index) {
        console.log(index)
        return (
            <div class="big_form">
                <div style={{clear: 'both'}}><h2 style={{fontFamily: 'Copperplate', fontSize: window.innerWidth < 450 ? '30px' : '40px'}}>{this.state.guesses[index][0] + " " + this.state.guesses[index][1]}</h2></div>
                <table cellSpacing='5px' style={{margin: '0 auto', width: window.innerWidth < 450 ? '95%' : '80%'}}>
                    {this.state.guesses[index].slice(2, 10).map((attr, index1) => {
                        return (
                        <div class={index1 < 2 ? "first2" : index < 4 ? "second2" : "third2"}>
                            {attr}
                        </div>
                        )
                    })}
                </table>
            </div>
        )
    }

    triggerLoss() {
        
    }

    acceptGuess(e) {
        e.preventDefault();
        var new_guesses = this.state.num_guesses + 1;
        this.setState({num_guesses: new_guesses})
        if (new_guesses == 8) {
            this.triggerLoss();
        }
    }

    render() {
        return (
            <div style={{width: '100%', position: 'relative'}}>
            <div class="box">
                <form name="search" onSubmit = {(e) => this.acceptGuess(e)}>
                    <input type="text" style={{caretColor: 'transparent'}}  placeholder="Guess Here" id='search' class="input" name="txt" onKeyUp={(e)=>this.checkAns(e)} />
                </form>
            </div>
            <div>
                {this.state.num_guesses > 0 && this.returnGuess(0)}
            </div>
            <div>
                {this.state.num_guesses > 1 && this.returnGuess(1)}
            </div>
            <div>
                {this.state.num_guesses > 2 && this.returnGuess(2)}
            </div>
            <div>
                {this.state.num_guesses > 3 && this.returnGuess(3)}
            </div>
            <div>
                {this.state.num_guesses > 4 && this.returnGuess(4)}
            </div>
            <div>
                {this.state.num_guesses > 5 && this.returnGuess(5)}
            </div>
            <div>
                {this.state.num_guesses > 6 && this.returnGuess(6)}
            </div>
            <div>
                {this.state.num_guesses > 7 && this.returnGuess(7)}
            </div>
            <div class="popup" hidden={this.state.num_guesses < 8}>
                Sorry bitch you lose
            </div>
            </div>   
        )
    }

}