import { Box, Button, Typography } from "@mui/material";
import CreatedProjectCard from "@/components/CreatedProjectCard";
import Link from "next/link";
import { useEffect } from "react";

import {db } from '@/utils/firebase.js';

export default function Projects() {


    useEffect(() => {

        // const fetchData = async () => {
        //     // const db = await getFirestore();
        //     const data = await db.collection("projects").get();
        //     console.log(data.docs.map(doc => doc.data()));
        // }
        // fetchData();

    }, [])


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

                <CreatedProjectCard />
                <CreatedProjectCard />
            </Box>

        </div>
    )
}