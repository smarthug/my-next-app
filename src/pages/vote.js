import react, {Component,useRef, useEffect, useState} from 'react';
import Web3 from "web3";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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

function Vote() {
    const [account, setAccount] = useState("");
    const [ownNFTs, setOwnNFTs] = useState("");
    const [voteTitle, setVoteTitle] = useState("");
    const [voteContent, setVoteContent] = useState("");
    const [fundTitle, setFundTitle] = useState("");
    const [milestone, setMilestone] = useState([]);
    const [milestoneNum, setMilestoneNum] = useState(1);
    const [endBlockNum, setEndBlockNum] = useState();
    const [existVote, setExistVote] = useState([]);
    const [fundAddress, setFundAddress] = useState("0x12ba42a0018412b635119200331d9e6b8d3b17e0");

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
  
      const checkMyNFT = async () => {
          console.log(web3);
          contract = await new web3.eth.Contract(fundABI,fundAddress) ;
          console.log(fundAddress);
          
          let entryNum = await contract.methods.balanceOf(account).call({from:account});
          console.log(entryNum.toString());
          setOwnNFTs(entryNum.toString());
      }

      const getFundInfo = async() => {
        
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
              setVoteTitle(data.data().Votes[0].VoteTitle);
              setVoteContent(data.data().Votes[0].VoteContent);
          }
        });


      }
      const getRefund = async() => {
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundAddress,
          data: contract.methods.getRefund("1").encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
          console.log("refund success")
          });

      }
      const readVote = async() => {
          // console.log(web3);
          // contract = await new web3.eth.Contract(fundABI,fundAddress) ;
          // let readingURL = await contract.methods.getVote("1").call();
          // console.log(readingURL);
  
          // const decryptedURL = await decrypt(readingURL[0].toString(), keyForAES);
          // setEndBlockNum(readingURL[1].toString());
          // setDisagree(readingURL[2].toString());
  
          // console.log(decryptedURL);
          // const readingContent = await axios.get(decryptedURL);
          // console.log(readingContent);
          // setVoteTitle(readingContent.data.title);
          // setVoteContent(readingContent.data.content);
      }

    
    const clickVote = async () => {
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundAddress,
          data: contract.methods.voteDisagree(1).encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
          console.log("Vote success")
          });
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
        {fundTitle}
    </Typography>
    </Box>
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
    }}
    noValidate
    autoComplete="off"
    >
    <Typography variant="h6" gutterBottom>
        {voteTitle}
    </Typography>
    <Typography variant="body1" gutterBottom>
        {voteContent}
    </Typography>
        <button type="button" onClick={checkMyNFT}>Check My NFT</button>
          <p>MyNFT : {ownNFTs}</p>
        <button onClick={() => clickVote()}>Disagree</button>
        <button onClick={() => getRefund()}>Refund</button>
    </Box>
    </div>
  );


}

export default Vote;