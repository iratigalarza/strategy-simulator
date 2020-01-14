import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { SourceSelectControl } from './CommonClasses.js'
import { getIndicatorStructure, getDefValue, getNumber } from './Functions.js';
import { indicators, sources } from './../Generic/Constants.js';

const defValues = {
    length: 9,
    offset: 0
}

export default class EMA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            length: defValues.length,
            source: sources.close,
            offset: defValues.offset
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
            source: this.state.source,
            offset: this.state.offset
        }
        var indicator = getIndicatorStructure(indicators.ema, this.state.name, parameters)
        this.props.saveIndicator(indicator)
    }

    render(){
        const name = this.state.name;
        const length = this.state.length;
        const selectedSource = this.state.source;
        const offset = this.state.offset;

        const saveDisabled = (name === "" || isNaN(length) || isNaN(offset))
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
                    <TextField id="length"
                               label="Longitud"
                               defaultValue={defValues.length}
                               onChange={(e) => {this.handleChange(e, 'length', true)}} />
                </Grid>

                <Grid item xs={12}>
                    <SourceSelectControl selectedSource={selectedSource}
                                         handleChange={(e) => this.handleChange(e, 'source', false)} />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="offset"
                               label="Offset"
                               defaultValue={defValues.offset}
                               onChange={(e) => {this.handleChange(e, 'offset', true)}}/>
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
