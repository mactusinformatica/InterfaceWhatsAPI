import { Flex, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

export const Container = (props) => {

  

  const { colorMode } = useColorMode()

  const bgColor = { light: 'light.background', dark: 'dark.background' }

  const color = { light: 'light.primary', dark: 'dark.primary' }
  return (
    <Flex
      direction="column"
      alignItems="inherit"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}>


    </Flex>
  )
}
