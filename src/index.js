import React from 'react';
import ReactDOM from 'react-dom';
import AppTopBar from './Components/AppTopBar.js'
import IndicatorsCardContent from './Indicators/IndicatorsMain.js'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import app from 'firebase/app'

import './index.css'
import { firebaseConfig } from './firebase.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedPage: "inicio"
        };
    }

    componentDidMount(){
        app.initializeApp(firebaseConfig);
    }

    render(){
        return(
            <div>
                <div>
                    <AppTopBar />
                </div>
                <div class='main-card'>
                    <Card>
                        <IndicatorsCardContent />
                    </Card>
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
