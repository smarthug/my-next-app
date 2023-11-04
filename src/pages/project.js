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

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';

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

                        {/* <Paper sx={{ height: 3000, width: '100%' }} /> */}
                        <MockProjectDetail />


                    </Grid>
                    <Grid xs={12} lg={4}>
                        {/* <MockProjectDetail /> */}
                        <CustomCard />

                        <Typography variant="h5" m={4}>
                            선물 선택
                        </Typography>

                        <Box>


                            <ProductCard />



                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
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

function CustomCard() {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    창작자 소개
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <Avatar alt="Yapmom Games" src="/path/to/image.jpg" />
                    <Typography variant="body1" style={{ marginLeft: '16px' }}>
                        yapmom games
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: '16px', color: 'gray' }}>
                        마지막 로그인 1일 전
                    </Typography>
                </div>

                <Typography variant="body1" gutterBottom>
                    많은 분들이 부담없는 가격으로 재미있게 즐길 수 있는 게임을 만드는 것이 목표이기 때문에 자주 방문해주세요. 잘 부탁드립니다.
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


function ProductCard() {
    return (
        <Box m={1}>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        <Chip
                            label="538명이 선택"
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                        />
                        21,000원 +
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        <b>매번새로 리턴 세트</b>
                    </Typography>

                    <Typography variant="body1">
                        • CD (x 1)
                    </Typography>

                    <Typography variant="body1">
                        • 필름마크 1종 (x 2)
                    </Typography>

                    <Typography variant="body1">
                        • 아이가치 화보콘트 플로피 2종 (x 1)
                    </Typography>

                    <Typography variant="body1">
                        • [주간] 아이가치 화보콘트 플로피 3종 (x 1)
                    </Typography>

                    <Typography variant="body1">
                        • [주간] 스틸펜치 TRY 상영전 사인엽서 (x 1)
                    </Typography>

                    <Typography variant="body1">
                        • [주간] 신규 캐릭터 알람 메시지 톤 8종 (x 1)
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}


function MockProjectDetail() {

    return (

        <div className="storyContent">
            <p>막연하다면 아래의 질문에 대한 답이 내용에 포함되도록 작성해보세요.</p>
            <p>Q. 무엇을 만들기 위한 프로젝트인가요?</p>
            <p>스크롤 서바이벌의 후속작을 만들기 위한 프로젝트입니다.</p>
            <p>Q. 프로젝트를 간단히 소개한다면?</p>
            <p>30여가지의 다양한 총을 이용하여 수없이 몰려드는 몬스터과 다양한 패턴을 가진 보스 몬스터들로부터 생존하는 게임입니다. 건 서바이벌은 제작전이라 영상이 없습니다. 비슷한 게임인 스크롤 서바이벌의 영상을 보시고 참고해주시면 감사하겠습니다.</p>
            <p><iframe src="https://www.youtube.com/embed/hFdcUgHfiFQ" width="620" height="348" frameBorder="0" allowFullScreen="allowfullscreen"></iframe> &nbsp;</p>
            <p>&nbsp;스크롤 서바이벌은 12개의 다른 스테이지가 있으며, 각 스테이지에서 모두 다른 몬스터들과 다양한 패턴을 가진 보스 몬스터가 등장합니다. 24가지의 마법을 수많은 종류의 스크롤을 이용하여 강화하며 생존하는 게임입니다. 건 서바이벌도 마찬가지로 여러 스테이지로 구성이 되며, 각 스테이지별로 다른 몬스터들과 기존 스크롤 서바이벌과 차별화된 패턴을 가진 보스몹들이 대거 등장할 예정입니다. 또한, 마법이 아닌 총을 사용함으로써 타격감과 시각적인 재미가 기존 작품보다 더해질 것으로 생각됩니다.</p>
            <p>Q. 이 프로젝트가 왜 의미있나요?</p>
            <p>전작인 스크롤 서바이벌이 출시 한달만에 구글 플레이 스토어 1위를 달성했습니다. (10월 15일)</p>
            <p><img width={620} src="https://tumblbug-psi.imgix.net/d6a1768f60fcc964a54729e56e512338dcc244d7/cac6006ffe19855e909c0ea8c5ca142bf1b85879/11bff0b8df394757d2fbfe67acb0af4e2d7f7720/a8fd6e75-4c7a-490e-9dda-e84c677c52c8.jpg?ixlib=rb-1.1.0&amp;w=1240&amp;auto=format%2C%20compress&amp;lossless=true&amp;ch=save-data&amp;s=fd3db1e97bfaa51658110e569b57bf65" /></p>
            <p>재미가 검증된 게임을 하고 싶으시거나, 그 게임에 후원자로서 자신의 이름을 남기고 싶으신 분들이라면 의미있을 것이라고 생각합니다.</p>
            <p><img width={620} src="https://tumblbug-psi.imgix.net/d6a1768f60fcc964a54729e56e512338dcc244d7/cac6006ffe19855e909c0ea8c5ca142bf1b85879/11bff0b8df394757d2fbfe67acb0af4e2d7f7720/d3c583c9-521f-40bd-8038-05208920b61e.png?ixlib=rb-1.1.0&amp;w=1240&amp;auto=format%2C%20compress&amp;lossless=true&amp;ch=save-data&amp;s=9139ddd98e5e0ba94afc0ea9f32277be" /></p>
            <p>&nbsp;또, 후원 후 두 달 이내에 작품을 받아보실 수 있다는 점이 오래 기다리는 것이 지루한 분들이나 게임 개발이 무산되는 것이 아닌지 걱정할 필요가 없습니다.</p>
            <p>Q. 이 프로젝트를 시작하게 된 배경이 무엇인가요?</p>
            <p>첫번째 게임이 생각보다 인기가 있고 재밌게 플레이 했다는 분들이 많아서 비슷하지만 다른 컨셉을 지닌 게임을 제작하고 싶어 시작하게 되었습니다. 저는 이전에 텀블벅에 2번 후원글을 올렸지만 모두 무산되었습니다. 아무래도 후원글을 작성하는데에 있어, 디자인적인 측면에서 제 능력이 부족하여 그런 것으로 생각하고 있습니다. <strong>하지만 저는 제가 만드는 게임에 자부심있고 전세계 게이머들 누구든지 재미있게 플레이하는 게임을 만들고 싶다는 열정이 있습니다. 믿고 후원주신다면 후원자님들께서 모두 만족할 수 있는 게임을 만들겠습니다.</strong></p>
        </div>
    )
}

