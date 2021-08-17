import { Box, useColorMode} from '@chakra-ui/react'

export const BtnSend = ({icon,event}) => {
    const {colorMode} = useColorMode();
    const background = { light: 'light.background', dark: 'dark.background' }
    const fontColor = { light: 'light.fontColor', dark: 'dark.fontColor' }
    return(
        <Box 
        onClick={event?(e)=>event():null}
        cursor={"pointer"} bg={"#FFFFFF"} 
        marginBottom={"10px"} 
        borderRadius="30px" 
        p={2}
        bg={background[colorMode]}
        color={fontColor[colorMode]}
        style={{
            boxShadow: "0px 4px 4px rgb(22, 75, 97,0.5)"
        }}
        _hover={
            {
            opacity: "0.7"
            }
        }
        >   

            {icon}

           

        </Box>
    )
}