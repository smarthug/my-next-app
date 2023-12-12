import * as React from 'react';
import { styled } from '@mui/material/styles';

const FeatureImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  objectFit: 'cover',
  // Add more styles as needed
}));

export default FeatureImage;
