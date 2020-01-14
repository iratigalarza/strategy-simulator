import React from 'react';
import ReactDOM from 'react-dom';
import AppTopBar from './Components/AppTopBar.js'
import IndicatorsCardContent from './Indicators/IndicatorsMain.js'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import './index.css'
// import Firebase, { FirebaseContext } from './Firebase';
import app from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCLTKPgI0qiXgPn2h1zzHfIjdpgcgsLBio",
  authDomain: "strategy-simulator.firebaseapp.com",
  databaseURL: "https://strategy-simulator.firebaseio.com",
  projectId: "strategy-simulator",
  storageBucket: "strategy-simulator.appspot.com",
  messagingSenderId: "699964777883",
  appId: "1:699964777883:web:e15ba7720050d8b539ad3e",
  measurementId: "G-BDJDDVDRM2"
};


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
