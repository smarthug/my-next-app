import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import db from '../utils/firebase.js';

import Link from "next/link";
import { Button } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc; // Assuming a light gray border
  background-color: #fff;
`;

const ImagePlaceholder = styled.div`
  width: 172px;
  height: 129px;
  background-color: #f0f0f0; // Placeholder color
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
`;

const TextSection = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-left: 10px;
//   border: none;
//   background-color: #e0e0e0; // Assuming a light gray background
//   cursor: pointer;

//   &:hover {
//     background-color: #d4d4d4; // Slightly darker on hover
//   }
// `;

export default function MyComponent(props) {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  

  useEffect(() => {

      const fetchData = async () => {
          var DB = await db.collection('Projects').doc(props.projectContract.toLowerCase()).get().then(async function(data) {
              console.log(data.data())
              if(data.data() != undefined){
                setTitle(data.data().Title);
                setImageURL(data.data().ImageURL);

              }
          });
      }
      fetchData();

    }, [])

    return (
      <Wrapper>
        <ImagePlaceholder>
          {/* <span>Image</span> Placeholder for the image */}
          <img src={imageURL} />
        </ImagePlaceholder>
        <TextSection>
          <div>{title}</div>
          <div>{imageURL}</div>
        </TextSection>
        <div>
          <Button component={Link} href={`/creators/projects/${props.projectContract}`} variant="contained">투표 등록</Button>
          {/* <Button>관리</Button> */}
          {/* <Button>삭제</Button> */}
        </div>
      </Wrapper>
    )
  }
