import { Box, Button, Typography } from "@mui/material";
import CreatedProjectCard from "@/components/CreatedProjectCard";
import Link from "next/link";

// import VoteStepper from "@/components/VoteStepper";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";

const VoteStepper = dynamic(() => import('@/components/VoteStepper'), {
  ssr: false
})

export default function Projects() {
    const {
        query: { projectId }
    } = useRouter();

  


    return (
        <div>

            <Typography variant="h4" component="div" gutterBottom>
                Project Voting Page
            </Typography>

         
            <VoteStepper projectId={projectId} />
        </div>
    )
}