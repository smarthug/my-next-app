import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, styled, Box } from '@mui/material';

import Landing from '@/components/Landing';
import db from '../utils/firebase.js';


import { collection, getDocs } from "firebase/firestore";


const StyledCard = styled(Card)({
  // Add custom styles here
});

const projects = [
  // ... your projects data
  0, 0, 0, 0
];
var tempProjectList = new Array();

function Home() {
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
      if(projectDetails.length == 0){
          getProjectData();
      }
  });

  const getProjectData = async() => {
      var temp = await db.collection('Projects').get();
      console.log(temp.docs[0].data());
      for(let i = 0;i<temp.docs.length;i++){
          tempProjectList.push({
              title: temp.docs[i].data().Title,
              description: temp.docs[i].data().Description,
              creator: temp.docs[i].id,
              images: temp.docs[i].data().ImageURL,
              funding: temp.docs[i].data().FundGoal,
              percentageFunded: '84% funded',
              daysToGo: temp.docs[i].data().FundEnd,
              location: 'Rolleston, NZ'
          })
      }
      setProjectDetails(tempProjectList);
  }



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
          {tempProjectList.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Landing projectDetail={project}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
