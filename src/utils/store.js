import create from 'zustand'
import { useEffect } from 'react'
import { Subtitles } from '@mui/icons-material';

// Define the store without initial localStorage values
const useFundStore = create((set) => ({
    title: '',
    setTitle: (title) => set({ title}),

    subTitle: '',
    setSubTitle: (subTitle) => set({subTitle}),

    imageURL: '',
    setImageURL: (imageURL) => set({imageURL}),

    category1: 0,
    setCategory1: (category1) => set({category1}),

    category2: 0,
    setCategory2: (category2) => set({category2}),

    fundContent: '',
    setFundContent: (fundContent) => set({fundContent}),

    teamContent: '',
    setTeamContent: (teamContent) => set({teamContent}),

    policy: '',
    setPolicy: (policy) => set({policy}),

    wallet: '',
    setWallet: (wallet) => set({wallet}),

    website: '',
    setWebsite: (website) => set({website}),

    videoURL: '',
    setVideoURL: (videoURL) => set({videoURL}),

    goalAmount: 0,
    setGoalAmount: (goalAmount) => set({ goalAmount }),

    saleStartTime: '',
    setSaleStartTime: (saleStartTime) => set({ saleStartTime }),

    saleEndTime: '',
    setSaleEndTime: (saleEndTime) => set({ saleEndTime }),

    milestoneNum: 2,
    setMilestoneNum: (milestoneNum) => set({ milestoneNum }),

    milestoneDesc: [],
    setMilestoneDesc: (milestoneDesc) => set({milestoneDesc}),

    fundRatio: [],
    setFundRatio: (fundRatio) => set({ fundRatio }),

    optionNum: 0,
    setOptionNum: (optionNum) => set({ optionNum }),

    prices: [],
    setPrices: (prices) => set({ prices }),

    options: [],
    setOptions: (options) => set({ options }),

    fundContract: '',
    setFundContract: (fundContract) => set({fundContract}),
}));

// Component to initialize the store
export const FundStoreInitializer = () => {
    const setTitle = useFundStore((state) => state.setTitle);
    const setSubTitle = useFundStore((state) => state.setSubTitle);
    const setImageURL = useFundStore((state) => state.setImageURL);
    const setCategory1 = useFundStore((state) => state.setCategory1);
    const setCategory2 = useFundStore((state) => state.setCategory2);
    const setGoalAmount = useFundStore((state) => state.setGoalAmount);
    const setSaleEndTime = useFundStore((state) => state.setSaleEndTime);
    const setSaleStartTime = useFundStore((state) => state.setSaleStartTime);
    const setMilestoneNum = useFundStore((state) => state.setMilestoneNum);
    const setMilestoneDesc = useFundStore((state) => state.setMilestoneDesc);
    const setFundRatio = useFundStore((state) => state.setFundRatio);
    const setOptions = useFundStore((state) => state.setOptions);
    const setFundContent = useFundStore((state) => state.setFundContent);
    const setTeamContent = useFundStore((state) => state.setTeamContent);
    const setPolicy = useFundStore((state) => state.setPolicy);
    const setWallet = useFundStore((state) => state.setWallet);
    const setWebsite = useFundStore((state) => state.setWebsite);
    const setVideoURL = useFundStore((state) => state.setVideoURL);
    const setFundContract = useFundStore((state) => state.setFundContract);


    useEffect(() => {
        setTitle(localStorage.getItem("title") ?? '');
        setSubTitle(localStorage.getItem("subTitle") ?? '');
        setImageURL(localStorage.getItem("imageURL") ?? '');
        setCategory1(localStorage.getItem("category1") ?? 0);
        setCategory2(localStorage.getItem("category2") ?? 0);
        setFundContent(localStorage.getItem("fundContent") ?? '');
        setTeamContent(localStorage.getItem("teamContent") ?? '');
        setMilestoneDesc(JSON.parse(localStorage.getItem("milestoneDesc")) ?? []);
        setPolicy(localStorage.getItem("policy") ?? '');
        setWallet(localStorage.getItem("wallet") ?? '');
        setWebsite(localStorage.getItem("website") ?? '');
        setGoalAmount(localStorage.getItem("goalAmount") ?? 0);
        setSaleEndTime(localStorage.getItem("saleEndTime") ?? '');
        setSaleStartTime(localStorage.getItem("saleStartTime") ?? '');
        setMilestoneNum(localStorage.getItem("milestoneNum") ?? 2);
        setFundRatio(JSON.parse(localStorage.getItem("fundRatio")) ?? []);
        setOptions(JSON.parse(localStorage.getItem("options")) ?? []);
        setVideoURL(localStorage.getItem("videoURL") ?? '');
        setFundContract(localStorage.getItem("fundContract") ?? '');
    }, []);

    return null;
};

export default useFundStore;
