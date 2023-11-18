import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
// import Box from '@mui/material/Box';

import { Card, CardContent, Avatar, Typography, Button, Divider } from '@mui/material';
import DeployTabs from '../../../components/DeployTabs';

// import BasicInfoTab from '../../../components/BasicInfoTab';
// import RoadMap from './roadmap'
// import MilestoneTab from '../../../components/MilestoneTab'

import dynamic from "next/dynamic";

const MilestoneTab = dynamic(() => import("../../../components/MilestoneTab"), { ssr: false });

const OptionsTab = dynamic(() => import("../../../components/optionsTab"), { ssr: false });



export default function MilestonePage() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function tempSave() {
        console.log("임시 저장")

        // zustand 에 있던것들 가져와서 , local storage 에 저장해주기
    }

    function deployProject() {
        console.log("제출")

        // zustand 에 있던것들로 , set Initial value 호출하기 

        // uint256 _goalAmount,
        // uint _saleEndTime,
        
        // uint256 _milestoneNum,
        // uint256[] memory _fundRatio,
        
        // uint256 _optionNum,
        // uint256[] memory _prices,

    }



    return (
        <Box sx={{ width: '100%', marginTop: "64px" }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // textAlign: 'center',
                    // justifyContent: 'center',
                    height: '100px',
                    // bgcolor: '#f5f5f5',
                    borderRadius: '10px',
                    // marginBottom: '20px'
                }}
            >
                <Typography variant="h4" component="div" gutterBottom>
                    프로젝트 기획
                </Typography>

                <Box
                    sx={{
                        flexGrow: 1,
                    }}
                >

                </Box>

                <Box
                    sx={{
                        marginRight: '20px',
                        '& > *': {
                            margin: '0 10px',
                        },

                        
                    }}
                >

                    <Button size='large'  variant='outlined' onClick={tempSave} >임시 저장</Button>
                    <Button size='large' variant='contained' onClick={deployProject} >제출</Button>

                </Box>

                {/* <Button size='large' variant='outlined'>임시 저장</Button> */}

            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <DeployTabs />
            </Box>

            <Box sx={{ p: 3 }} >
                <MilestoneTab />
                {/* <Divider />
                <OptionsTab /> */}
            </Box>

        </Box>

    );
}



