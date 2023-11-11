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

function Deploy() {
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
    const [price, setPrice] = useState([0]);
    const [optDesc, setOptDesc] = useState([""]);
    const [repImage, setRepImage] = useState();
    const [repVideo, setRepVideo] = useState();
    const [like, setLike] = useState("");
    const [shared, setShared] = useState("");
    const [milestoneNum, setMilestoneNum] = useState();
    const [milestone, setMilestone] = useState([{
        id: 0
    }]);
    const [milestoneDesc, setMilestoneDesc] = useState([""]);
    const [milestoneDate, setMilestoneDate] = useState([""]);
    const [policy, setPolicy] = useState();
    const [searchTag, setSearchTag] = useState();
    const [website, setWebsite] = useState();
    const [fundAddress, setFundAddress] = useState("0x27b987ef956c33396baf3bf102044bf41cd1b4c9");

    
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
      
      async function getAddress(){
          const [address] = await window.ethereum.enable();
          console.log(address);
          setAccount(address);
      }
      const handleCategory1 = (e) => {
        setCategory1(e.target.value);
      }
      const handleCategory2 = (e) => {
        setCategory2(e.target.value);
      }
      const handleFundTitle = (e) =>{
          setFundTitle(e.target.value);
      }
      const handleFundContent = (e) =>{
          setFundContent(e.target.value);
      }
      const handleTeamContent = (e) =>{
          setTeamContent(e.target.value);
      }
    //   const handleFundStart = (e) =>{
    //     setFundStart(e.target.value);
    //   }
    //   const handleFundEnd = (e) =>{
    //     console.log(e);
    //     // setFundEnd(e.target.value);
    //   }
      const handleRepImage = (e) =>{
        setRepImage(e.target.value);
      }
      const handleLike = (e) =>{
        setLike(like + 1);
      }
      const handleShared = (e) => {
        setShared(e.target.value);
      }
      const handleSearchTag = (e) => {
        setSearchTag(e.target.value);
      }
      const handleWebsite = (e) => {
        setWebsite(e.target.value);
      }
      const handleRepVideo = (e) => {
        setRepVideo(e.target.value);
      }
      const handlePrice = (e) =>{
          setPrice(e.target.value);
      }
      const handleGoalAmount = (e) =>{
          setGoalAmount(e.target.value);
      }
      const handleMilestoneNum = (e) =>{
          setMilestoneNum(e.target.value);
      }
      
      const handleTitle = (e) =>{
          setVoteTitle(e.target.value);
      }
  
      const handleContent = (e) =>{
        setVoteContent(e.target.value);
    }
    const handlePolicy = (e) =>{
        setPolicy(e.target.value);
    }
    const handleOptionDesc = (index,e) =>{
        console.log(index);
        let tempOption = [...option];
        // let tempOption = option;
      tempOption[index].description = e.target.value;
      console.log(tempOption);
      setOption(tempOption);

    }
    const handleOptionPrice = (index,e) =>{
        console.log(index);
        let tempOption = [...option];
        // let tempOption = option;
      tempOption[index].price = e.target.value;
      console.log(tempOption);
      setOption(tempOption);

    }
    const setMoreOption = async() => {
        let tempOption = [...option];
        let counter = tempOption.slice(-1)[0];
        counter.id += 1; 
        tempOption.push(counter);
        setOption(tempOption);
        let tempPrice = [...price];
        let newArrPrice = tempPrice.slice(-1)[0];
        tempPrice.push(newArrPrice);
        setPrice(tempPrice);
        let tempOptDesc = [...optDesc];
        let newArrOptDesc = tempOptDesc.slice(-1)[0];
        tempOptDesc.push(newArrOptDesc);
        setOptDesc(tempOptDesc);
    }
    const setMoreMilestone = async() => {
        let tempMilestone = [...milestone];
        let counter = tempMilestone.slice(-1)[0];
        counter.id += 1; 
        tempMilestone.push(counter);
        setMilestone(tempMilestone);
        let tempMilestoneDesc = [...milestoneDesc];
        let newArrMilestoneDesc = tempMilestoneDesc.slice(-1)[0];
        tempMilestoneDesc.push(newArrMilestoneDesc);
        setMilestoneDesc(tempMilestoneDesc);
        let tempMilestoneDate = [...milestoneDate];
        let newArrMilestoneDate = tempMilestoneDate.slice(-1)[0];
        tempMilestoneDate.push(newArrMilestoneDate);
        setMilestoneDate(tempMilestoneDate);
    }
  
      const deployContract = async () => {
        const managerContract = await new web3.eth.Contract(fundManagerABI,fundManagerAddress) ;
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundManagerAddress,
          data: managerContract.methods.deployNFTFund("MyDeploy",account).encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
            console.log("Deploy success")
            console.log(receipt.logs[0].address);
            setFundAddress(receipt.logs[0].address);
          });

      }

      const setInitValue = async () => {
        let fundURL;
        let contentForUpload;
        let tempMilestone = new Array();
        let tempOption = new Array();
        for(let i = 0;i<milestone.length;i++){
            tempMilestone.push({
                "Description": milestoneDesc[i],
                "Date": milestoneDate[i].$d.toString()
            })
        }
        for(let i = 0;i<option.length;i++){
            tempOption.push({
                "Description": optDesc[i],
                "Price": price[i]
            })
        }
        if (fundTitle.length > 0 && fundContent.length > 0) {
            contentForUpload = {
                name:fundTitle,
                image:repImage,
                description:fundContent,
                Category1:category1,
                Category2:category2,
                Title: fundTitle,
                Description: fundContent,
                TeamDescription: teamContent,
                Milestone: tempMilestone,
                FundOption: tempOption,
                FundStart:fundStart.$d.toString(),
                FundEnd:fundEnd.$d.toString(),
                FundGoal:goalAmount,
                ImageURL:repImage,
                VideoURL:repVideo,
                Policy:policy,
                // SearchTag:searchTag,
                Website:website,
                Wallet:account
            }
            const fundURI = await ipfsUploadMetadata(contentForUpload);
            fundURL = `https://${fundURI}.ipfs.nftstorage.link`;
            
        }

        const encryptURL = await encrypt(fundURL.toString(), keyForAES);
        console.log(encryptURL);
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;

        
        // string memory name_,
        // string memory symbol_,
        // string memory _baseURL,
        // uint256 _milestoneNum,
        // uint256 _saleEndBlock,
        // uint256 _price,
        // uint256 _goalAmount,
        // uint256[] memory _fundRatio,
        // address _feeGetter,
        // string memory _fundContent
        const goalBlock = parseInt(await web3.eth.getBlockNumber(),10) + 100;
        console.log(parseInt(goalBlock));
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundAddress,
          data: contract.methods.setInitialValue(fundTitle, "FUND",fundURL,milestoneNum,goalBlock.toString(),price,goalAmount,[10,80,10],account,encryptURL).encodeABI(),
          gas: '1000000'            
          })
          .then(async function(receipt){
            var DB = await db.collection('Projects');
            var temp = await DB.doc(account).set(contentForUpload);
            console.log("Set Init Value success");
          });
      }
    
    const encrypt = (content, password) => AES.encrypt(JSON.stringify({ content }), password).toString()
    const decrypt = (crypted, password) => JSON.parse(AES.decrypt(crypted, password).toString(enc.Utf8)).content
    
      
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
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category1</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category1}
            label="Category1"
            onChange={handleCategory1}
            >
            <MenuItem value={"category1-1"}>category1</MenuItem>
            <MenuItem value={"category1-2"}>category2</MenuItem>
            <MenuItem value={"category1-3"}>category3</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category2</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category2}
            label="Category2"
            onChange={handleCategory2}
            >
            <MenuItem value={"category2-1"}>category1</MenuItem>
            <MenuItem value={"category2-2"}>category2</MenuItem>
            <MenuItem value={"category2-3"}>category3</MenuItem>
            </Select>
        </FormControl>
        <TextField
          required
          id="standard-required"
          label="title"
          defaultValue="Hello World"
          variant="standard"
          value={fundTitle}
          onChange={handleFundTitle}
        />
        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={4}
          value={fundContent}
          onChange={handleFundContent}
        />
        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={4}
          value={teamContent}
          onChange={handleTeamContent}
        />
        <Typography variant="h6" gutterBottom>
            Fund Setting
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker 
            label="fund start"
            value={fundStart}
            onChange={(newValue) => setFundStart(newValue)}
          />
          <DateTimePicker 
            label="fund end"
            value={fundEnd}
            onChange={(newValue) => setFundEnd(newValue)}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-multiline-static"
          label="goal amount"
          multiline
          rows={1}
          value={goalAmount}
          onChange={handleGoalAmount}
        />
        <Typography variant="h6" gutterBottom>
            Price Setting
        </Typography>
        <button onClick={() =>setMoreOption()}>+</button>
        {
            option.map((item, index) => {
                return (
                <div >
                    <TextField
                        id="outlined-multiline-static"
                        label="price"
                        multiline
                        value={price[index]}
                        rows={1}
                        onChange={(e) => {
                            console.log(index);
                            let tempOption = [...price];
                            tempOption[index] = e.target.value;
                            console.log(tempOption);
                            setPrice(tempOption);
                        }}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="option title"
                        value={optDesc[index]}
                        variant="standard"
                        onChange={(e) => {
                            console.log(index);
                            let tempOption = [...optDesc];
                            tempOption[index] = e.target.value;
                            console.log(tempOption);
                            setOptDesc(tempOption);
                        }}
                    />
                </div>
                )
            })
        }
        <Typography variant="h6" gutterBottom>
            Milestone Setting
        </Typography>
        <button onClick={() =>setMoreMilestone()}>+</button>
        {
            milestone.map((item, index) => {
                return (
                <div >
                    <TextField
                        id="outlined-multiline-static"
                        label="Milestone Description"
                        multiline
                        value={milestoneDesc[index]}
                        rows={1}
                        onChange={(e) => {
                            console.log(index);
                            let tempMilestoneDesc = [...milestoneDesc];
                            tempMilestoneDesc[index] = e.target.value;
                            console.log(tempMilestoneDesc);
                            setMilestoneDesc(tempMilestoneDesc);
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        value={milestoneDate}
                        onChange={(newValue) => {
                            let tempMilestoneDate = [...milestoneDate];
                            tempMilestoneDate[index] = newValue;
                            console.log(tempMilestoneDate);
                            setMilestoneDate(tempMilestoneDate)}}
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
          onChange={handleRepImage}
        />
        <TextField
          id="outlined-multiline-static"
          label="videoURL"
          multiline
          rows={1}
          value={repVideo}
          onChange={handleRepVideo}
        />
        <TextField
          id="outlined-multiline-static"
          label="website"
          multiline
          rows={1}
          value={website}
          onChange={handleWebsite}
        />
        <TextField
          id="outlined-multiline-static"
          label="policy"
          multiline
          rows={3}
          value={policy}
          onChange={handlePolicy}
        />
        <button type="button" onClick={setInitValue}>setInitialValue</button>
        <button type="button" onClick={deployContract}>Deploy Contract</button>
    </Box>
    </div>
  );


}

export default Deploy;