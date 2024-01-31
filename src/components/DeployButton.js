import { Box, Button, Typography } from '@mui/material';
import Web3 from "web3";
import { useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';
import Contract from "../utils/Contract.json";
import useFundStore, { FundStoreInitializer } from '../utils/store';
import { AES, enc } from 'crypto-js';
import { useLayoutEffect } from 'react';
import db from '../utils/firebase.js';
import dayjs from 'dayjs';

const keyForAES = "thisiskey";
// FundStoreInitializer()
export default function DeployButton() {
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



        // zustand 에 있던것들 가져와서 , local storage 에 저장해주기

        const {title, subTitle,category1, category2, fundContent, teamContent, milestoneDesc, imageURL, videoURL, policy, website, wallet,goalAmount, options,fundRatio,saleStartTime,saleEndTime,milestoneNum } = useFundStore.getState()

        // console.log(title);
        // console.log(subTitle);
        // console.log(category1)
        // console.log(category2)
        // console.log(fundContent)
        // console.log(teamContent)
        // console.log(milestoneDesc)
        // console.log(imageURL)
        // console.log(videoURL)
        // console.log(policy)
        // console.log(website)
        // console.log(wallet)

        console.log(options)

        localStorage.setItem('goalAmount', goalAmount)
        localStorage.setItem('options', JSON.stringify(options))
        localStorage.setItem('fundRatio', JSON.stringify(fundRatio))
        localStorage.setItem('category1', category1)
        localStorage.setItem('category2', category2)
        localStorage.setItem('saleEndTime', saleEndTime)
        localStorage.setItem('saleStartTime', saleStartTime)
        localStorage.setItem('milestoneNum', milestoneNum)
        localStorage.setItem('title', title)
        localStorage.setItem('subTitle', subTitle)
        localStorage.setItem('fundContent', fundContent)
        localStorage.setItem('teamContent', teamContent)
        localStorage.setItem('milestoneDesc', JSON.stringify(milestoneDesc))
        localStorage.setItem('imageURL', imageURL)
        localStorage.setItem('videoURL', videoURL)
        localStorage.setItem('policy', policy)
        localStorage.setItem('website', website)
        localStorage.setItem('wallet', wallet)

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
        const {title, subTitle, category1, category2,fundContent, teamContent, milestoneDesc, imageURL, videoURL, policy, website, wallet,goalAmount, options,fundRatio,saleStartTime,saleEndTime,milestoneNum } = useFundStore.getState()
        console.log(saleEndTime);
        console.log(saleStartTime);
        console.log(dayjs(saleEndTime));
        const account = window.ethereum.selectedAddress;
        const managerContract = await new web3.eth.Contract(fundManagerABI,fundManagerAddress) ;
        
        let ret = await web3.eth.sendTransaction({
          from: account,
          to: fundManagerAddress,
          data: managerContract.methods.deployNFTFund(title,account).encodeABI(),
          gas: '1000000'            
          })
          .then(function(receipt){
            
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
        console.log("saleStartTime", dayjs(saleStartTime).unix())
        console.log("saleEndTime", dayjs(saleEndTime).unix())
        console.log("milestoneNum", milestoneNum)
        console.log("fundRatio", fundRatio)
        console.log("milestoneDesc", milestoneDesc)
        console.log("optionNum", optionNum)
        console.log("options", options)
        console.log("prices", prices)

        let ethPrices = new Array();
        for(let i = 0;i<prices.length;i++){
            ethPrices.push(web3.utils.toWei(prices[i],"ether"));
        }
        
        if(sumOfFund !== 100) {
            alert("펀딩 비율의 합이 100이 아닙니다.")
            return
        }
        let fundURL;
        let contentForUpload;
        const tempMilestoneDesc = milestoneDesc.map((obj)=> {return Object.assign({}, obj)});
        const tempRatio = fundRatio.map((obj)=> {return Object.assign({}, obj)});
        // const tempOptionDesc = option.map((obj)=> {return Object.assign({}, obj.optionTitle)});
        // for(let i = 0;i<options.length;i++){
        //     tempOption.push({
        //         "Description": options[i].optionTitle,
        //         "Price": prices[i]
        //     })
        // }
        // console.log(tempOption);
        //options 받아와서 각각 metadata 형식으로 만들기
        //각 metadata를 nft.storage에 올리고 url 받기
        // metadata url을 setInitialValue에 넣기
        let tempOptions = {};//options의 각각의 metadata 형식 변수
        let optionsURL = new Array(); //metadata URL
        for(let i = 0;i<options.length;i++){
            tempOptions = {
                "name": title,
                "description": options[i].description,
                "image": options[i].imageURL,
                "soldNum": 0,
                "attribute": [
                    { "trait_type": "PRICE", "value": options[i].price+"ETH" }
                  ]
            };
            const optionURI = await ipfsUploadMetadata(tempOptions);
            optionsURL.push(`https://${optionURI}.ipfs.nftstorage.link`);
        }

        
        if (title.length > 0 && fundContent.length > 0) {
            contentForUpload = {
                name:title,
                image:imageURL,
                description:fundContent,
                Category1:category1,
                Category2:category2,
                Title: title,
                Description: fundContent,
                TeamDescription: teamContent,
                MilestoneDesc: milestoneDesc,
                MilestoneRatio: fundRatio,
                FundOption: options,
                FundStart:dayjs(saleStartTime).unix(),
                FundEnd:dayjs(saleEndTime).unix(),
                FundGoal:goalAmount,
                ImageURL:imageURL,
                VideoURL:videoURL,
                Policy:policy,
                // SearchTag:searchTag,
                Website:website,
                Wallet:account
            }
            const fundURI = await ipfsUploadMetadata(contentForUpload);
            fundURL = `https://${fundURI}.ipfs.nftstorage.link`;
            
        }

        console.log(fundURL);
        let contract = await new web3.eth.Contract(fundABI,fundContract) ;
        console.log(contentForUpload);

        
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
        const goalBlock = parseInt(await web3.eth.getBlockNumber(),10) + 100;
        console.log(parseInt(goalBlock));
        const tempGoalAmount = web3.utils.toWei(goalAmount,"ether")
        
        ret = await web3.eth.sendTransaction({
          from: account,
          to: fundContract,
          data: contract.methods.setInitialValue(title, "FUND",optionsURL,milestoneNum,dayjs(saleStartTime).unix(),dayjs(saleEndTime).unix().toString(),ethPrices,optionNum,tempGoalAmount,fundRatio,account).encodeABI(),
          gas: '2000000'            
          })
          .then(async function(receipt){
            console.log(receipt);
            var DBProject = await db.collection('Projects');
            var temp = await DBProject.doc(fundContract).set(contentForUpload);
            var DBCreator = await db.collection('Creator');
            var tempCreatorList = new Array();
            
            var tempCreatorData = await DBCreator.doc(account).get().then(async function(data) {    
                console.log(data.data());
                if(data.data() != undefined){
                    tempCreatorList = data.data().projectContract;
                }
            });
            tempCreatorList.push(fundContract);
            temp = await DBCreator.doc(account).set({
                projectContract : tempCreatorList
            }, { merge: true })
            console.log("Set Init Value success");
          });
    }
    return (
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
                

                }}
            >

                <Button sx={{
                    marginRight: '20px',
                }} size='large' variant='outlined' onClick={tempSave} >임시 저장</Button>
                <Button size='large' variant='contained' onClick={deployProject} >제출</Button>

            </Box>

            {/* <Button size='large' variant='outlined'>임시 저장</Button> */}

        </Box>

    )
}