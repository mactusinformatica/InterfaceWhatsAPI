import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {  
  body: "Roboto, sans-serif",
  heading: "Georgia, serif",
  mono: "Menlo, monospace" }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  config:{
    initialColorMode: "dark",
    useSystemColorMode: false,
  }, 
  colors: {
    light:{
      primary:'rgb(55, 182, 237)',
      secondary:"#efefef",
      hoverSecondary:"#E5F6FD",
      background:'#f9f9f9f9', 
      fontColor:"#164B61",
      boxMessage: "rgb(99, 179, 237)",
      boxMessage2: "#ffffff"
    },
    dark:{
      primary:'#164B61',
      secondary:"#1e4d60",
      hoverSecondary:"#164B61",
      background:'#1B262C',
      fontColor:"rgba(255, 255, 255, 1)",
      boxMessage: "rgb(26, 54, 93)",
      boxMessage2: "#2d393f"
    },
    colorful:{
      red: "rgb(224, 74, 99)",
      blue:"rgb(66, 153, 225)",
      green:"rgb(72, 187, 120)",
      yellow:"#E0D71D",
      red03: "rgb(224, 74, 99,0.3)",
      blue03:"rgb(66, 153, 225,0.3)",
      green03:"rgb(72, 187, 120,0.3)",
      red06: "rgb(224, 74, 99,0.6)",
      blue06:"rgb(66, 153, 225,0.6)",
      green06:"rgb(72, 187, 120,0.6)",
    }
  },
  fonts,
  breakpoints
})

export default theme
