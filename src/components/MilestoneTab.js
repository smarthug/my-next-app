
import { useState } from 'react';


import ProjectInputRow from './ProjectInputRow';
import ProjectYoutube from './Youtube';
import Category from './Category';
import ProjectTitle from './ProjectTitle';
import ProjectDescription from './ProjectDescription';
import ProjectImageUploader from './ProjectImageUploader';

import RoadMap from './roadmap2'

// import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import VoteDatePicker from './VoteDatePicker'


// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useFundStore from '../utils/store'

function BasicDatePicker({ label = "투표일 지정" }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={['DatePicker']}> */}
            <DatePicker label={label} />
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
}

// 여기서 State 관리하자

export default function BasicInfoTab() {

    const [milestoneNum, setMilestoneNum] = useState(2);
    const [fundEndDate, setFundEndDate] = useState('');

    const handleMilestoneNumChange = (event) => {
        setMilestoneNum(event.target.value);
    };



    return (

        <>

            <ProjectInputRow label="목표 금액"
                description="프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.">

                <ProjectGoal />
            </ProjectInputRow>

            <ProjectInputRow label="펀딩 일정" description="설정한 일시가 되면 펀딩이 자동 시작됩니다. 펀딩 시작 전까지 날짜를 변경할 수 있고, 즉시 펀딩을 시작할 수도 있습니다.">

                <CustomSelect setFundEndDate={setFundEndDate} />
            </ProjectInputRow>

            <ProjectInputRow label="마일스톤 설정" description="마일스톤의 갯수, 투표 일시, 금액 비율을 설정해주세요">

                <StyledFormControl sx={{
                    flexGrow: 1,
                }} variant="outlined">
                    <InputLabel id="category-label">갯수</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={milestoneNum}
                        onChange={handleMilestoneNumChange}
                        label="갯수"
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        {/* Add more MenuItem components as needed */}
                    </Select>
                </StyledFormControl>
            </ProjectInputRow>

            <RoadMap fundEndDate={fundEndDate} milestoneNum={milestoneNum} />
        </>
    )


}





const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'red',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'red',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderColor: 'red',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'red',
        },
    },
});

// 마지막 붙는거에 , 원화로 환산 금액으로 보여주기
function ProjectGoal() {
    const goalAmount = useFundStore(state => state.goalAmount);
    const setGoalAmount = useFundStore(state => state.setGoalAmount);
    // const [title, setTitle] = useState();


    const handleTitleChange = (event) => {
        setGoalAmount(event.target.value);
    };



    return (
        <Box style={{
            margin: "10px"
        }}>
            <CssTextField
                label="eth"
                variant="outlined"
                color="secondary"
                fullWidth
                type='number'
                margin="normal"
                value={goalAmount}
                onChange={handleTitleChange}
                InputProps={{
                    //   endAdornment: <InputAdornment position="end">{`${title.length}/50`}</InputAdornment>,
                }}
            />

        </Box>
    );
}




// import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
// import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  min-width: 120px;
`;

function CustomSelect({ setFundEndDate }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
            }}
        >
            <StyledFormControl sx={{
                flexGrow: 1,
            }} variant="outlined">
                <VoteDatePicker label="시작일" />
            </StyledFormControl>

            <StyledFormControl
                sx={{
                    flexGrow: 1,
                }}
                variant="outlined">
                {/* <VoteDatePicker label="종료일" /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer components={['DatePicker']}> */}
                    <DatePicker label={"종료일"} onChange={setFundEndDate} />
                    {/* </DemoContainer> */}
                </LocalizationProvider>

            </StyledFormControl>
        </Box >
    );
}




