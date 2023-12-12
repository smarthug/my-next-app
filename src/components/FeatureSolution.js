import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// Styled components
const FeaturePaper = styled(Paper)({
    padding: '2rem',
    textAlign: 'center',
    color: 'inherit',
    backgroundColor: '#fff', // Change as per your design
});

const FeatureTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '1rem',
});

const FeatureText = styled(Typography)({
    marginBottom: '1rem',
    fontSize: '1.25rem',
});

const HighlightedText = styled('span')(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.primary.main, // Change the color based on your theme
}));

const FeatureComponent = () => {
    return (
        <FeaturePaper elevation={0}>
            <FeatureTitle variant="h4" component="h3">
                CrowdStep have a solution with Smart Contract.

            </FeatureTitle>
            <FeatureText>
                <ul>
                    <li>

                        Independent & Secure fund : Every single funding will be securely stored in Smart Contract and even funding solicitor cannot access to this funding without permission of investor&apos;s DAO.
                    </li>

                    <li>
                        Safe Funds Execution : Funding solicitor gets each part of funding only when they properly finish their each milestone & after DAO&apos;s voting. If the voting of DAO fail, the rest of funding will be refunded.
                    </li>

                    <li>
                        Decentralized Fraud Prevention : DAO of CrowdStep can report a scam or fraud and get reward.
                    </li>




                </ul>

            </FeatureText>
        </FeaturePaper>
    );
};

export default FeatureComponent;
