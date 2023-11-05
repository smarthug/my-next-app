import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Use the styled API to create a custom styled button
const CustomButton = styled(Button)({
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid #ddd',
  boxShadow: 'none',
  borderRadius: '4px',
  padding: '5px 10px',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    borderColor: '#bbb',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

function UserButton() {
  return (
    <CustomButton>
      로그인/회원가입
    </CustomButton>
  );
}

export default UserButton;
