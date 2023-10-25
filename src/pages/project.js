import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/material';

// import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from '../components/ImageGallery'


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
        </Container>
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