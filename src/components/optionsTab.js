import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Box, Grid, Button, FormControl, OutlinedInput, InputAdornment, Divider, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import useFundStore from '../utils/store';

// Styling the card with a border and padding
const StyledCard = styled(Card)(({ theme }) => ({
    border: `1px solid ${theme.palette.error.main}`,
    position: 'relative',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
}));

const initialOptions = [
    { price: 0.001, optionTitle: "옵션1" },
    { price: 0.002, optionTitle: "옵션2" },
    { price: 0.01, optionTitle: "옵션3" },
    { price: 0.02, optionTitle: "옵션4" },
];

function OptionsContainer() {
    // const [options, setOptions] = useState(initialOptions);
    const options = useFundStore(state => state.options);
    const setOptions = useFundStore(state => state.setOptions);


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTitleChange = (event) => {

        setTitle(event.target.value);
    };

    const handleDelete = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };


    const handleAdd = () => {
        const newOption = {
            price: price, // Default price
            optionTitle: `${title}`, // A new option title
            // Add any other default properties for the new option
        };
        setOptions([...options, newOption]);
    };

    return (




        <Box sx={{ width: '100%', marginTop: "56px" }}>


            <Grid container spacing={2} alignItems="" sx={{ marginBottom: "14px" }}>
                <Grid item xs={4}>
                    <Box>
                        {options.map((option, index) => (
                            <StyledCard key={index}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {option.price}eth+
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {option.optionTitle}
                                    </Typography>

                                </CardContent>
                                <DeleteButton onClick={() => handleDelete(index)} aria-label="delete">
                                    <DeleteIcon />
                                </DeleteButton>
                            </StyledCard>
                        ))}
                    </Box>

                </Grid>
                <Grid item xs={8}>

                    <Box
                        sx={{
                            p: 3
                        }}
                    >


                        <Typography variant="h5" component="div" gutterBottom>
                            선물 만들기
                        </Typography>

                        <Typography variant="subtitle1" component="div" gutterBottom>
                            선물은 후원자에게 프로젝트의 가치를 전달하는 수단입니다. 다양한 금액대로 여러 개의 선물을 만들어주세요. 펀딩 성공률이 높아지고, 더 많은 후원 금액을 모금할 수 있어요.
                        </Typography>

                        <Divider sx={{ marginTop: "48px" }} />

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: "48px"
                        }}>
                            <TextField
                                label="선물 설명"
                                variant="outlined"
                                color="secondary"
                                // fullWidth

                                margin="normal"
                                value={title}
                                onChange={handleTitleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{`${title.length}/50`}</InputAdornment>,
                                }}
                            />


                            <FormControl sx={{ m: 0, width: '20%' }} variant="standard">
                                <OutlinedInput
                                    // size='small'
                                    id="outlined-adornment-weight"
                                    value={price}
                                    onChange={handlePriceChange}
                                    endAdornment={<InputAdornment position="end">eth</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}


                                />

                            </FormControl>

                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAdd}
                            >
                                Add Option
                            </Button>
                        </Box>


                    </Box>
                </Grid>
            </Grid>
            {/* <Button variant="contained" sx={{ width: "100%" }}>펀딩하기</Button> */}
            {/* <Divider sx={{ marginTop: "48px" }} /> */}
        </Box>
    );
}

export default OptionsContainer;
