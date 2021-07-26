import {AuthProvider} from '../context/AuthContext'
import {Head} from 'next/head'
import { ChakraProvider, ColorModeProvider,extendTheme, CSSReset } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import theme from '../styles/theme'
import '../components/sideContainer/scrollbar.css'
const myTheme = extendTheme(theme)

const GlobalStyle = ({ children }) => (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <CSSReset />
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}
    />
    {children}
  </>
);


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider CSSReset  theme={myTheme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
