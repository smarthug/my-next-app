import React from 'react'
import { Box } from '@mui/material'

import Loading from './Loading'
import { Container } from '@mui/system'

import { useCrowdStepStore } from '@/utils/store'

// interface Props {
//     children: React.ReactElement
// }

export default function MainContainer({ children }) {
    const isLoading = useCrowdStepStore(state => state.isLoading)


    if (isLoading) {
        return <Loading />
    }

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, marginTop: 9, width: '100%' }}
        >
            <Container maxWidth="lg">

                {children}
            </Container>
        </Box>

    )
}