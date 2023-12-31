import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button } from '@mui/material';

// import BasicInfoTab from '../../../components/BasicInfoTab';
// import RoadMap from './roadmap'
// import MilestoneTab from './MilestoneTab'
import DeployTabs from '../../../components/DeployTabs';
// import DeployButton from '../../../components/DeployButton';
// import dynamic from 'next/dynamic'

const DeployButton = dynamic(() => import('../../../components/DeployButton'), {
  ssr: false
})


import dynamic from "next/dynamic";

const BasicInfoTab = dynamic(() => import("../../../components/BasicInfoTab"), { ssr: false });


export default function ColumnsGrid() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%', marginTop: "64px" }}>
           <DeployButton />


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <DeployTabs />
            </Box>

            <Box sx={{ p: 3 }} >


                <BasicInfoTab />
            </Box>

        </Box>

    );
}



