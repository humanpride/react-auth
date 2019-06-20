import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';

function Input(props)
{
    // кастомизируемое поле ввода
    const [showPassword, setShowPass] = useState(false);

    const handleClickShowPassword = () => {
        setShowPass(!showPassword);
    };
    return (
        <TextField
            fullWidth
            error={props.error}
            id={props.id}
            label={props.label}
            type={props.type === 'password' && showPassword ? 'text' : props.type}
            name={props.name}
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            margin="dense"
            variant="outlined"
            helperText={props.error && props.helperMsg ? props.helperMsg : ''}
            InputProps={props.name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            aria-label="Toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : {}}
        />
    );
}

export default Input;
