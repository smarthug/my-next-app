import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Chip, Container } from '@mui/material';

// import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";



// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';



export default function ColumnsGrid() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%' }}>
            <h1>프로젝트 기획</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="기본정보" />
                    <Tab label="마일스톤" />
                    <Tab label="신뢰와 안전" />
                    {/* <Tab label="추천" /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>



                기본정보

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                마일스톤
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

