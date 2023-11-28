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

export default function CustomizedInputs() {
  const fundContent = useFundStore(state => state.fundContent);
  const setFundContent = useFundStore(state => state.setFundContent);

  const handleFundContentChange = (event) => {
    setFundContent(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="프로젝트 요약"
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={fundContent}
        onChange={handleFundContentChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${fundContent.length}/50`}</InputAdornment>,
        }}
      />
   
    </form>
  );
}
