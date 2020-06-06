import React, { Component } from 'react';
import Posts from '../components/Posts';

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <Posts />
            </div>
            
        )
    }
}

export default HomePage;