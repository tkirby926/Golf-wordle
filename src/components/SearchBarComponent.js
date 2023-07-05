import './css/SearchBarComponent.css';
import React from 'react';

export class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guess_val: "",
            num_guesses: 0
        }
    }

    checkAns(e) {
        e.preventDefault();
        fetch('blahblahblah')
        .then()
        
    }

    render() {
        return (
            <div>
            <div class="box">
                <form name="search">
                    <input type="text" style={{caretColor: 'transparent'}} placeholder="Guess Here" id='search' class="input" name="txt" onMouseOut={(e) => this.blurVal(e)} onKeyUp={(e)=>this.checkAns(e)} />
                </form>
            </div>
            </div>
        )
    }

    blurVal(e) {
        e.preventDefault();
        document.getElementById('search').value = "";
    }

}