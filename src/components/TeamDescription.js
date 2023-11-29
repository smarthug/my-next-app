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
  const teamContent = useFundStore(state => state.teamContent);
  const setTeamContent = useFundStore(state => state.setTeamContent);

  const handleTeamContentChange = (event) => {
    setTeamContent(event.target.value);
  }


  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="팀 소개"
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={teamContent}
        onChange={handleTeamContentChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${teamContent.length}/300`}</InputAdornment>,
        }}
      />
   
    </form>
  );
}
