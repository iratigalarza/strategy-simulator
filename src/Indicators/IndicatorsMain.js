import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { saveJsonFile } from './Functions.js';
import { indicators, indicatorsFileName } from './../Generic/Constants.js';

import  { FirebaseContext } from './../Firebase';

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
        saveJsonFile(content, indicatorsFileName)
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
