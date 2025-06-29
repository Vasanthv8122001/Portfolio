// import "@/styles/globals.css";
import "../styles/style.scss";
import Script from "next/script";

export default function App({ Component, pageProps }) {

  return <>
    <Component {...pageProps} />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
  </>
}
