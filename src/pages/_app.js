// import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';



import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  polygonMumbai,
  cronosTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Appbar from '../components/Appbar';

import MainContainer from '../components/MainContainer';
import { FundStoreInitializer } from '../utils/store';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import darkTheme from '@/utils/theme';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai,
    cronosTestnet,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <FundStoreInitializer />
      <RainbowKitProvider chains={chains}>
        {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
          <Appbar />
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        {/* </ThemeProvider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
