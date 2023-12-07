import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Chip, Container } from '@mui/material';

// import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from '@/components/ImageGallery'

// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';

import db from '@/utils/firebase.js';

import YouTube from 'react-youtube';

import ProjectViewStepper from '@/components/ProjectViewStepper';

import ProjectViewPaper from '@/components/ProjectViewPaper';

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';

const DescriptionBox = styled(Box)({
  WebkitTextSizeAdjust: '100%',
  WebkitFontSmoothing: 'antialiased',
  WebkitBoxDirection: 'normal',
  fontFamily: "'SF Pro Text', 'Helvetica Neue', 'Segoe UI', Arial, 'NotoSansKR', sans-serif",
  boxSizing: 'inherit',
  wordBreak: 'break-all',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
  overflowX: 'hidden',
  color: '#3d3d3d',
  fontSize: '16px',
  lineHeight: '28px',
  padding: 0,
  margin: 0,
});

// Usage
// <StoryContentBox>Your content here</StoryContentBox>


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

export default function ColumnsGrid(props) {
    const fundContract = props.projectId;

    const [fetchedData, setFetchedData] = useState(null);

    

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        getDBData();
    }, [])

    const getDBData = async () => {
        var DB = await db.collection('Projects');
        let tempVoteList = new Array();
        var tempVoteData = await DB.doc(fundContract).get().then(async function (data) {
            console.log(data.data());
            setFetchedData(data.data());
            // if (data.data().Votes != undefined) {
            //     tempVoteList = data.data().Votes;
            //     setActiveStep(tempVoteList.length);
            //     setVoteTitle(tempVoteList[tempVoteList.length - 1].VoteTitle);
            //     setVoteContent(tempVoteList[tempVoteList.length - 1].VoteContent);
            //     setVoteEndDate(dayjs(tempVoteList[tempVoteList.length - 1].VoteEndDate));

            //     let tempMilestone = new Array();
            //     tempMilestone.push('펀딩 성공');
            //     for (let i = 0; i < data.data().MilestoneDesc.length; i++) {
            //         tempMilestone.push(data.data().MilestoneDesc[i]);
            //     }
            //     tempMilestone.push('프로젝트 완료');
            //     setSteps(tempMilestone);
            // }
        });
    }

    if(fetchedData == null){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    // minHeight: '100vh',
                }}
            >
                <Typography variant="h4" component="div" gutterBottom>
                    {fetchedData.Title}
                </Typography>
            </Box>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid xs={12} lg={8}>
                        {/* <ImageGallery items={images} /> */}
                        {/* <ImageGallery videoURL={"https://www.youtube.com/watch?v=KhEAe2_T-4c"} /> */}

                        <YouTube videoId="KhEAe2_T-4c"
                            opts={
                                {
                                    width: '100%',
                                    height: '400px',
                                    playerVars: {
                                        // https://developers.google.com/youtube/player_parameters
                                        autoplay: 0,
                                    },
                                }
                            }
                        />
                        
                    </Grid>
                    <Grid xs={12} lg={4}>
                        <ProjectViewPaper fundGoal={fetchedData.FundGoal} fundStart={fetchedData.FundStart} fundEnd={fetchedData.FundEnd} options={fetchedData.FundOption} />
                    </Grid>
                </Grid>
            </Box>


            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="프로젝트 계획" {...a11yProps(0)} />
                        <Tab label="정책" {...a11yProps(1)} />
                        {/* <Tab label="커뮤니티" {...a11yProps(2)} />
                        <Tab label="추천" {...a11yProps(3)} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>

                

                    <ProjectViewStepper milestoneDesc={fetchedData.MilestoneDesc} milestoneRatio={fetchedData.MilestoneRatio}  />

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {fetchedData.Policy}

                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={2}>
                    커뮤니티
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    추천
                </CustomTabPanel> */}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid xs={12} lg={8}>

                        {/* <Paper sx={{ height: 3000, width: '100%' }} /> */}
                        <ProjectDescription  description={fetchedData.Description}/>


                    </Grid>
                    <Grid xs={12} lg={4}>
                        {/* <ProjectDetail /> */}
                        <TeamDescription  teamDescription={fetchedData.TeamDescription} />

                        <Typography variant="h5" m={4}>
                            선물 선택
                        </Typography>

                        <Box>

                            {fetchedData.FundOption.map((item) => {

                                return (
                                    <OptionsCard optionTitle={item.optionTitle} price={item.price} />
                                )
                            }
                            )}


                          
                        </Box>
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
        <div className="card">
            <div className="card-title">목표액</div>
            <div className="card-data">323,000원 <span>64%</span></div>
            <div className="card-item">남은시간</div>
            <div className="card-data">31일</div>
            <div className="card-item">후원자</div>
            <div className="card-data">9명</div>
            <div className="card-item">목표액</div>
            <div className="card-data">500,000원</div>
            <div className="card-item">펀딩 기간</div>
            <div className="card-data">2023.10.25 ~ 2023.11.25 <span className="highlight">31일 남음</span></div>
            <div className="card-item">결제</div>
            <div className="card-data">목표액 달성시 2023.11.26에 결제 진행</div>
        </div>
    );
}

function TeamDescription({teamDescription}) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    창작자 소개
                </Typography>

                {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <Avatar alt="Yapmom Games" src="/path/to/image.jpg" />
                    <Typography variant="body1" style={{ marginLeft: '16px' }}>
                        yapmom games
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: '16px', color: 'gray' }}>
                        마지막 로그인 1일 전
                    </Typography>
                </div> */}

                <Typography variant="body1" gutterBottom>
                    {teamDescription}
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button variant="contained" color="primary">
                        팔로우
                    </Button>
                    <Button variant="outlined" color="primary">
                        창작자 문의
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


function OptionsCard({optionTitle, price}) {
    return (
        <Box m={1}>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        <Chip
                            label="0명이 선택"
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                        />
                        {price} eth +
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        <b>{optionTitle}</b>
                    </Typography>

                   
                </CardContent>
            </Card>
        </Box>
    );
}


function ProjectDescription({description}) {

    return (

        <DescriptionBox>
            {description}
        </DescriptionBox>
    )
}

