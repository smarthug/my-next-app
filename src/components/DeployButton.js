import { Box, Button, Typography } from '@mui/material';
import useFundStore, { FundStoreInitializer } from '../utils/store';
import { useLayoutEffect } from 'react';

// FundStoreInitializer()
export default function DeployButton() {
    // const goalAmount = useFundStore(state => state.goalAmount)

    function tempSave() {
        console.log("임시 저장")



        // zustand 에 있던것들 가져와서 , local storage 에 저장해주기

        const {goalAmount, options,fundRatio,saleEndTime,milestoneNum } = useFundStore.getState()

        localStorage.setItem('goalAmount', goalAmount)
        localStorage.setItem('options', JSON.stringify(options))
        localStorage.setItem('fundRatio', JSON.stringify(fundRatio))
        localStorage.setItem('saleEndTime', saleEndTime)
        localStorage.setItem('milestoneNum', milestoneNum)

        // console.log('saleEndTime', saleEndTime.getTime())
    }

    function deployProject() {
        console.log("제출")

        // zustand 에 있던것들로 , set Initial value 호출하기 

        // uint256 _goalAmount,
        // uint _saleEndTime,

        // uint256 _milestoneNum,
        // uint256[] memory _fundRatio,

        // uint256 _optionNum,
        // uint256[] memory _prices,

        // Getting non-reactive fresh state
        const {goalAmount, options,fundRatio,saleEndTime,milestoneNum } = useFundStore.getState()

        console.log(useFundStore.getState())

        const optionNum = options.length
        const prices = options.map(option => option.price)
        // console.log(prices)

        const sumOfFund = useFundStore.getState().fundRatio.reduce((a, b) => a + Number(b), 0)
        // console.log(sumOfFund)

        console.log("goalAmount", goalAmount)
        console.log("saleEndTime", saleEndTime)
        console.log("milestoneNum", milestoneNum)
        console.log("fundRatio", fundRatio)
        console.log("optionNum", optionNum)
        console.log("prices", prices)
        
        if(sumOfFund !== 100) {
            alert("펀딩 비율의 합이 100이 아닙니다.")
            return
        }
    }


    useLayoutEffect(() => {
        // FundStoreInitializer()


    }, [])


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