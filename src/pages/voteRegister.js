import react, {Component,useRef, useEffect, useState} from 'react';
import Web3 from "web3";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import db from '../utils/firebase.js';

let web3;
let contract;
const keyForAES = "thisiskey";

function Vote() {
    const [account, setAccount] = useState("");
    const [voteTitle, setVoteTitle] = useState("");
    const [voteContent, setVoteContent] = useState("");
    const [voteEndDate, setVoteEndDate] = useState("");
    const [fundTitle, setFundTitle] = useState("");
    const [milestone, setMilestone] = useState([]);
    const [milestoneNum, setMilestoneNum] = useState(1);
    const [endBlockNum, setEndBlockNum] = useState();
    const [existVote, setExistVote] = useState([]);
    const [fundAddress, setFundAddress] = useState("0xd7521ce0cda7383ea6000cb607d85179966e36c7");

    const fundABI = Contract.fundABI;
    
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
      
      
      async function getAddress(){
          const [address] = await window.ethereum.enable();
          console.log(address);
          setAccount(address);
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

      const getFundInfo = async() => {
        // contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        // console.log(fundAddress);
        
        // let fundInfo = await contract.methods.getFundInfo().call({from:account});
        // console.log(fundInfo);
        var DB = db.collection('Projects').doc(account).get().then(async function(data) {
            console.log(data.data());
            if(data.data() != undefined){
                setFundTitle(data.data().Title);
                let tempMilestone = [...milestone];
                let tempDBMilestoneData = data.data().Milestone
                for(let i = 1;i<=tempDBMilestoneData.length;i++){
                    tempMilestone.push(i);
                }
                setMilestone(tempMilestone);
                console.log(tempMilestone);
                setExistVote(data.data().Votes);
            }
          });

      }

      const timeDiff = async() => {
        if(voteEndDate != undefined){
          let timeNow = new dayjs();
          console.log(voteEndDate.unix());
        }
      }

      const withdraw = async() => {
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundAddress,
          data: contract.methods.withdraw("0").encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
          console.log("withdraw success")
          });

      }
    const buildVote = async() => {
        console.log(web3);
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        let voteURL;
        let tempVotes = [...existVote];
        tempVotes[milestoneNum] = {
            VoteTitle: voteTitle,
            VoteContent: voteContent,
            VoteEndDate: voteEndDate
        }
        if (voteTitle.length > 0 && voteContent.length > 0) {
            const contentForUpload = {
                VoteTitle: voteTitle,
                VoteContent: voteContent,
                VoteEndDate: voteEndDate
            }
            const voteURI = await ipfsUploadMetadata(contentForUpload);
            voteURL = `https://${voteURI}.ipfs.nftstorage.link`;
            var DB = await db.collection('Projects');
            var temp = await DB.doc(account).set(tempVotes);
            console.log("Set Vote Data success");
        }

        const encryptURL = await encrypt(voteURL.toString(), keyForAES);
        console.log(encryptURL);
        // const goalBlock = parseInt(await web3.eth.getBlockNumber(),10) + 60;
        // console.log(goalBlock);
        
        let ret = await web3.eth.sendTransaction({
        from: account,
        to: fundAddress,
        data: contract.methods.buildVote(voteEndDate.unix(),encryptURL,1).encodeABI(),//fundAddress, endBLock, option number, contentURL
        gas: '1000000'            
        })
        .then(function(receipt){
        console.log(receipt);
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
    <Typography variant="h6" gutterBottom>
        {fundTitle}
    </Typography>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Milestone</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={milestoneNum}
            onChange={handleMilestoneNum}
            >
                {
                    milestone.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
        <TextField
          required
          id="standard-required"
          label="vote title"
          defaultValue="Hello World"
          variant="standard"
          value={voteTitle}
          onChange={handleTitle}
        />
        <TextField
          id="outlined-multiline-static"
          label="vote description"
          multiline
          rows={4}
          value={voteContent}
          onChange={handleContent}
          defaultValue="Default Value"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker 
            label="Vote End Date"
            value={voteEndDate}
            onChange={(newValue) => setVoteEndDate(newValue)}
          />
        </LocalizationProvider>
        <button onClick={(event) => buildVote(event)}>Upload Vote</button>
        <button type="button" onClick={withdraw}>withdraw fund</button>
        <button type="button" onClick={timeDiff}>Get Time Diff</button>
        
    </Box>
    </div>
  );


}

export default Vote;