import { Box,Text, Flex, useColorMode} from '@chakra-ui/react'
import useAuth from '../../../../hooks/useAuth';
import {Content} from './Content'


export const MessageBox = ({message}) => {
    const {user} = useAuth();

    const {colorMode} = useColorMode();
    const fontColor = { light: 'light.fontColor', dark: 'dark.fontColor' }
    const primaryColorDark = { light: 'dark.primary', dark: 'dark.primary' }
    const primaryColor = { light: 'light.primary', dark: 'light.primary' }
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'light.hoverSecondary' }
    const boxMessageColor = { light: 'light.boxMessage', dark: 'dark.boxMessage'}
    const boxMessage2 = { light: 'light.boxMessage2', dark: 'dark.boxMessage2' }
    return(
        <>
        {message.id_author==0?
        <Flex width="100%"  justifyContent="center">
            <Box 
            bg={hoverSecondary[colorMode]}
          
            minWidth="100px"
            maxWidth="450px" 
            pr={3}
            pl={3} 
            pt={2}
            margin={"10px"}
            borderRadius={"12px 12px 12px 12px"}
            boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >
                <Content message={message} fontWeight={"500"} color={primaryColorDark[colorMode]}/>
                <Text fontSize="12px"  color={primaryColorDark[colorMode]}  opacity textAlign="end">
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
        :message.id_author == user.id?
        <Flex width="100%"  justifyContent="flex-end">
            <Box 
            bg={boxMessageColor[colorMode]}
            width={'max-content'}
            pr={3}
            pl={3} 
            pt={2}
            margin={"10px"}
            borderRadius={"12px 0px 12px 12px"}
            boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >
                <Content message={message} color={"#FFFFFF"}/>
                    
                <Text fontSize="12px" opacity textAlign="end" color={"#FFFFFF"}>
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
        :
        <Flex width="100%" justifyContent="flex-start">
            <Box 
            bg={boxMessage2[colorMode]}
            minWidth="100px"
            maxWidth="450px" 
            pr={3}
            pl={3}
            margin={"10px"}
            borderRadius={"0px 12px 12px 12px"}
            boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >
                <Text color={primaryColor[colorMode]} fontSize="12px" opacity textAlign="start">
                    {message.name_author}
                </Text> 
                <Content message={message} color={fontColor[colorMode]}/>
                <Text color={primaryColor[colorMode]} fontSize="12px" opacity textAlign="end">
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
            
        }
       </>
        )
   
}