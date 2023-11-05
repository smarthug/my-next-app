import React from 'react';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomCard = styled(Card)({
  width: '1160px', // Updated width
  margin: 'auto',
  position: 'relative', // to position the buttons absolutely
  // Add additional styling to ensure the card doesn't stretch beyond the view width on smaller screens
  maxWidth: '100%',
  boxSizing: 'border-box',
  display: 'flex',
});

const CardImage = styled('div')({
  height: '140px',
  backgroundColor: '#e0e0e0',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CardActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  bottom: '10px',
  right: '10px',
});

const CustomButton = styled(Button)({
  margin: '0 10px',
  '&:last-child': {
    marginRight: 0,
  },
});

function CreatedProjectCard() {
  return (
    <CustomCard>
      <CardContent>
        <CardImage>
          {/* This is a placeholder for the image */}
          <Typography variant="caption">이미지 영역</Typography>
        </CardImage>
        <Typography variant="subtitle1" color="textSecondary">
          전송 중
        </Typography>
        <Typography variant="body2" component="p">
          제목영역
        </Typography>
        <Typography variant="body2" color="textSecondary">
          testfefwefef
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton size="small">리뷰</CustomButton>
        <CustomButton size="small">상제</CustomButton>
      </CardActions>
    </CustomCard>
  );
}

export default CreatedProjectCard;
