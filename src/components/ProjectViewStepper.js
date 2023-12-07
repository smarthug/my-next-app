import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from '@mui/material';

export default function BasicTimeline({ milestoneDesc, milestoneRatio }) {
    return (
        <Timeline>
            {/* <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        {milestoneRatio[0]}%
                    </Typography>
                    <Typography>{milestoneDesc[0]}</Typography>
                </TimelineContent>
            </TimelineItem> */}

            {milestoneRatio.map((ratio, index) => (

                <TimelineItem key={index}>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            {ratio}%
                        </Typography>
                        <Typography>{milestoneDesc[index]}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}




        </Timeline>
    );
}