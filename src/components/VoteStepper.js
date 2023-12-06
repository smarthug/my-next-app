import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProjectInputRow from './ProjectInputRow.js';
import db from '../utils/firebase.js';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import Contract from "../utils/Contract.json";
import { getAccount } from '@wagmi/core'
import { IM_Fell_DW_Pica } from 'next/font/google/index.js';


// fetch vote title from firestore
// const steps = ['펀딩 성공', '디자인 완성', '시제품 제작', '제품 수정', '공장 수주'];

const tmpFundContract = "0x5e60d41871492883cc38ce000e9876f79b188850"

export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [voteTitle, setVoteTitle] = useState('');
    const [voteContent, setVoteContent] = useState('');
    const [voteEndDate, setVoteEndDate] = useState('');
    const [steps, setSteps] = useState(['펀딩 성공', '디자인 완성', '시제품 제작', '제품 수정', '공장 수주']);
    const fundContract = props.projectId;
    const account = getAccount().address;
    web3 = new Web3(window.ethereum);

    //   const isStepOptional = (step) => {
    //     return step === 1;
    //   };

    useEffect(() => {
        getDBData();
    }, [])

    const getDBData = async () => {
        var DB = await db.collection('Projects');
        let tempVoteList = new Array();
        var tempVoteData = await DB.doc(fundContract).get().then(async function (data) {
            console.log(data.data());
            if (data.data().Votes != undefined) {
                tempVoteList = data.data().Votes;
                setActiveStep(tempVoteList.length);
                setVoteTitle(tempVoteList[tempVoteList.length - 1].VoteTitle);
                setVoteContent(tempVoteList[tempVoteList.length - 1].VoteContent);
                setVoteEndDate(dayjs(tempVoteList[tempVoteList.length - 1].VoteEndDate));

                let tempMilestone = new Array();
                tempMilestone.push('펀딩 성공');
                for (let i = 0; i < data.data().MilestoneDesc.length; i++) {
                    tempMilestone.push(data.data().MilestoneDesc[i]);
                }
                tempMilestone.push('프로젝트 완료');
                setSteps(tempMilestone);
            }
        });
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleDisagree = () => {
        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
        voteDisagree();
    };

    const voteDisagree = async () => {
        const fundABI = Contract.fundABI;
        const contract = await new web3.eth.Contract(fundABI, fundContract);

        let ret = await web3.eth.sendTransaction({
            from: account,
            to: fundContract,
            data: contract.methods.voteDisagree(activeStep).encodeABI(),
            gas: '1000000'
        })
            .then(function (receipt) {
                console.log("Vote success")
            });

    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
    });


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    //   if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //       <Typography variant="caption">Optional</Typography>
                    //     );
                    //   }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>

                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>

                        <ProjectInputRow label="투표 제목" >

                            <CssTextField
                                label="Vote Title"
                                variant="outlined"
                                color="secondary"
                                fullWidth

                                margin="normal"
                                value={voteTitle}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{`${voteTitle.length}/50`}</InputAdornment>,
                                }}
                            />
                        </ProjectInputRow>

                        <ProjectInputRow label="투표 설명">

                            <CssTextField
                                label="투표 설명"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                value={voteContent}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{`${voteContent.length}/300`}</InputAdornment>,
                                }}
                            />
                        </ProjectInputRow>

                        <ProjectInputRow label="투표 기한">

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DemoContainer components={['DatePicker']}> */}
                                <DatePicker label={"투표 기한"} value={dayjs(voteEndDate)} />
                                {/* </DemoContainer> */}
                            </LocalizationProvider>
                        </ProjectInputRow>
                        {/* <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button> */}
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )} */}

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                                gap: 2
                            }}
                        >

                            <Button variant='contained' fullWidth onClick={handleDisagree}>
                                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Disagree'} */}
                                Disagree
                            </Button>

                            <Button variant='contained' fullWidth onClick={handleDisagree}>
                                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Disagree'} */}
                                Refund
                            </Button>

                        </Box>

                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
