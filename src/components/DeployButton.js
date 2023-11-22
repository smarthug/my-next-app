import { Box, Button, Typography } from '@mui/material';
import useFundStore from '../utils/store';


export default function DeployButton() {
    // const goalAmount = useFundStore(state => state.goalAmount)

    function tempSave() {
        console.log("임시 저장")

        // zustand 에 있던것들 가져와서 , local storage 에 저장해주기
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
        const {goalAmount} = useFundStore.getState()

        console.log(useFundStore.getState())


        const sumOfFund = useFundStore.getState().fundRatio.reduce((a, b) => a + Number(b), 0)
        console.log(sumOfFund)

        if(sumOfFund !== 100) {
            alert("펀딩 비율의 합이 100이 아닙니다.")
            return
        }

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
                    '& > *': {
                        margin: '0 15px',
                    },


                }}
            >

                <Button size='large' variant='outlined' onClick={tempSave} >임시 저장</Button>
                <Button size='large' variant='contained' onClick={deployProject} >제출</Button>

            </Box>

            {/* <Button size='large' variant='outlined'>임시 저장</Button> */}

        </Box>

    )
}