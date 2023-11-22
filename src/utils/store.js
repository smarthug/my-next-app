import create from 'zustand'
import { useEffect } from 'react'

// Define the store without initial localStorage values
const useFundStore = create((set) => ({
    goalAmount: 0,
    setGoalAmount: (goalAmount) => set({ goalAmount }),

    saleEndTime: '',
    setSaleEndTime: (saleEndTime) => set({ saleEndTime }),

    milestoneNum: 2,
    setMilestoneNum: (milestoneNum) => set({ milestoneNum }),

    fundRatio: [],
    setFundRatio: (fundRatio) => set({ fundRatio }),

    optionNum: 0,
    setOptionNum: (optionNum) => set({ optionNum }),

    prices: [],
    setPrices: (prices) => set({ prices }),

    options: [],
    setOptions: (options) => set({ options }),
}));

// Component to initialize the store
export const FundStoreInitializer = () => {
    const setGoalAmount = useFundStore((state) => state.setGoalAmount);
    const setSaleEndTime = useFundStore((state) => state.setSaleEndTime);
    const setMilestoneNum = useFundStore((state) => state.setMilestoneNum);
    const setFundRatio = useFundStore((state) => state.setFundRatio);
    const setOptions = useFundStore((state) => state.setOptions);

    useEffect(() => {
        setGoalAmount(localStorage.getItem("goalAmount") ?? 0);
        setSaleEndTime(localStorage.getItem("saleEndTime") ?? '');
        setMilestoneNum(localStorage.getItem("milestoneNum") ?? 2);
        setFundRatio(JSON.parse(localStorage.getItem("fundRatio")) ?? []);
        setOptions(JSON.parse(localStorage.getItem("options")) ?? []);
    }, []);

    return null;
};

export default useFundStore;
