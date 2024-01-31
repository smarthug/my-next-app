import React, {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Web3 from "web3";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getAccount } from '@wagmi/core'
import Contract from "../utils/Contract.json";
import useFundStore, { FundStoreInitializer } from '../utils/store';

import db from '../utils/firebase.js';
import dayjs from 'dayjs';

const CustomPaper = styled(Paper)({
    padding: '20px',
    margin: '20px',
    //   textAlign: 'center',
});

const StyledButton = styled(Button)({
    // marginTop: '20px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#ff8787',
    },
});

const CustomTypography = styled(Typography)({
    margin: '10px 0',
});

const IconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
        margin: '0 5px',
    },
});

export default function ProjectViewPaper({ projectId, options, fundGoal, fundStart, fundEnd }) {

    const [selectedOptions, setSelectedOptions] = React.useState('');
    const [fundAmount, setFundAmount] = React.useState(0);
    const [leftDay, setLeftDay] = React.useState(0);
    const [fundedNum, setFundedNum] = React.useState(0);
    const fundABI = Contract.fundABI;
    const account = getAccount().address;
    web3 = new Web3(window.ethereum);

    
    useEffect(() => {
        if(leftDay == 0){
            getProjectData();
        }
    },[]);

    async function getProjectData() {
            let contract = await new web3.eth.Contract(fundABI,projectId) ;
            const projectData = await contract.methods.getFundInfo().call();
            console.log(projectData);
            setFundAmount(web3.utils.fromWei(parseInt(projectData[6]),"ether"));
            console.log(web3.utils.fromWei(projectData[6],"ether"));
            console.log(projectData[7]);
            setFundedNum(parseInt(projectData[7]));
            let date = new Date().getTime();
            let difference = parseInt(projectData[2])-(date/1000);
            console.log(date)
            console.log(parseInt(projectData[2]))
            setLeftDay(Math.floor(difference / (60 * 60)));
    }


    const handleSubcategoryChange = (event) => {

        setSelectedOptions(event.target.value);

    };


    async function handleMint() {
        if(selectedOptions.length < 1){
            alert("옵션을 선택해주세요.");
            return 0;
        }
        console.log(selectedOptions)
        console.log("mint");
        let contract = await new web3.eth.Contract(fundABI,projectId) ;
        console.log(options[selectedOptions].price);
        console.log(account);
        console.log(web3.utils.toWei(options[selectedOptions].price,"ether"));        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: projectId,
          data: contract.methods.mintMultiple(account,"1", selectedOptions).encodeABI(),
          value: web3.utils.toWei(options[selectedOptions].price,"ether"),//price는 web3.utils로 변환해서 넣거나, 컨트랙트에서 수정
          gas: '1000000'            
          })
          .then(async function(receipt){
            console.log("Mint success");
            let tempOptions = [...options];
            if(tempOptions[selectedOptions].soldNum != undefined){
                tempOptions[selectedOptions].soldNum += 1;

            }else{
                tempOptions[selectedOptions] = {
                    ...tempOptions[selectedOptions],
                    soldNum: 1
                }
            }
            var DBProject = await db.collection('Projects').doc(projectId).set({
                FundOption: tempOptions
            }, { merge: true })
            await getProjectData();
          })
          .catch((err) => {
            alert(err.data.message);
          })
    }


    return (
        <CustomPaper elevation={0}>
            <CustomTypography variant="h6">모인 금액</CustomTypography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >

                <CustomTypography variant="h4">{fundAmount} ETH

                </CustomTypography>

                <Box sx={{ flexGrow: "1" }} />


                <CustomTypography variant="body2" color="textSecondary">
                    {fundAmount/fundGoal*100}%
                </CustomTypography>

            </Box>

            <CustomTypography variant="h6">남은시간</CustomTypography>
            {/* <CustomTypography variant="h4">24 일</CustomTypography> */}
            <CustomTypography variant="h4">{leftDay} 시간</CustomTypography>
            <CustomTypography variant="h6">후원자</CustomTypography>
            <CustomTypography variant="h4">{fundedNum} 명</CustomTypography>
            <Typography variant="body2" color="textSecondary">
                목표금액 {fundGoal}eth
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
                펀딩 기간 {fundStart} ~ {fundEnd}
            </Typography> */}

            <Typography variant="body2" color="textSecondary">
                펀딩 기간 {dayjs.unix(fundStart).format('YYYY.MM.DD')} ~ {dayjs.unix(fundEnd).format('YYYY.MM.DD')}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
                결제일 목표금액 달성시 2024.01.01에 결제 진행
            </Typography> */}
            {/* <IconContainer>
                <FavoriteBorderIcon />
                <Typography variant="body2">546</Typography>
                <ShareIcon />
                <Typography variant="body2">25</Typography>
            </IconContainer> */}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // textAlign: 'center',


                    justifyContent: 'center',

                    marginTop: '20px',
                }}
            >

                <FormControl
                    sx={{
                        flexGrow: 1,
                        width: '100px',
                    }}
                    variant="outlined">
                    <InputLabel id="subcategory-label">옵션</InputLabel>
                    <Select
                        labelId="subcategory-label"
                        id="subcategory-select"
                        value={selectedOptions}
                        onChange={handleSubcategoryChange}
                        label="옵션 선택"
                    >
                        <MenuItem value="">
                            <em>옵션 선택</em>
                        </MenuItem>

                        {options.map((option, index) => {
                            return (
                                <MenuItem key={index} value={index}>{option.optionTitle} / {option.price}eth</MenuItem>
                            )
                        }
                        )}


                        {/* Add more MenuItem components as needed */}
                    </Select>
                </FormControl>




                <Box sx={{ flexGrow: "1" }} />

                <StyledButton variant="contained" onClick={handleMint}>
                    이 프로젝트 후원하기
                </StyledButton>
            </Box>

        </CustomPaper>
    );
}
