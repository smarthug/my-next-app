import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import useFundStore from '../utils/store';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'red',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
    },
  },
});

export default function ProjectVideo() {
  const website = useFundStore(state => state.website);
  const setWebsite = useFundStore(state => state.setWebsite);

  const handleVideoURLChange = (event) => {
    setWebsite(event.target.value);
  };

  return (
  
      <CssTextField
        label="Website URL"
        variant="outlined"
        color="secondary"
        fullWidth
      
        margin="normal"
        value={website}
        onChange={handleVideoURLChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${website.length}/50`}</InputAdornment>,
        }}
      />
   
  
  );
}
