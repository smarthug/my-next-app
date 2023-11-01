import Image from 'next/image'
import { Inter } from 'next/font/google'

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/loading-screen';
import { auth } from '@/utils/firebase';
import styled from '@emotion/styled';
import CreateAccount from './create-account';
// import Project from './project';

const inter = Inter({ subsets: ['latin'] })

const Wrapper = styled('div')({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  });


export default function Home() {

    const [isLoading, setIsLoading] = useState(true)

    const init = async () => {
        //wait for firebase
        await auth.authStateReady();
        setIsLoading(false)

      

    }

    useEffect(() => {
        init()
    }, [])


    return (
        <Wrapper>
            {/* <Project /> */}
            {isLoading ? <LoadingScreen /> : <h1>FireBase</h1>}
            <CreateAccount />
        </Wrapper>
    )
}
