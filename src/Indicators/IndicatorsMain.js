import React from 'react';
import firebase from 'firebase'

import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import { saveDataFirebase } from './Functions.js';
import { indicators, indicatorsFileName } from './../Generic/Constants.js';

// TODO - Refactorizar
import RSI from './RSI.js';
import MACD from './MACD.js';
import EMA from './EMA.js';
import SAR from './SAR.js';
// import './Generic.js'

export default class IndicatorsCardContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndicator: ''
        };
    }

    handleChange(event){
        let newValue = event.target.value
        this.setState({
            selectedIndicator: newValue
        })
    }

    saveIndicator(content){
        const db = firebase.firestore();

        var count = db.collection("indicators").doc("indicators-count").get()
            .then((doc) => {
                if (doc.exists){
                    var newCount = doc.data().Count + 1;
                    // console.log("Document data:", doc.data());
                    // var document = {}
                    var docId = "IND00" + newCount;
                    content.id = docId;
                    // document[docId] = content
                    // document.push()
                    saveDataFirebase("indicators", docId, content, "indicators-count", newCount);
                    // console.log(docContent);
                }
                else
                    console.log("No such document!");
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
        // saveJsonFile(content, indicatorsFileName)
        // saveDataFirebase("indicators", indicator);
        // console.log(count);

    //     db.collection("indicators").get().then((querySnapshot) => {
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });
// });
    }



    render(){
        const classes = makeStyles(theme => ({
            card: {
              minWidth: 200,
            },
            title: {
              fontSize: 22,
            },
            pos: {
              marginBottom: 12,
            }
        }));

        const indicator = this.state.selectedIndicator;

        const rsi = (indicator === indicators.rsi) && (<RSI saveIndicator={(c) => this.saveIndicator(c)} />);
        const macd = (indicator === indicators.macd) && (<MACD saveIndicator={(c) => this.saveIndicator(c)}/>);
        const ema = (indicator === indicators.ema) && (<EMA saveIndicator={(c) => this.saveIndicator(c)}/>);
        const sar = (indicator === indicators.sar) && (<SAR saveIndicator={(c) => this.saveIndicator(c)}/>);

        return(
            <CardContent>
                <Typography variant="h5" color="secondary" gutterBottom align="center">
                    Indicadores
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="indicators-label">Tipo</InputLabel>
                            <Select labelId="indicators-label"
                                   id="indicadores-select"
                                   value={indicator}
                                   onChange={(e) => { this.handleChange(e)} } >
                                <MenuItem value={indicators.rsi}>{indicators.rsi}</MenuItem>
                                <MenuItem value={indicators.ema}>{indicators.ema}</MenuItem>
                                <MenuItem value={indicators.macd}>{indicators.macd}</MenuItem>
                                <MenuItem value={indicators.sar}>{indicators.sar}</MenuItem>
                           </Select>
                       </FormControl>
                   </Grid>

                   <Grid item xs={12}>
                       {rsi}
                       {macd}
                       {ema}
                       {sar}
                   </Grid>

               </Grid>

           </CardContent>
        )
    }
}
