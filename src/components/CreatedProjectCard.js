import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc; // Assuming a light gray border
  background-color: #fff;
  width: 1160px; // Adjust width as necessary
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

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #e0e0e0; // Assuming a light gray background
  cursor: pointer;

  &:hover {
    background-color: #d4d4d4; // Slightly darker on hover
  }
`;

const MyComponent = () => (
  <Wrapper>
    <ImagePlaceholder>
      <span>Image</span> {/* Placeholder for the image */}
    </ImagePlaceholder>
    <TextSection>
      <div>제목없음</div>
      <div>testfewfef</div>
    </TextSection>
    <div>
      <Button>관리</Button>
      <Button>삭제</Button>
    </div>
  </Wrapper>
);

export default MyComponent;
