import React from 'react';
import './css/HomeComponent.css';
import { SearchBarComponent } from './SearchBarComponent';
import { FooterComponent } from './FooterComponent';

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <div class="center_text">
                    <SearchBarComponent />
                </div>
                {/* <FooterComponent /> */}
            </div>
        )
    }

}