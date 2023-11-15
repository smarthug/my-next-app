import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Chip, Container, MenuItem, Select } from '@mui/material';

// import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
// import "react-image-gallery/styles/css/image-gallery.css";



// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';

import ProjectInputRow from './ProjectInputRow';
import ProjectYoutube from './Youtube';
import Category from './Category';
import ProjectTitle from './ProjectTitle';
import ProjectDescription from './ProjectDescription';
import ProjectImageUploader from './ProjectImageUploader';
import RoadMap from './roadmap'



export default function ColumnsGrid() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%', marginTop: "64px" }}>
            <Typography variant="h4" component="div" gutterBottom>
                프로젝트 기획
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="기본정보" />
                    <Tab label="마일스톤" />
                    <Tab label="신뢰와 안전" />
                    {/* <Tab label="추천" /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>



                <ProjectInputRow label="프로젝트 카테고리"
                    description="프로젝트 성격과 가장 일치하는 카테고리를 선택해주세요.적합하지 않을 경우 운영자에 의해 조정될 수 있습니다.">

                    <Category />
                </ProjectInputRow>

                <ProjectInputRow label="프로젝트 제목" description="프로젝트의 주제, 창작물의 특징이 드러나는 멋진 제목을 붙여주세요.">

                    <ProjectTitle />
                </ProjectInputRow>

                <ProjectInputRow label="프로젝트 요약" description="후원자 분들이 프로젝트를 빠르게 이해할 수 있도록 명확하고 간략하게 소개해주세요.">

                    <ProjectDescription />
                </ProjectInputRow>
                <ProjectInputRow label="프로젝트 대표 이미지" description="후원자들이 프로젝트의 내용을 쉽게 파악하고 좋은 인상을 받을 수 있도록 이미지 가이드라인을 따라 주세요.">

                    <ProjectImageUploader />
                </ProjectInputRow>

                <ProjectInputRow label="프로젝트 대표 영상" description="2~3분 이내의 짧은 영상으로 프로젝트를 효과적으로 소개해보세요. 대표 영상을 등록하시면 프로젝트 상세에서 이미지와 함께 제공됩니다.">

                    <ProjectYoutube />
                    
                </ProjectInputRow>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <RoadMap />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                신뢰와 안전
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={3}>
                추천
            </CustomTabPanel> */}
        </Box>

    );
}



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

