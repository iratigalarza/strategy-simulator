import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { sources } from './../Generic/Constants.js';

const _ = require('lodash')

export class SourceSelectControl extends React.Component{
    constructor(props){
		super(props);
    }

    render(){
        let menuItems = []
        _.forEach(sources, (source) => {
            menuItems.push(
                <MenuItem key={source} value={source}>{source}</MenuItem>
            )
        })

        return(
            <FormControl>
                <InputLabel id="source-label">Fuente</InputLabel>
                <Select labelId="source-label"
                        id="source-select"
                        value={this.props.selectedSource}
                        onChange={(e) => this.props.handleChange(e)} >
                    {menuItems}
                </Select>
            </FormControl>
        )
    }
}
