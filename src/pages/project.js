import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Chip, Container } from '@mui/material';

// import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from '../components/ImageGallery'

// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
// import Box from '@mui/material/Box';


const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        embedUrl:
            "https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ColumnsGrid() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Container maxWidth="lg">


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid xs={12} lg={8}>
                        {/* <ImageGallery items={images} /> */}
                        <ImageGallery />
                    </Grid>
                    <Grid xs={12} lg={4}>
                        <InfoCard />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="프로젝트 계획" {...a11yProps(0)} />
                        <Tab label="업데이트" {...a11yProps(1)} />
                        <Tab label="커뮤니티" {...a11yProps(2)} />
                        <Tab label="추천" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>

                    {/* <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />
                    <Chip
                        label="Clickable Link"
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                    /> */}
                    <Box
                        display="flex"
                        // justifyContent="center"
                        alignItems="center"
                        gap={2}
                    >
                        <Chip label="소개" color="primary" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                        <Chip label="예산" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                        <Chip label="일정" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                        <Chip label="팀 소개" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                        <Chip label="선물 설명" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                        <Chip label="신뢰와 안전" component="a"
                            href="#basic-chip"
                            variant="outlined"
                            clickable />
                    </Box>

                    프로젝트 계획

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    업데이트
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    커뮤니티
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    추천
                </CustomTabPanel>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid xs={12} lg={8}>

                    </Grid>
                    <Grid xs={12} lg={4}>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
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

function InfoCard() {
    return (
        <div class="card">
            <div class="card-title">목표액</div>
            <div class="card-data">323,000원 <span>64%</span></div>
            <div class="card-item">남은시간</div>
            <div class="card-data">31일</div>
            <div class="card-item">후원자</div>
            <div class="card-data">9명</div>
            <div class="card-item">목표액</div>
            <div class="card-data">500,000원</div>
            <div class="card-item">펀딩 기간</div>
            <div class="card-data">2023.10.25 ~ 2023.11.25 <span class="highlight">31일 남음</span></div>
            <div class="card-item">결제</div>
            <div class="card-data">목표액 달성시 2023.11.26에 결제 진행</div>
        </div>
    );
}

function PictureSlide() {

    return (
        <div class="card">
            <div class="card-title">목표액</div>
            <div class="card-data">323,000원 <span>64%</span></div>
            <div class="card-item">남은시간</div>
            <div class="card-data">31일</div>
            <div class="card-item">후원자</div>
            <div class="card-data">9명</div>
            <div class="card-item">목표액</div>
            <div class="card-data">500,000원</div>
            <div class="card-item">펀딩 기간</div>
            <div class="card-data">2023.10.25 ~ 2023.11.25 <span class="highlight">31일 남음</span></div>
            <div class="card-item">결제</div>
            <div class="card-data">목표액 달성시 2023.11.26에 결제 진행</div>
        </div>
    )

}