import React, {useEffect} from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import styled from 'styled-components';
import useFundStore from '../utils/store'

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  min-width: 120px;
`;

export default function CustomSelect() {
    const category1 = useFundStore(state => state.category1);
    const setCategory1 = useFundStore(state => state.setCategory1);
    const category2 = useFundStore(state => state.category2);
    const setCategory2 = useFundStore(state => state.setCategory2);

    const handleCategoryChange = (event) => {
        setCategory1(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setCategory2(event.target.value);
    };

    useEffect(() =>{
        console.log(category1, category2);
    },[category1,category2]);

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
                    value={category1}
                    onChange={handleCategoryChange}
                    label="카테고리"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>디지털 게임</MenuItem>
                    <MenuItem value={1}>카테고리2</MenuItem>
                    <MenuItem value={2}>카테고리3</MenuItem>
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
                    value={category2}
                    onChange={handleSubcategoryChange}
                    label="세부 카테고리"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>새0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    {/* Add more MenuItem components as needed */}
                </Select>
            </StyledFormControl>
        </Box

        >
    );
}
