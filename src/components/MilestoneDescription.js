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

export default function CustomizedInputs(props) {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');


  const handleDetailChange = (event) => {
    const milestoneDesc = useFundStore.getState().milestoneDesc;
    const tmpMilestoneDesc = [...milestoneDesc]
    const tmpDetail = event.target.value;
    console.log(tmpMilestoneDesc);
    console.log(tmpDetail)
    console.log(props.index);


    tmpMilestoneDesc[props.index + 1] = tmpDetail
    useFundStore.setState({ milestoneDesc: [...tmpMilestoneDesc] })
  };

  const handleSubTitleChange = (event) => {
    setSubTitle(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="마일스톤 요약"
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        defaultValue={props.detail}
        onChange={handleDetailChange}
        InputProps={{
          // endAdornment: <InputAdornment position="end">{`${title.length}/50`}</InputAdornment>,
        }}
      />
   
    </form>
  );
}
