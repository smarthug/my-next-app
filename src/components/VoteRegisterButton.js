import { Box, Button, Typography, TextareaAutosize, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Web3 from "web3";
import { useNetwork, useSigner } from "wagmi";
import { getAccount } from '@wagmi/core'
import { ethers } from "ethers";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import useFundStore, { FundStoreInitializer } from '../utils/store';
import { useLayoutEffect } from 'react';
import db from '../utils/firebase.js';
import ProjectInputRow from './ProjectInputRow.js';

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import TeamDescription from './TeamDescription.js';
// import useFundStore from '../utils/store';

// import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



function BasicDatePicker({ label = "투표일 지정" }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={['DatePicker']}> */}
            <DatePicker label={label} />
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
}

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  min-width: 120px;
`;

// FundStoreInitializer()
export default function DeployButton(props) {

    // const website = useFundStore(state => state.website);
    // const setWebsite = useFundStore(state => state.setWebsite);

    // const handleVideoURLChange = (event) => {
    //     setWebsite(event.target.value);
    // };
    const voteTitle = useFundStore(state => state.voteTitle);
    const setVoteTitle = useFundStore(state => state.setVoteTitle);


    const handleVoteTitleChange = (event) => {
        setVoteTitle(event.target.value);
    }

    const voteContent = useFundStore(state => state.voteContent);
    const setVoteContent = useFundStore(state => state.setVoteContent);
    const handleVoteContentChange = (event) => {
        setVoteContent(event.target.value);
    }

    const voteEndDate = useFundStore(state => state.voteEndDate);
    const setVoteEndDate = useFundStore(state => state.setVoteEndDate);

    const handleVoteEndDateChange = (event) => {
        console.log(event);
        setVoteEndDate(event);
    }

    const [milestone, setMilestone] = useState([]);
    const voteNum = useFundStore(state => state.voteNum);
    const setVoteNum = useFundStore(state => state.setVoteNum);
    const fundContract = props.projectId;

    
    useEffect(() => {
        if(milestone.length == 0){
            var temp = db.collection('Projects').doc(props.projectId).get().then(async function(data) {    
                console.log(data.data().MilestoneRatio);
                let tempMilestone = new Array();
                for(let i = 1; i<data.data().MilestoneRatio.length;i++){
                    tempMilestone.push({
                        id: i,
                        voteNum: i,
                        voteContent: data.data().MilestoneDesc[i],
                        voteRatio: data.data().MilestoneRatio[i]
                    })
                }
                setMilestone(tempMilestone);
            });

        }
    });

    const handlevoteNumChange = async (e) => {
        console.log(e.target.value);
        setVoteContent(milestone[e.target.value-1].voteContent);
        setVoteNum(e.target.value);
    }




    // 여기다가 만들기 , 필요할 것들
    // const goalAmount = useFundStore(state => state.goalAmount)
    const account = getAccount().address;
    web3 = new Web3(window.ethereum);
    // const { chain } = useNetwork()
    // // const { data: signer, isError, isLoading } = useSigner();
    // const signer = useSigner();

    const fundABI = Contract.fundABI;

    function tempSave() {
        console.log("임시 저장")
        const {voteTitle, voteContent, voteEndDate, voteNum} = useFundStore.getState();
        
        localStorage.setItem('voteTitle', voteTitle)
        localStorage.setItem('voteContent', voteContent)
        localStorage.setItem('voteEndDate', dayjs(voteEndDate))
        localStorage.setItem('voteNum', voteNum)
        // console.log('saleEndTime', saleEndTime.getTime())
    }
    
    const buildVote = async() => {
        console.log(web3);
        const contract = await new web3.eth.Contract(fundABI,fundContract) ;
        let voteURL;
        let contentForUpload;
        if (voteTitle.length > 0 && voteContent.length > 0) {
            contentForUpload = {
                VoteTitle: voteTitle,
                VoteContent: voteContent,
                VoteEndDate: dayjs(voteEndDate).unix()
            }
            const voteURI = await ipfsUploadMetadata(contentForUpload);
            voteURL = `https://${voteURI}.ipfs.nftstorage.link`;
        }
        console.log(account);
        console.log(fundContract);
        console.log(dayjs(voteEndDate).unix());
        console.log(voteURL);
        console.log(voteNum);
        let DB = await db.collection('Projects');
        await DB.doc(fundContract).get().then(async function(data) {    
          console.log(data.data());
          if(data.data().Votes != undefined && data.data().Votes.length > (voteNum+1)){
            alert("You already hold this vote.");
            return 0;
          }
        });
        
        let ret = await web3.eth.sendTransaction({
        from: account,
        to: fundContract,
        data: contract.methods.buildVote(dayjs(voteEndDate).unix(),voteURL,voteNum).encodeABI(),//fundAddress, endBLock, option number, contentURL
        gas: '1000000'            
        })
        .then(async function(receipt){
          console.log(receipt);
          let tempVoteList = new Array();
          var tempVoteData = await DB.doc(fundContract).get().then(async function(data) {    
            console.log(data.data());
            if(data.data().Votes != undefined){
                tempVoteList = data.data().Votes;
            }
          });
          tempVoteList.push(contentForUpload);
          console.log(tempVoteList);
          
          var temp = await DB.doc(fundContract).set({
            Votes:tempVoteList
          }, { merge: true });
          console.log("Set Vote Data success");
        })
        .catch((err) => {
            alert(err.data.message);
          })
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
                    투표 등록
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


                    }}
                >

                    <Button sx={{
                        marginRight: '20px',
                    }} size='large' variant='outlined' onClick={tempSave} >임시 저장</Button>
                    <Button size='large' variant='contained' onClick={buildVote} >투표 시작</Button>

                </Box>

                {/* <Button size='large' variant='outlined'>임시 저장</Button> */}

            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* <DeployTabs /> */}
            </Box>

            <Box sx={{ p: 3 }} >
                {/* <VoteRegisterRoadMap voteNum={5} /> */}

                <ProjectInputRow label="현재 마일스톤" description="투표가 진행될 마일스톤입니다">

                    <StyledFormControl sx={{
                        flexGrow: 1,
                    }} variant="outlined">
                        <InputLabel id="category-label">순서</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            defaultValue={1}
                            onChange={(e) => handlevoteNumChange(e)}
                            label="순서"
                        >
                        {
                            milestone.map((item, index) => {
                                return (
                                    <MenuItem key={item.id} value={item.voteNum}>{item.voteNum}</MenuItem>
                                )
                            })
                        }
                        </Select>
                    </StyledFormControl>
                </ProjectInputRow>

                <ProjectInputRow label="투표 제목" description="투표의 제목을 입력해 주세요">

                    <CssTextField
                        label="Vote Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth

                        margin="normal"
                        value={voteTitle}
                        onChange={handleVoteTitleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{`${voteTitle.length}/50`}</InputAdornment>,
                        }}
                    />
                </ProjectInputRow>

                <ProjectInputRow label="투표 설명" description="투표의 설명을 입력해 주세요">

                    <CssTextField
                        label="투표 설명"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={voteContent}
                        onChange={handleVoteContentChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{`${voteContent.length}/300`}</InputAdornment>,
                        }}
                    />
                </ProjectInputRow>

                <ProjectInputRow label="투표 기한" description="투표가 끝날 기한을 설정해 주세요">

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                        <DatePicker label={"투표 기한"} onChange={handleVoteEndDateChange} value={dayjs(voteEndDate)} />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </ProjectInputRow>

            </Box>

        </Box>





    )
}


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




function VoteTitle() {
    const website = useFundStore(state => state.website);
    const setWebsite = useFundStore(state => state.setWebsite);

    const handleVideoURLChange = (event) => {
        setWebsite(event.target.value);
    };

    return (

        <CssTextField
            label="Vote Title"
            variant="outlined"
            color="secondary"
            fullWidth

            margin="normal"
            value={website}
            onChange={handleVideoURLChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">{`${website.length}/50`}</InputAdornment>,
            }}
        />


    );
}