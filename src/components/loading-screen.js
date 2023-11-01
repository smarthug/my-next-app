import * as React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Text = styled('span')({
  fontSize: '24px',
});

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
