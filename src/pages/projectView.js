import react, {Component,useRef, useEffect, useState} from 'react';
import Web3 from "web3";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import db from '../utils/firebase.js';

let web3;
let contract;
const keyForAES = "thisiskey";

function ProjectView() {
    const [account, setAccount] = useState("");
    const [category1, setCategory1] = useState("");
    const [category2, setCategory2] = useState("");
    const [fundTitle, setFundTitle] = useState("");
    const [fundContent, setFundContent] = useState("");
    const [teamContent, setTeamContent] = useState("");
    const [fundStart, setFundStart] = useState("");
    const [fundEnd, setFundEnd] = useState("");
    const [goalAmount, setGoalAmount] = useState();
    const [option, setOption] = useState([{
        id: 0
    }]);
    const [ownNFTs, setOwnNFTs] = useState(0);
    const [price, setPrice] = useState([]);
    const [optDesc, setOptDesc] = useState([""]);
    const [repImage, setRepImage] = useState();
    const [repVideo, setRepVideo] = useState();
    const [like, setLike] = useState("");
    const [shared, setShared] = useState("");
    const [milestoneNum, setMilestoneNum] = useState();
    const [milestone, setMilestone] = useState([{
        id: 0
    }]);
    const [initialRatio, setInitialRatio] = useState(0);
    const [milestoneRatio, setMilestoneRatio] = useState([]);
    const [milestoneDesc, setMilestoneDesc] = useState([""]);
    const [milestoneDate, setMilestoneDate] = useState([""]);
    const [policy, setPolicy] = useState();
    const [searchTag, setSearchTag] = useState();
    const [website, setWebsite] = useState();
    const [selectedOption, setSelectedOption] = useState(0);
    const [mintAmount, setMintAmount] = useState(0);
    const [fundAddress, setFundAddress] = useState("0x12ba42a0018412b635119200331d9e6b8d3b17e0");

    
    const fundABI = Contract.fundABI;
    const fundManagerAddress = Contract.fundManagerAddress;
    const fundManagerABI = Contract.fundManagerABI;
    
    useEffect(() =>{
      
        if(window.ethereum && window.ethereum.isBitKeep == undefined){ 
          console.log(window.ethereum.providers);
          web3 = new Web3(window.ethereum);
          getAddress();
          
          window.ethereum.on('accountsChanged', (accounts) => {
            console.log(accounts);
            console.log("ACCOUNT CHANGED");
            let ret = setAccount(accounts[0]);  
            getAddress();
          })
        }
      },[]);
      
      useEffect(() =>{
        if(account.length > 0){
            getFundInfo();
        }
      },[account])

      
      const getFundInfo = async() => {
        // contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        // console.log(fundAddress);
        
        // let fundInfo = await contract.methods.getFundInfo().call({from:account});
        // console.log(fundInfo);
        var DB = db.collection('Projects').doc(account).get().then(async function(data) {
            console.log(data.data());
            if(data.data() != undefined){
                setFundTitle(data.data().Title);
                setCategory1(data.data().Category1);
                setCategory2(data.data().Category2);
                setFundContent(data.data().Description);
                let tempDayStart = Date(dayjs.unix(data.data().FundStart).format("YYYY-MM-DD"));
                let tempDayEnd = Date(dayjs.unix(data.data().FundEnd).format("YYYY-MM-DD"));
                // console.log();
                setFundStart(dayjs(tempDayStart));
                setFundEnd(dayjs(tempDayEnd));
                setGoalAmount(data.data().FundGoal);
                setRepImage(data.data().ImageURL);
                setRepVideo(data.data().VideoURL);
                setPolicy(data.data().Policy);
                setTeamContent(data.data().TeamDescription);
                setWebsite(data.data().Website);
                
                let tempMilestone = [...milestone];
                let tempDBMilestoneData = data.data().Milestone
                for(let i = 0;i<tempDBMilestoneData.length;i++){
                    let tempDayMilestone = Date(dayjs.unix(tempDBMilestoneData[i].Date).format("YYYY-MM-DD"));
                    tempMilestone.push({
                      id: i,
                      desc: tempDBMilestoneData[i].Description,
                      date: dayjs(tempDayMilestone),
                      ratio: tempDBMilestoneData[i].Ratio
                    });
                }
                setMilestone(tempMilestone);

                
                let tempOption = [...option];
                let tempDBOptionData = data.data().FundOption
                let tempPrice = [...price];
                for(let i = 0;i<tempDBOptionData.length;i++){
                    tempPrice.push(tempDBOptionData[i].Price);
                    tempOption.push({
                      id: i,
                      desc: tempDBOptionData[i].Description,
                      price: tempDBOptionData[i].Price
                    });
                }
                setPrice(tempPrice);
                setOption(tempOption);
                // setFundInfo(data.data());
            }
          });

      }
      
      async function getAddress(){
          const [address] = await window.ethereum.enable();
          console.log(address);
          setAccount(address);
      }
      
      const mintNFT = async () => {
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        console.log(price);
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundAddress,
          data: contract.methods.mintMultiple(account,mintAmount, selectedOption).encodeABI(),
          value: price[selectedOption],
          gas: '1000000'            
          })
          .then(function(receipt){
          console.log("Mint success")
          });
    }
    const checkMyNFT = async () => {
        console.log(web3);
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        console.log(fundAddress);
        
        let entryNum = await contract.methods.balanceOf(account).call({from:account});
        console.log(entryNum.toString());
        setOwnNFTs(entryNum.toString());
    }
    const handleOption = (e) =>{
      console.log(e.target.value);
        setSelectedOption(e.target.value);
    }
    const handleMintAmount = (e) =>{
      console.log(e.target.value);
        setMintAmount(e.target.value);
    }
      
  return (
    <div>
    <div style={{marginTop:"5%"}}>

    </div>
    
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
    }}
    noValidate
    autoComplete="off"
    >
        <Typography variant="h6" gutterBottom>
            Category1 : {category1}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Category2 : {category2}
        </Typography>
        <Typography variant="h6" gutterBottom>
            {fundTitle}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Project Description
        </Typography>
        <Typography variant="body" gutterBottom>
            {fundContent}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Team Description
        </Typography>
        <Typography variant="body" gutterBottom>
            {teamContent}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Funding date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker 
            label="fund start"
            value={fundStart}
            disabled
          />
          <DateTimePicker 
            label="fund end"
            value={fundEnd}
            disabled
          />
        </LocalizationProvider>
        <Typography variant="body" gutterBottom>
            Funding Goal : {goalAmount}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Options
        </Typography>
        {
            option.map((item, index) => {
                return (
                <div >
                <Typography variant="body" gutterBottom>
                    {item.price}
                </Typography>
                <Typography variant="body" gutterBottom>
                    {item.desc}
                </Typography>
                </div>
                )
            })
        }
        <Typography variant="h6" gutterBottom>
            Milestone Setting
        </Typography>
        <Typography variant="body" gutterBottom>
            Initial Fund
        </Typography>
        <Typography variant="body" gutterBottom>
            {initialRatio}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            value={fundEnd}
            disabled
                />
        </LocalizationProvider>
        {
            milestone.map((item, index) => {
                return (
                <div >
                    <Typography variant="body" gutterBottom>
                        {item.desc}
                    </Typography>
                    <Typography variant="body" gutterBottom>
                        {item.ratio}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        value={item.date}
                        disabled
                            />
                    </LocalizationProvider>
                </div>
                )
            })
        }
        <TextField
          id="outlined-multiline-static"
          label="iamgeURL"
          multiline
          rows={1}
          value={repImage}
        />
        <TextField
          id="outlined-multiline-static"
          label="videoURL"
          multiline
          rows={1}
          value={repVideo}
        />
        <TextField
          id="outlined-multiline-static"
          label="website"
          multiline
          rows={1}
          value={website}
        />
        <TextField
          id="outlined-multiline-static"
          label="policy"
          multiline
          rows={3}
          value={policy}
        />
    </Box>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Milestone</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        onChange={handleOption}
        >
            {
                option.map((item, index) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>{item.desc}</MenuItem>
                    )
                })
            }
        </Select>
    </FormControl>
    <TextField
        id="outlined-multiline-static"
        label="Mint amount"
        multiline
        rows={1}
        value={mintAmount}
        onChange={handleMintAmount}
    />
    <button type="button" onClick={mintNFT}>Mint My NFT(For Test)</button>
    <button type="button" onClick={checkMyNFT}>Check My NFT</button>
          <p>MyNFT : {ownNFTs}</p>
    </div>
  );


}

export default ProjectView;