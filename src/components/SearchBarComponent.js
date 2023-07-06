import './css/SearchBarComponent.css';
import React from 'react';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0,
            guesses: [['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'],
            ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33'], ['Jon', 'Rahm', 4, 3, 'UCLA', 'Spain', '2008', '33']]
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
                <div style={{clear: 'both'}}><h2>{this.state.guesses[index][0] + " " + this.state.guesses[index][1]}</h2></div>
                <table cellSpacing='5px' style={{margin: '0 auto', width: window.innerWidth < 450 ? '95%' : '80%'}}>
                    {this.state.guesses[index].splice(2, 10).map((attr, index1) => {
                        console.log(attr);
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

    acceptGuess(e) {
        e.preventDefault();
        this.setState({num_guesses: this.state.num_guesses + 1})
    }

    render() {
        return (
            <div style={{width: '100%'}}>
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
            </div>
        )
    }

}