
import { useState } from 'react';


import ProjectInputRow from './ProjectInputRow';
import ProjectYoutube from './Youtube';
import Category from './Category';
import ProjectTitle from './ProjectTitle';
import ProjectDescription from './ProjectDescription';
import ProjectImageUploader from './ProjectImageUploader';

import RoadMap from './roadmap'

// import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import VoteDatePicker from './VoteDatePicker'

// 여기서 State 관리하자

export default function BasicInfoTab() {

    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };

    return (

        <>

            <ProjectInputRow label="목표 금액"
                description="프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.">

                <ProjectGoal />
            </ProjectInputRow>

            <ProjectInputRow label="펀딩 일정" description="설정한 일시가 되면 펀딩이 자동 시작됩니다. 펀딩 시작 전까지 날짜를 변경할 수 있고, 즉시 펀딩을 시작할 수도 있습니다.">

                <CustomSelect />
            </ProjectInputRow>

            <ProjectInputRow label="마일스톤 설정" description="마일스톤의 갯수, 투표 일시, 금액 비율을 설정해주세요">

                <StyledFormControl sx={{
                    flexGrow: 1,
                }} variant="outlined">
                    <InputLabel id="category-label">갯수</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        onChange={handleCategoryChange}
                        label="갯수"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'category1'}>1</MenuItem>
                        <MenuItem value={'category2'}>2</MenuItem>
                        <MenuItem value={'category3'}>3</MenuItem>
                        <MenuItem value={'category4'}>4</MenuItem>
                        <MenuItem value={'category5'}>5</MenuItem>
                        {/* Add more MenuItem components as needed */}
                    </Select>
                </StyledFormControl>
            </ProjectInputRow>

            <RoadMap />
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
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubTitleChange = (event) => {
        setSubTitle(event.target.value);
    };

    return (
        <form noValidate autoComplete="off" style={{
            margin: "10px"
        }}>
            <CssTextField
                label="eth"
                variant="outlined"
                color="secondary"
                fullWidth

                margin="normal"
                value={title}
                onChange={handleTitleChange}
                InputProps={{
                    //   endAdornment: <InputAdornment position="end">{`${title.length}/50`}</InputAdornment>,
                }}
            />

        </form>
    );
}




// import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
// import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  min-width: 120px;
`;

function CustomSelect() {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };

    return (
        <Box
            sx={{
                width: '100%',

                display: 'flex',
            }

            }
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
                <VoteDatePicker label="종료일" />

            </StyledFormControl>
        </Box >
    );
}




function xCustomSelect() {
    const [category, setCategory] = React.useState('');
    const [subcategory, setSubcategory] = React.useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };

    return (
        <Box
            sx={{
                width: '100%',

                display: 'flex',
            }

            }
        >
            <StyledFormControl sx={{
                flexGrow: 1,
            }} variant="outlined">
                <InputLabel id="category-label">카테고리</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    label="카테고리"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'category1'}>디지털 게임</MenuItem>
                    {/* Add more MenuItem components as needed */}
                </Select>
            </StyledFormControl>

            <StyledFormControl
                sx={{
                    flexGrow: 1,
                }}
                variant="outlined">
                <InputLabel id="subcategory-label">세부 카테고리</InputLabel>
                <Select
                    labelId="subcategory-label"
                    id="subcategory-select"
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                    label="세부 카테고리"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'subcategory1'}>새로운 카테고리를 선택하세요</MenuItem>
                    {/* Add more MenuItem components as needed */}
                </Select>
            </StyledFormControl>
        </Box>
    );
}