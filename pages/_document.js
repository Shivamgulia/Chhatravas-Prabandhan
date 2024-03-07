import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* 
        Recaptcha script
        <script
          src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
          async
          defer
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
