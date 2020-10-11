import React, { CSSProperties } from 'react';
import TextField from '@material-ui/core/TextField';
interface InputProps {
    value: number;
    change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: CSSProperties;
    label:string
}

export default function Input(props:InputProps){
    return (
        <div style={props.style}>
        <TextField
          label={props.label}
          type="number"
          // placeholder="r:[0,255]"
          value={props.value}
          onChange={props.change}
        //   InputProps={{
        //     startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        //   }}
          variant="outlined"
          style={{width:"110px"}}
        />
        </div>
    )
}