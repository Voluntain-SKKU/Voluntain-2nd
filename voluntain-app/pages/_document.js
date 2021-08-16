import Document, { Html, Head, Main, NextScript } from 'next/document'

/**
 * Next.js에서 제공하는 기능으로, 전체 html 문서의 구조를 결정합니다.
 * 즉, 모든 페이지가 여기 구성된 구조대로 html로서 변환됩니다.
 * 
 * 현재 커스텀된 부분은 lang 속성 삽입과,
 * meta description 부분입니다.
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="description" content='Study All Together, Voluntain! Learn programming easily with tutorial videos of Sungkyunkwan University students.' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
