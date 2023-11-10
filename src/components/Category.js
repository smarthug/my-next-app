import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  min-width: 120px;
`;

export default function CustomSelect() {
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
        </Box

        >
    );
}
