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
                <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6567831601079042"
     crossorigin="anonymous"></script>
                </head>
                <div class="center_text">
                    <SearchBarComponent />
                </div>
                {/* <FooterComponent /> */}
            </div>
        )
    }

}