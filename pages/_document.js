import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}