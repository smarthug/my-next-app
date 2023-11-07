import react, {Component,useRef, useEffect, useState} from 'react';
import Web3 from "web3";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { AES, enc } from 'crypto-js';

let web3;
let contract;
const keyForAES = "thisiskey";

function Vote() {
   let [data, changeData] = useState("");
    const [account, setAccount] = useState("");
    const [ownNFTs, setOwnNFTs] = useState("");
    const [voteTitle, setVoteTitle] = useState("");
    const [voteContent, setVoteContent] = useState("");
    const [fundTitle, setFundTitle] = useState("");
    const [fundContent, setFundContent] = useState("");
    const [price, setPrice] = useState();
    const [goalAmount, setGoalAmount] = useState();
    const [milestoneNum, setMilestoneNum] = useState();
    const [readTitle, setReadTitle] = useState("");
    const [readContent, setReadContent] = useState("");
    const [votedOption, setVotedOption] = useState("");
    const [option, setOption] = useState([
        "1st option"
    ]);
    const [disagree, setDisagree] = useState();
    const [endBlockNum, setEndBlockNum] = useState();
    const [readOption, setReadOption] = useState([]);
    const [fundAddress, setFundAddress] = useState("0xd7521ce0cda7383ea6000cb607d85179966e36c7");

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
        console.log(readOption);
      },[readOption]);
      
      async function getAddress(){
          const [address] = await window.ethereum.enable();
          console.log(address);
          setAccount(address);
      }
      
      const handleFundTitle = (e) =>{
          setFundTitle(e.target.value);
      }
  
      const handleFundContent = (e) =>{
          setFundContent(e.target.value);
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
      const handleOption = (index,e) =>{
        let tempOption = [...option];
        tempOption[index] = e.target.value;
        setOption(tempOption);

      }
      const checkVote = (e) => {
        setVotedOption(e.target.value);

      }
      const setMoreOption = async() => {
        let tempOption = [...option];
        let counter = tempOption.slice(-1)[0]
        counter++;
        tempOption.push(counter);
        setOption(tempOption);
      }
  
      const checkMyNFT = async () => {
          console.log(web3);
          contract = await new web3.eth.Contract(fundABI,fundAddress) ;
          console.log(fundAddress);
          
          let entryNum = await contract.methods.balanceOf(account).call({from:account});
          console.log(entryNum.toString());
          setOwnNFTs(entryNum.toString());
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
        if (fundTitle.length > 0 && fundContent.length > 0) {
            const contentForUpload = {
                title: fundTitle,
                content: fundContent,
                price: price
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
          data: contract.methods.setInitialValue(fundTitle, "FUND","asdf",milestoneNum,goalBlock.toString(),price,goalAmount,[10,80,10],account,encryptURL).encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
          console.log("Mint success")
          });
      }

      const mintNFT = async () => {
          contract = await new web3.eth.Contract(fundABI,fundAddress) ;
          
          let ret = await web3.eth.sendTransaction({
            from: account,
            to: fundAddress,
            data: contract.methods.mintMultiple(account,"1").encodeABI(),
            value: price,
            gas: '1000000'            
            })
            .then(function(receipt){
            console.log("Mint success")
            });
      }

      const getFundInfo = async() => {
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        console.log(fundAddress);
        
        let fundInfo = await contract.methods.getFundInfo().call({from:account});
        console.log(fundInfo);

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
          console.log(web3);
          contract = await new web3.eth.Contract(fundABI,fundAddress) ;
          let readingURL = await contract.methods.getVote("1").call();
          console.log(readingURL);
  
          const decryptedURL = await decrypt(readingURL[0].toString(), keyForAES);
          setEndBlockNum(readingURL[1].toString());
          setDisagree(readingURL[2].toString());
  
          console.log(decryptedURL);
          const readingContent = await axios.get(decryptedURL);
          console.log(readingContent);
          setReadTitle(readingContent.data.title);
          setReadContent(readingContent.data.content);
          setReadOption(readingContent.data.option);
      }

      
      
    const buildVote = async() => {
        console.log(web3);
        contract = await new web3.eth.Contract(fundABI,fundAddress) ;
        let voteURL;
        if (voteTitle.length > 0 && voteContent.length > 0) {
            const contentForUpload = {
                title: voteTitle,
                content: voteContent
            }
            const voteURI = await ipfsUploadMetadata(contentForUpload);
            voteURL = `https://${voteURI}.ipfs.nftstorage.link`;
            
        }

        const encryptURL = await encrypt(voteURL.toString(), keyForAES);
        console.log(encryptURL);
        const goalBlock = parseInt(await web3.eth.getBlockNumber(),10) + 60;
        console.log(goalBlock);
        
        let ret = await web3.eth.sendTransaction({
        from: account,
        to: fundAddress,
        data: contract.methods.buildVote(goalBlock,encryptURL,1).encodeABI(),//fundAddress, endBLock, option number, contentURL
        gas: '1000000'            
        })
        .then(function(receipt){
        console.log(receipt);
        });
    }

    
    const encrypt = (content, password) => AES.encrypt(JSON.stringify({ content }), password).toString()
    const decrypt = (crypted, password) => JSON.parse(AES.decrypt(crypted, password).toString(enc.Utf8)).content
    
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
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
      }}
      noValidate
      autoComplete="off"
    >
    <button type="button" onClick={deployContract}>Deploy Contract</button>
    <button type="button" onClick={checkMyNFT}>Check My NFT</button>
      <button type="button" onClick={mintNFT}>Mint My NFT(For Test)</button>
      <p>MyNFT : {ownNFTs}</p>
    </Box>
    
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
    }}
    noValidate
    autoComplete="off"
    >
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
          defaultValue="Default Value"
        />
        <TextField
          id="outlined-multiline-static"
          label="price"
          multiline
          rows={1}
          value={price}
          onChange={handlePrice}
          defaultValue="Default Value"
        />
        <TextField
          id="outlined-multiline-static"
          label="goal amount"
          multiline
          rows={1}
          value={goalAmount}
          onChange={handleGoalAmount}
          defaultValue="Default Value"
        />
        <TextField
          id="outlined-multiline-static"
          label="milestone number"
          multiline
          rows={1}
          value={milestoneNum}
          onChange={handleMilestoneNum}
          defaultValue="Default Value"
        />
        <button type="button" onClick={setInitValue}>setInitialValue</button>
      <button type="button" onClick={getFundInfo}>getInfo</button>
      <button type="button" onClick={withdraw}>withdraw 1st fund</button>
    </Box>
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
    }}
    noValidate
    autoComplete="off"
    >
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
        {/* <button onClick={() =>setMoreOption()}>+</button> */}
      <button onClick={(event) => buildVote(event)}>Upload Vote</button>
    </Box>
    <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',p: 2, border: '1px solid black' },
    }}
    noValidate
    autoComplete="off"
    >
        <TextField
          required
          id="standard-required"
          label="vote read title"
          defaultValue="Hello World"
          variant="standard"
          value={readTitle}
        />
        <TextField
          id="outlined-multiline-static"
          label="vote read content"
          multiline
          rows={4}
          value={readContent}
          defaultValue="Default Value"
        />
        <button onClick={() => readVote()}>Read Vote</button>
        {/* <FormControl>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
        >
            {
                readOption.map((item, index) => {
                    return (
                    <FormControlLabel value={index} control={<Radio />} label={readOption[index]} onChange={(e) => checkVote(e)} />
                    )
                })
            }
        </RadioGroup>
        </FormControl> */}
        <button onClick={() => clickVote()}>Vote</button>
        <button onClick={() => getRefund()}>Refund</button>
    </Box>
    </div>
  );


}

export default Vote;