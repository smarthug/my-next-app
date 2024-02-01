import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Box, Grid, Button, FormControl, OutlinedInput, InputAdornment, Divider, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';
import useFundStore from '../utils/store';

import Editor from './editor/editor';

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

// const initialOptions = [
//     { price: 0.001, optionTitle: "옵션1" },
//     { price: 0.002, optionTitle: "옵션2" },
//     { price: 0.01, optionTitle: "옵션3" },
//     { price: 0.02, optionTitle: "옵션4" },
// ];

function OptionsContainer() {
    // const [options, setOptions] = useState(initialOptions);
    const options = useFundStore(state => state.options);
    const setOptions = useFundStore(state => state.setOptions);


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTitleChange = (event) => {

        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
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
            description: description,
            imageURL: imageURL,
            soldNum: 0
        };
        setOptions([...options, newOption]);
    };

    return (




        <Box sx={{ width: '100%', marginTop: "56px" }}>

            <Editor />
           
        </Box>
    );
}

export default OptionsContainer;
