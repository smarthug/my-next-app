import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button, Divider } from '@mui/material';
import DeployTabs from '../../../components/DeployTabs';
// import DeployButton from '../../../components/DeployButton';
import dynamic from 'next/dynamic'

const DeployButton = dynamic(() => import('../../../components/DeployButton'), {
  ssr: false
})

// import BasicInfoTab from '../../../components/BasicInfoTab';
// import RoadMap from './roadmap'
// import MilestoneTab from '../../../components/MilestoneTab'

// import dynamic from "next/dynamic";

const MilestoneTab = dynamic(() => import("../../../components/MilestoneTab"), { ssr: false });





export default function MilestonePage() {


  



    return (
        <Box sx={{ width: '100%', marginTop: "64px" }}>
            <DeployButton />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <DeployTabs />
            </Box>

            <Box sx={{ p: 3 }} >
                <MilestoneTab />
            </Box>

        </Box>

    );
}



