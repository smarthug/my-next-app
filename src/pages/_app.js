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
  cronosTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Appbar from '../components/Appbar';

import MainContainer from '../components/MainContainer';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
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
  projectId: 'YOUR_PROJECT_ID',
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
      <RainbowKitProvider chains={chains}>
        <Appbar />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
