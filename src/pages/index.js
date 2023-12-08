import React, { useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, styled, Box } from '@mui/material';

import Landing from '@/components/Landing';


import { collection, getDocs } from "firebase/firestore";


const StyledCard = styled(Card)({
  // Add custom styles here
});

const projects = [
  // ... your projects data
  0, 0, 0, 0
];

function Home() {


  // useEffect(async () => {




  //   const querySnapshot = await getDocs(collection(db, "Projects"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //   });





  // }, []);


  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
        margin: 2
      }}
    >


      <Container>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Landing />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
