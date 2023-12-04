import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import CreatedProjectCard from "@/components/CreatedProjectCard";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import db from '@/utils/firebase.js';
// import VoteRegisterRoadMap from "@/components/VoteRegisterRoadMap";
// import VoteRegisterButton from "@/components/VoteRegisterButton";




const VoteRegisterButton = dynamic(() => import('@/components/VoteRegisterButton'), {
  ssr: false
})



const VoteRegistration = dynamic(() => import("@/components/VoteRegistration"), { ssr: false });

export default function Projects() {
    const {
        query: { projectId }
    } = useRouter();

    console.log(projectId);
    // 요걸로 , 프로젝트에 대한 정보 가져오고 ,
    
    

    //vote title 
    // vote description
    // vote end date

    // function buildVote ( 
    //     uint _endTime,
    //     string calldata voteContent,
    //     uint256 _voteIndex
    // ) public returns(bool){//onlyOwner
    //     require(_endTime-block.timestamp > 60, "End Block Number is too short");// 1day 603800
    //     if(_voteIndex != 1){
    //         require(votes[_voteIndex-1].voteStart == true, "You should start former vote first");
    //     }
    //     require(_endTime > block.timestamp, "End BlockNum has to be more than current block number.");
    //     require(_voteIndex <= milestoneNum && _voteIndex != 0, "You cannot set vote index more than milestone number");
    //     votes[_voteIndex].content = voteContent;
    //     votes[_voteIndex].voteStart = true;
    //     votes[_voteIndex].endTime = _endTime;
    // }


    return (
        <div>




            <Box sx={{ width: '100%', marginTop: "64px" }}>

                <VoteRegisterButton projectId={projectId} />

              

            </Box>

        </div>
    )
}


// export default function Test(){

//     return(
//         <h1>test</h1>
//     )
// }