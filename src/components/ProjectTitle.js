import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
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

export default function CustomizedInputs() {
  const title = useFundStore(state => state.title);
  const setTitle = useFundStore(state => state.setTitle);
  
  const subTitle = useFundStore(state => state.subTitle);
  const setSubTitle = useFundStore(state => state.setSubTitle);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubTitleChange = (event) => {
    setSubTitle(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="긴 제목"
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
        value={title}
        onChange={handleTitleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${title.length}/32`}</InputAdornment>,
        }}
      />
      <CssTextField
        label="짧은 제목"
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
        value={subTitle}
        onChange={handleSubTitleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${subTitle.length}/7`}</InputAdornment>,
        }}
      />
    </form>
  );
}
