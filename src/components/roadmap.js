import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { FormControl, FormHelperText, InputAdornment, OutlinedInput, Typography, styled } from '@mui/material'

import VoteDatePicker from './VoteDatePicker';
import MilestoneDescription from './MilestoneDescription';


// const StyledCardGameWrapper = styled(Paper)(({ theme }) => ({
//     width: "100%",
//     height: 240,
//     display: "inline-flex",
//     zIndex: 1,
//     padding: theme.spacing(2, 0),
//     backgroundImage: "unset",
//     "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))": {
//       WebkitBackdropFilter: "blur(15px)",
//       backdropFilter: "blur(15px)",
//       backgroundColor: `${grey[900]}4D`,
//       // border: `1px solid ${grey[900]}`,
//     },
//     [`& > .${paperClasses.root}`]: {
//       width: 160,
//       margin: theme.spacing(0, 1),
//       position: "relative",
//       overflow: "hidden",
//       [`&.selected`]: {
//         filter: "brightness(0.5)",
//       },
//       [`& > .${typographyClasses.caption}`]: {
//         position: "absolute",
//         bottom: 0,
//         width: "100%",
//         backgroundColor: grey[900],
//         padding: theme.spacing(1),
//       },
//     },
//     [`&.not-selected`]: {
//       height: 240,
//       position: "absolute",
//       top: "calc(50vh - 120px)",
//       padding: theme.spacing(2, 5),
//       [`& > .${paperClasses.root}`]: {
//         width: 160,
//         [`&.typo`]: {
//           backgroundColor: "transparent",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         },
//       },
//     },
//   }));


const StyledTimelineConnector = styled(TimelineConnector)(({ theme }) => ({
    height: "90px"
}));

export default function OppositeContentTimeline() {
    return (
        <Timeline position="right">
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    <VoteDatePicker />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <StyledTimelineConnector />

                </TimelineSeparator>
                <RatioAndDetail />
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    <VoteDatePicker />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <StyledTimelineConnector />

                </TimelineSeparator>
                <RatioAndDetail />
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    <VoteDatePicker />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <StyledTimelineConnector />
                </TimelineSeparator>
                <RatioAndDetail />
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    <VoteDatePicker />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <StyledTimelineConnector />
                </TimelineSeparator>
                <RatioAndDetail />
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    <VoteDatePicker />
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    {/* <StyledTimelineConnector /> */}
                </TimelineSeparator>
                <RatioAndDetail />
            </TimelineItem>
        </Timeline>
    );
}


function RatioAndDetail() {

    return (
        <TimelineContent>
            <FormControl sx={{ m: 0, width: '20%' }} variant="standard">
                <OutlinedInput
                    // size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
            </FormControl>
            {/* <Typography variant="h6" component="span">
                25%
            </Typography> */}
            {/* <Typography sx={{m:4}}>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography> */}
            <MilestoneDescription />
        </TimelineContent>
    )
}