import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import dayjs from 'dayjs';

const CustomPaper = styled(Paper)({
    padding: '20px',
    margin: '20px',
    //   textAlign: 'center',
});

const StyledButton = styled(Button)({
    // marginTop: '20px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#ff8787',
    },
});

const CustomTypography = styled(Typography)({
    margin: '10px 0',
});

const IconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
        margin: '0 5px',
    },
});

export default function ProjectViewPaper({ options, fundGoal, fundStart, fundEnd }) {

    const [selectedOptions, setSelectedOptions] = React.useState('');

    const handleSubcategoryChange = (event) => {

        setSelectedOptions(event.target.value);

    };


    function handleMint() {
        console.log(selectedOptions)
        console.log("mint");
    }


    return (
        <CustomPaper elevation={0}>
            <CustomTypography variant="h6">모인 금액</CustomTypography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >

                <CustomTypography variant="h4">0 원

                </CustomTypography>

                <Box sx={{ flexGrow: "1" }} />


                <CustomTypography variant="body2" color="textSecondary">
                    0%
                </CustomTypography>

            </Box>

            <CustomTypography variant="h6">남은시간</CustomTypography>
            {/* <CustomTypography variant="h4">24 일</CustomTypography> */}
            <CustomTypography variant="h4">{dayjs().diff(dayjs.unix(fundEnd), 'day')} 일</CustomTypography>
            <CustomTypography variant="h6">후원자</CustomTypography>
            <CustomTypography variant="h4">0 명</CustomTypography>
            <Typography variant="body2" color="textSecondary">
                목표금액 {fundGoal}eth
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
                펀딩 기간 {fundStart} ~ {fundEnd}
            </Typography> */}

            <Typography variant="body2" color="textSecondary">
                펀딩 기간 {dayjs.unix(fundStart).format('YYYY.MM.DD')} ~ {dayjs.unix(fundEnd).format('YYYY.MM.DD')}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
                결제일 목표금액 달성시 2024.01.01에 결제 진행
            </Typography> */}
            {/* <IconContainer>
                <FavoriteBorderIcon />
                <Typography variant="body2">546</Typography>
                <ShareIcon />
                <Typography variant="body2">25</Typography>
            </IconContainer> */}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // textAlign: 'center',


                    justifyContent: 'center',

                    marginTop: '20px',
                }}
            >

                <FormControl
                    sx={{
                        flexGrow: 1,
                        width: '100px',
                    }}
                    variant="outlined">
                    <InputLabel id="subcategory-label">옵션</InputLabel>
                    <Select
                        labelId="subcategory-label"
                        id="subcategory-select"
                        value={selectedOptions}
                        onChange={handleSubcategoryChange}
                        label="옵션 선택"
                    >
                        <MenuItem value="">
                            <em>옵션 선택</em>
                        </MenuItem>

                        {options.map((option, index) => {
                            return (
                                <MenuItem key={index} value={index}>{option.optionTitle} / {option.price}eth</MenuItem>
                            )
                        }
                        )}


                        {/* Add more MenuItem components as needed */}
                    </Select>
                </FormControl>




                <Box sx={{ flexGrow: "1" }} />

                <StyledButton variant="contained" onClick={handleMint}>
                    이 프로젝트 후원하기
                </StyledButton>
            </Box>

        </CustomPaper>
    );
}
