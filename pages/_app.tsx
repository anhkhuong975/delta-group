import '../styles/global.css';
import { AppProps } from 'next/app';
import "../styles/main-layout.scss";
import "../styles/info.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
