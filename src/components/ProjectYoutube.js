import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

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
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubTitleChange = (event) => {
    setSubTitle(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="프로젝트 요약"
        variant="outlined"
        color="secondary"
        fullWidth
      
        margin="normal"
        value={title}
        onChange={handleTitleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{`${title.length}/50`}</InputAdornment>,
        }}
      />
   
    </form>
  );
}
