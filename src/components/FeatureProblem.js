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
                The Crowdfunding Industry faces trust issues.
            </FeatureTitle>
            <FeatureText>
                <ul>
                    <li>

                        Misusing of Funds : This scam involves the fundraiser taking the invested money for personal use rather than spending it on the project. Often in this case the project is never completed and investors’ requests for a return are ignored.
                    </li>

                    <li>
                        Campaign fraud : This occurs when a business misleads the investors, either purposefully or accidentally, about the nature of the project, its progress and outcome.
                    </li>

                    <li>
                        Fake platforms : Scam platforms that imitate “the real deal” target unsophisticated and inexperienced investors that don’t investigate the site before using it. Although not all new crowdfunding platforms are malicious, it’s important to recognise signs of fraud.
                    </li>

                    <li>
                        Unauthorised companies : Platforms that avoid registering with the appropriate regulation authority are unsolicited and illegal. Such companies often conduct fraudulent activities, placing their users at risk. Honest business owners that don’t register their firm end up being prosecuted.
                    </li>


                </ul>

            </FeatureText>
        </FeaturePaper>
    );
};

export default FeatureComponent;
