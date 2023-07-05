import React from 'react';
import './css/HomeComponent.css';
import { SearchBarComponent } from './SearchBarComponent';

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div class="center_text">
                    <SearchBarComponent />
                </div>
            </div>
        )
    }

}