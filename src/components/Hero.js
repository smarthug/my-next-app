import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// Define styled components
const HeroContainer = styled(Container)({
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '3rem',
});

const HeroTitle = styled(Typography)({
    fontWeight: 700,
    marginBottom: '1rem',
    fontSize: '5rem',
});

const HeroSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: '2rem',
}));

const HeroButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    textTransform: 'none',
    fontWeight: 600,
}));

const Hero = () => {
    return (
        <HeroContainer maxWidth="md">
            <Typography color="primary" gutterBottom>
                THE COOLEST, WEB3 PRODUCT YOU HAVE EVER SEEN
            </Typography>
            <HeroTitle variant="h2" component="h1">
                Make your Funding, Step by Step.

            </HeroTitle>
            <HeroSubtitle variant="body1">
                Leveraging blockchain technology, CrowdStep will make the trusted ecosystem connecting both individual investor and producers with reasonable STEPs.

            </HeroSubtitle>
            <Box>
                <HeroButton variant="contained" color="primary">
                    Subscribe to the Newsletter
                </HeroButton>
                <HeroButton variant="outlined" color="primary">
                    Features
                </HeroButton>
            </Box>
        </HeroContainer>
    );
};

export default Hero;
