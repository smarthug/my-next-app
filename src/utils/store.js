import { create } from 'zustand'

// uint256 _goalAmount,
// uint _saleEndTime,

// uint256 _milestoneNum,
// uint256[] memory _fundRatio,

// uint256 _optionNum,
// uint256[] memory _prices,

// 여기서 , localstorage에 임시 저장된거 있으면 , 불러와서 넣어주기

const useFundStore = create((set) => ({
    goalAmount: 0,
    setGoalAmount: (goalAmount) => set({ goalAmount: goalAmount }),

    saleEndTime: 0,
    setSaleEndTime: (saleEndTime) => set({ saleEndTime: saleEndTime }),

    milestoneNum: 0,
    setMilestoneNum: (milestoneNum) => set({ milestoneNum: milestoneNum }),

    fundRatio: [],
    setFundRatio: (fundRatio) => set({ fundRatio: fundRatio }),

    optionNum: 0,
    setOptionNum: (optionNum) => set({ optionNum: optionNum }),

    prices: [],
    setPrices: (prices) => set({ prices: prices }),
}))

export default useFundStore