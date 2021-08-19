import {Flex, useColorMode, Text} from '@chakra-ui/react'

export const HeaderChat = () => {
    const {colorMode} = useColorMode();
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'dark.hoverSecondary' }
    const primaryColor =  { light: 'light.fontColor', dark: 'dark.fontColor' }

    return(
        <Flex 
        justifyContent="center"
        width={"100%"} 
        bg={hoverSecondary[colorMode]} 
        borderTop={"1px"}
        borderBottom={"1px"} 
        color={primaryColor[colorMode]}>
           <Text fontSize='1xl' textShadow='md' fontWeight='700'>
               CHAT ATENDIMENTO
            </Text>

        </Flex>
    )

}