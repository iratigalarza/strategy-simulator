import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { SourceSelectControl } from './CommonClasses.js'
import { getIndicatorStructure, getNumber } from './Functions.js';
import { indicators, sources } from './../Generic/Constants.js';

const defValues = {
    fastLength: 12,
    slowLength: 26,
    signalSmoothing: 9
}

export default class MACD extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            fastLength: defValues.fastLength,
            slowLength: defValues.slowLength,
            source: sources.close,
            signalSmoothing: defValues.signalSmoothing
        };
    }

    handleChange(event, stateName, isNumber){
        let value = event.target.value;

        if (isNumber)
            value = getNumber(value);

        this.setState({
            [stateName]: value
        });
    }

    saveData(){
        var parameters = {
            fastLength: this.state.fastLength,
            slowLength: this.state.slowLength,
            source: this.state.source,
            signalSmoothing: this.state.signalSmoothing
        }
        var indicator = getIndicatorStructure(indicators.macd, this.state.name, parameters)
        this.props.saveIndicator(indicator)
    }

    render(){
        const name = this.state.name;
        const fastLength = this.state.fastLength;
        const slowLength = this.state.slowLength;
        const signalSmoothing = this.state.signalSmoothing;
        const selectedSource = this.state.source;

        const saveDisabled = (name === "" || isNaN(fastLength) || isNaN(slowLength) || isNaN(signalSmoothing))
            ? true
            : false;

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="name"
                               label="Nombre"
                               onChange={(e) => {this.handleChange(e, 'name', false)}}/>

                </Grid>

                <Grid item xs={6}>
                    <TextField id="ema-slow-length"
                               label="Long. Lenta"
                               defaultValue={defValues.slowLength}
                               onChange={(e) => {this.handleChange(e, 'slowLength', true)}}/>

                </Grid>

                <Grid item xs={6}>
                    <TextField id="ema-fast-length"
                               label="Long. Rápida"
                               defaultValue={defValues.fastLength}
                               onChange={(e) => {this.handleChange(e, 'fastLength', true)}}/>

                </Grid>

                <Grid item xs={12}>
                    <SourceSelectControl handleChange={(e) => this.handleChange(e, 'source', false)}
                                         selectedSource={selectedSource} />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="ema-signal-smoothing"
                               label="Suavizador Señal"
                               defaultValue={defValues.signalSmoothing}
                               onChange={(e) => {this.handleChange(e, 'signalSmoothing', true)}}/>
                </Grid>

                <Grid item xs={12}>
                    <div class="center-div">
                        <Button variant="contained"
                                color="secondary"
                                fullWidth
                                disabled={saveDisabled}
                                onClick={() => this.saveData()}>
                            GUARDAR
                         </Button>
                    </div>
               </Grid>
            </Grid>
        )
    }
}
