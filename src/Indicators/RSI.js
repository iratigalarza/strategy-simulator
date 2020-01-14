import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { SourceSelectControl } from './CommonClasses.js'
import { getIndicatorStructure, getNumber } from './Functions.js';
import { indicators, sources } from './../Generic/Constants.js';

const defValues = {
    length: 14
}

export default class RSI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            length: defValues.length,
            source: sources.close
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
            length: this.state.length,
            source: this.state.source
        }
        var indicator = getIndicatorStructure(indicators.rsi, this.state.name, parameters)
        this.props.saveIndicator(indicator)
    }

    render(){
        const name = this.state.name;
        const length = this.state.length;
        const selectedSource = this.state.source;

        const saveDisabled = (name === "" || isNaN(length))
            ? true
            : false;

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="name"
                               label="Nombre"
                               onChange={(e) => {this.handleChange(e, 'name', false)}}/>

                </Grid>

                <Grid item xs={12}>
                    <TextField id="rsi-length"
                               label="Length"
                               defaultValue={defValues.length}
                               onChange={(e) => {this.handleChange(e, 'length', true)}}/>
                </Grid>
                <Grid item xs={12}>
                    <SourceSelectControl handleChange={(e) => this.handleChange(e, 'source', false)}
                                         selectedSource={selectedSource} />
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
