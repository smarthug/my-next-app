import { Box, Button, Typography, TextareaAutosize, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Web3 from "web3";
import { useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import useFundStore, { FundStoreInitializer } from '../utils/store';
import { AES, enc } from 'crypto-js';
import { useLayoutEffect } from 'react';
import db from '../utils/firebase.js';
import ProjectInputRow from './ProjectInputRow.js';

import React, { useState } from 'react';
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

const keyForAES = "thisiskey";
// FundStoreInitializer()
export default function DeployButton() {

    // const website = useFundStore(state => state.website);
    // const setWebsite = useFundStore(state => state.setWebsite);

    // const handleVideoURLChange = (event) => {
    //     setWebsite(event.target.value);
    // };

    const [voteTitle, setVoteTitle] = useState("")

    const handleVoteTitleChange = (event) => {
        setVoteTitle(event.target.value);
    }

    const [voteContent, setVoteContent] = useState("")
    const handleVoteContentChange = (event) => {
        setVoteContent(event.target.value);
    }

    const [voteEndDate, setVoteEndDate] = useState("")

    const handleVoteEndDateChange = (event) => {
        setVoteEndDate(event);
    }




    // 여기다가 만들기 , 필요할 것들
    // const goalAmount = useFundStore(state => state.goalAmount)

    web3 = new Web3(window.ethereum);
    const setFundContract = useFundStore(state => state.setFundContract);
    // const { chain } = useNetwork()
    // // const { data: signer, isError, isLoading } = useSigner();
    // const signer = useSigner();

    const fundABI = Contract.fundABI;
    const fundManagerAddress = Contract.fundManagerAddress;
    const fundManagerABI = Contract.fundManagerABI;

    function tempSave() {
        console.log("임시 저장")



        console.log(voteTitle);
        console.log(voteContent);
        console.log(voteEndDate);

        // console.log('saleEndTime', saleEndTime.getTime())
    }

    async function deployProject() {
        console.log("제출")

        // zustand 에 있던것들로 , set Initial value 호출하기 

        // uint256 _goalAmount,
        // uint _saleEndTime,

        // uint256 _milestoneNum,
        // uint256[] memory _fundRatio,

        // uint256 _optionNum,
        // uint256[] memory _prices,

        // Getting non-reactive fresh state

        //Deploy Contract
        // const managerContract = await new ethers.Contract(fundManagerAddress,fundManagerABI, signer) ;

        // console.log("contract deploy")

        // const contractWithSigner = managerContract.connect(signer)
        // console.log(signer);

        // const tx = await contractWithSigner.deployNFTFund(title,)
        // const rc = await tx.wait()

        // console.log(tx);
        // console.log(rc);
        const { title, subTitle, category1, category2, fundContent, teamContent, milestoneDesc, imageURL, videoURL, policy, website, wallet, goalAmount, options, fundRatio, saleStartTime, saleEndTime, milestoneNum } = useFundStore.getState()
        console.log(saleEndTime);
        console.log(saleStartTime);
        const account = window.ethereum.selectedAddress;
        const managerContract = await new web3.eth.Contract(fundManagerABI, fundManagerAddress);

        let ret = await web3.eth.sendTransaction({
            from: account,
            to: fundManagerAddress,
            data: managerContract.methods.deployNFTFund(title, account).encodeABI(),
            gas: '1000000'
        })
            .then(function (receipt) {

                console.log("Deploy success")
                console.log(receipt.logs[0].address);
                setFundContract(receipt.logs[0].address);

            });
        const fundContract = useFundStore.getState().fundContract;
        console.log(useFundStore.getState())

        const optionNum = options.length
        const prices = options.map(option => option.price)
        // console.log(prices)

        const sumOfFund = useFundStore.getState().fundRatio.reduce((a, b) => a + Number(b), 0)
        // console.log(sumOfFund)

        console.log(title);
        console.log(subTitle);
        console.log(category1)
        console.log(category2)
        console.log(fundContent)
        console.log(teamContent)
        console.log(milestoneDesc)
        console.log(imageURL)
        console.log(videoURL)
        console.log(policy)
        console.log(website)
        console.log(wallet)
        console.log("goalAmount", goalAmount)
        console.log("saleStartTime", saleStartTime.unix())
        console.log("saleEndTime", saleEndTime.unix())
        console.log("milestoneNum", milestoneNum)
        console.log("fundRatio", fundRatio)
        console.log("milestoneDesc", milestoneDesc)
        console.log("optionNum", optionNum)
        console.log("options", options)
        console.log("prices", prices)

        if (sumOfFund !== 100) {
            alert("펀딩 비율의 합이 100이 아닙니다.")
            return
        }
        let fundURL;
        let contentForUpload;
        let tempMilestone = new Array();
        let tempOption = new Array();
        let tempRatioTotal = parseInt(fundRatio[0]);
        let tempRatio = new Array();
        tempRatio.push(Number(fundRatio[0]));
        console.log(tempRatio);
        for (let i = 0; i < milestoneDesc.length; i++) {
            tempRatioTotal += parseInt(fundRatio[i]);
            tempRatio.push(Number(fundRatio[i]));
            tempMilestone.push({
                "Description": milestoneDesc[i],
                // "Date": milestoneDate[i].unix(),
                "Ratio": fundRatio[i]
            })
        }

        for (let i = 0; i < options.length; i++) {
            tempOption.push({
                "Description": options[i].optionTitle,
                "Price": prices[i]
            })
        }


        if (title.length > 0 && fundContent.length > 0) {
            contentForUpload = {
                name: title,
                image: imageURL,
                description: fundContent,
                Category1: category1,
                Category2: category2,
                Title: title,
                Description: fundContent,
                TeamDescription: teamContent,
                Milestone: tempMilestone,
                FundOption: tempOption,
                FundStart: saleStartTime.unix(),
                FundEnd: saleEndTime.unix(),
                FundGoal: goalAmount,
                ImageURL: imageURL,
                VideoURL: videoURL,
                Policy: policy,
                // SearchTag:searchTag,
                Website: website,
                Wallet: wallet
            }
            const fundURI = await ipfsUploadMetadata(contentForUpload);
            fundURL = `https://${fundURI}.ipfs.nftstorage.link`;

        }

        const encryptURL = await encrypt(fundURL.toString(), keyForAES);
        console.log(fundURL);
        let contract = await new web3.eth.Contract(fundABI, fundContract);


        // string memory name_,
        // string memory symbol_,
        // string memory _baseURL,
        // uint256 _milestoneNum,
        // uint256 _saleEndBlock,
        // uint256[] memory _prices,
        // uint256 _optionNum,
        // uint256 _goalAmount,
        // uint256[] memory _fundRatio,
        // address _feeGetter,
        // string memory _fundContent
        const goalBlock = parseInt(await web3.eth.getBlockNumber(), 10) + 100;
        console.log(parseInt(goalBlock));

        ret = await web3.eth.sendTransaction({
            from: account,
            to: fundContract,
            data: contract.methods.setInitialValue(title, "FUND", fundURL, milestoneNum, saleEndTime.unix().toString(), prices, optionNum, goalAmount, fundRatio, account, encryptURL).encodeABI(),
            gas: '2000000'
        })
            .then(async function (receipt) {
                console.log(receipt);
                var DB = await db.collection('Projects');
                var temp = await DB.doc(account).set(contentForUpload);
                console.log("Set Init Value success");
            });
    }

    const encrypt = (content, password) => AES.encrypt(JSON.stringify({ content }), password).toString()
    const decrypt = (crypted, password) => JSON.parse(AES.decrypt(crypted, password).toString(enc.Utf8)).content





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
                    <Button size='large' variant='contained' onClick={deployProject} >투표 시작</Button>

                </Box>

                {/* <Button size='large' variant='outlined'>임시 저장</Button> */}

            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* <DeployTabs /> */}
            </Box>

            <Box sx={{ p: 3 }} >
                {/* <VoteRegisterRoadMap milestoneNum={5} /> */}

                <ProjectInputRow label="현재 마일스톤" description="투표가 진행될 마일스톤입니다">

                    <StyledFormControl sx={{
                        flexGrow: 1,
                    }} variant="outlined">
                        <InputLabel id="category-label">순서</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={1}
                            onChange={() => { }}
                            label="순서"
                        >
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            {/* Add more MenuItem components as needed */}
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
                        <DatePicker label={"투표 기한"} onChange={handleVoteEndDateChange} value={voteEndDate} />
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