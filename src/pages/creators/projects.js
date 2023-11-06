import { Box, Button } from "@mui/material";
import CreatedProjectCard from "../../components/CreatedProjectCard";

export default function Projects() {


    return (
        <div>
            <h1>내가 만든 프로젝트</h1>

            <Button variant="contained">프로젝트 만들기</Button>

            <Box
                sx={{

                    '& > *': { // This targets all immediate children of the Box
                        margin: 3, // This applies margin to all sides of the children
                    },
                }
                }
            >

                <CreatedProjectCard />
                <CreatedProjectCard />
            </Box>

        </div>
    )
}