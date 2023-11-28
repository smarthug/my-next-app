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
  const videoURL = useFundStore(state => state.videoURL);
  const setVideoURL = useFundStore(state => state.setVideoURL);

  const handleVideoURLChange = (event) => {
    setVideoURL(event.target.value);
  };

  return (
  
      <CssTextField
        label="Youtube URL"
        variant="outlined"
        color="secondary"
        fullWidth
      
        margin="normal"
        value={videoURL}
        onChange={handleVideoURLChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${videoURL.length}/50`}</InputAdornment>,
        }}
      />
   
  
  );
}
