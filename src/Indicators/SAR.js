import React from 'react';

import { getIndicatorStructure, getDefValue, getNumber } from './Functions.js';
import { indicators } from './../Generic/Constants.js';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const defValues = {
    start: 0.02,
    increment: 0.02,
    maxValue: 0.2
}

export default class SAR extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            start: defValues.start,
            increment: defValues.increment,
            maxValue: defValues.maxValue
        };
    }

    handleChange(event, stateName, isNumber){
        let value = event.target.value;

        if (isNumber)
            value = getNumber(value);

        this.setState({
            [stateName]: value
        })
    }

    saveData(){
        var parameters = {
            start: this.state.start,
            increment: this.state.increment,
            maxValue: this.state.maxValue,
        }
        var indicator = getIndicatorStructure(indicators.sar, this.state.name, parameters)
        this.props.saveIndicator(indicator)
    }

    render(){
        const name = this.state.name;
        const start = this.state.start;
        const increment = this.state.increment;
        const maxValue = this.state.maxValue;

        const saveDisabled = (name === "" || isNaN(start) || isNaN(increment) || isNaN(maxValue))
            ? true
            : false;

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="sar-name"
                               label="Nombre"
                               onChange={(e) => {this.handleChange(e, 'name', false)}}/>

                </Grid>

                <Grid item xs={12}>
                    <TextField id="sar-start"
                               label="Comienzo"
                               defaultValue={defValues.start}
                               onChange={(e) => {this.handleChange(e, 'start', true)}}/>

                </Grid>

                <Grid item xs={12}>
                    <TextField id="sar-increment"
                               label="Incremento"
                               defaultValue={defValues.increment}
                               onChange={(e) => {this.handleChange(e, 'increment', true)}}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField id="ema-maxValue"
                               label="Valor máximo"
                               defaultValue={defValues.maxValue}
                               onChange={(e) => {this.handleChange(e, 'maxValue', true)}}/>
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
