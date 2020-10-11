import React from 'react';
import { CSSProperties } from 'react';
//import React, { CSSProperties } from 'react';
import TextField from '@material-ui/core/TextField';

interface HEXInputProps{
    value:string;
    change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: CSSProperties;
}
export default function HEXInput(props:HEXInputProps){
    return (
        <div >
        <TextField
          label="hex"
          type="text"
          value={props.value}
          onChange={props.change}
          // InputProps={{
          // startAdornment: <InputAdornment position="start">#...</InputAdornment>,
          // }}
          variant="outlined"
          style={{width:"150px"}}
        />
        </div>
    )
}