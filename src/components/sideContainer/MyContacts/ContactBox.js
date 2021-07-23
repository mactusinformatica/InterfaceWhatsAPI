import { Box, useColorMode } from '@chakra-ui/react'
import {Avatar} from '../../Avatar'
import { BsFillPersonFill} from "react-icons/bs"
import { FaWhatsapp} from "react-icons/fa"

export const  ContactBox = ({contact, setactive}) => {
    const {colorMode} = useColorMode();
    const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
    const bgColor = { light: 'light.background', dark: 'dark.background' }
    const secondaryColor = { light: 'light.secondary', dark: 'dark.secondary' }
    const fontColor = {light: 'light.fontColor', dark: 'dark.fontColor'}
    const colorful= {light: 'colorful.yellow', dark: 'colorful.red'}
    const hoverSecondary = {light: 'light.hoverSecondary', dark: 'dark.hoverSecondary'}

    return(
        <Box
        onClick={(e)=>setactive(contact)}
        color={fontColor[colorMode]} 
        height="max-content"
        bg={secondaryColor[colorMode]}
        p={2}
        
        marginTop="5px"
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        _hover={{
            background: hoverSecondary[colorMode],
            opacity:2
        } 
        }
        >
            <Box display="flex"
            alignItems="center"
            >
            <Box>
            <Avatar 
               icon={<BsFillPersonFill />}
               bg={colorful[colorMode]} 
               color={bgColor[colorMode]}
               fontSize={"25px"}
               size={"35px"}
               />
            </Box>       
            <Box display="flex"
             flexDirection="column"
             marginStart="10px"
             >
                <Box fontWeight={"700"}
                display='inline-block'
                fontSize="14px"
                wordBreak='break-word'
                >
                {contact.name.length<=30
                ?contact.name:contact.name.substring(0,30)+"..." }
                
                </Box> 
                <Box fontSize="14px" fontWeight={"400"} color={fontColor[colorMode]}>
                {contact.lastMessage.length<=14
                ?contact.lastMessage:contact.lastMessage.substring(0,12)+"..." }
                </Box> 
                <Box fontSize="10px" color={fontColor[colorMode]} opacity={0.7}>
                {contact.schedule_message}
                </Box> 
               
            </Box>
            </Box>
            <Box>
            <FaWhatsapp fontSize="30px" color="#25d366"/>
            </Box>
        </Box>
    );
}