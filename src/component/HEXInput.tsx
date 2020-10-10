import React from 'react';
import { CSSProperties } from 'react';
//import React, { CSSProperties } from 'react';
import TextField from '@material-ui/core/TextField';
//import InputAdornment from '@material-ui/core/InputAdornment'

interface HEXInputProps{
    value:string;
    change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: CSSProperties;
}
export default function HEXInput(props:HEXInputProps){
    return (
        <div >
        <TextField
          label="16进制颜色如:#76eec6"
          type="text"
          value={props.value}
          onChange={props.change}
          // InputProps={{
          // startAdornment: <InputAdornment position="start">#...</InputAdornment>,
          // }}
          variant="outlined"
        />
        </div>
    )
}