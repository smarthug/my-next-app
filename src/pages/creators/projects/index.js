import { Box, Button, Typography } from "@mui/material";
import CreatedProjectCard from "@/components/CreatedProjectCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAccount } from '@wagmi/core'

import db from '@/utils/firebase.js';

export default function Projects() {
    const account = getAccount().address;
    const [creatorList, setCreatorList] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            let tempCreatorList = new Array();
            console.log(account);
            var DBCreator = await db.collection('Creator').doc(account.toLowerCase()).get().then(async function(data) {
                console.log(data.data())
                if(data.data() != undefined){
                    for(let i = 0;i<data.data().projectContract.length;i++){
                        tempCreatorList.push({
                            id: i,
                            address: data.data().projectContract[i]
                        });
                    }
                }
            });
            console.log(tempCreatorList);
            setCreatorList(tempCreatorList);
        }
        fetchData();

    }, [])

    useEffect(() => {
        console.log(creatorList);
    },[creatorList])


    return (
        <div>

            <Typography variant="h4" component="div" gutterBottom>
                내가 만든 프로젝트
            </Typography>

            <Button component={Link} href={"/creators/deploy/basic"} variant="contained">프로젝트 만들기</Button>

            <Box
                sx={{

                    '& > *': { // This targets all immediate children of the Box
                        margin: 3, // This applies margin to all sides of the children
                    },
                }}
            >
                {
                    creatorList.map((item) => {
                        return(
                            <CreatedProjectCard key={item.id} projectContract={item.address}/>
                        )
                    })
                }
            </Box>

        </div>
    )
}