import '../styles/globals.css';
import Layout from '../components/Layout';
// import Logger from '../components/Logger';
import TelegramProvider from '../components/TelegramProvider';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Logger /> */}
      <TelegramProvider>
        <Component {...pageProps} />
      </TelegramProvider>
      <div id="bg-overlay-bottom" />
    </Layout>
  );
}