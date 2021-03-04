import React from 'react';
import '../css/App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';

class App extends React.Component
{
    render()
    {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
