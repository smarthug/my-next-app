import React, {useEffect, useState} from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, styled } from '@mui/material';
import Link from 'next/link';

const ProjectCard = styled(Card)({
    maxWidth: 345, // Adjust the width as needed
    marginBottom: 2, // Add space below the card
});

const ProjectChip = styled(Chip)({
    marginTop: 1, // Spacing from the top of the card
    marginBottom: 1, // Spacing from the content
});

const ProjectTitle = styled(Typography)({
    fontWeight: 'bold',
});

const ProjectDescription = styled(Typography)({
    color: 'textSecondary',
});

const FundingDetails = styled(Typography)({
    marginTop: 2,
    marginBottom: 1,
});

function ProjectComponent(props) {
    // Replace these with actual project details
    const projectDetails = {
        title: 'LEGENDARIUM: Tarot and Playing Cards',
        description: 'Envision where you would go if nothing held you back.',
        creator: 'Montenzi & Co.',
        images: ['https://ksr-ugc.imgix.net/assets/043/317/236/97a390eeb19dcf6f003e8e18b4c1c6ce_original.png?ixlib=rb-4.1.0&crop=faces&w=352&h=198&fit=crop&v=1701987869&auto=format&frame=1&q=92&s=6eb76881c040eb94c69cee315ac1395b', '/path/to/image2.jpg'], // Paths to project images
        funding: 'NZ$ 15,271 pledged',
        percentageFunded: '84% funded',
        daysToGo: '19 days to go',
        location: 'Rolleston, NZ',
    };


    return (
        <Link href="/project/0x5e60d41871492883cc38ce000e9876f79b188850" passHref>

                    <ProjectCard>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.projectDetail.images}
                            alt={props.projectDetail.title}
                        />
                        <CardContent>
                            {/* <ProjectChip label="Project We Love" color="primary" /> */}
                            <ProjectTitle variant="h5" component="h2">
                                {props.projectDetail.title}
                            </ProjectTitle>
                            <ProjectDescription variant="body2">
                                {props.projectDetail.description}
                            </ProjectDescription>
                            <Typography variant="subtitle2">
                                by {props.projectDetail.creator}
                            </Typography>
                            <FundingDetails variant="body1">
                                {props.projectDetail.funding}
                            </FundingDetails>
                            <Typography variant="body2">
                                {props.projectDetail.percentageFunded} • {props.projectDetail.daysToGo}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {props.projectDetail.location}
                            </Typography>
                        </CardContent>
                    </ProjectCard>
        </Link>
    );
}

export default ProjectComponent;
