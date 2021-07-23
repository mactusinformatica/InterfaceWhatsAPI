
import { Box,Text, Flex, useColorMode} from '@chakra-ui/react'




export const MessageBox = ({message, supId}) => {
    
    const {colorMode} = useColorMode();
    
    const primaryColorDark = { light: 'dark.primary', dark: 'dark.primary' }
    const primaryColor = { light: 'light.primary', dark: 'light.primary' }
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'light.hoverSecondary' }
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
                
                <Text fontWeight={"500"} color={primaryColorDark[colorMode]} >
                    {message.content}
                </Text> 
                <Text fontSize="12px"  color={primaryColorDark[colorMode]}  opacity textAlign="end">
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
        :message.id_author == supId?
        <Flex width="100%"  justifyContent="flex-end">
            <Box 
            bg={"blue.300"}
            
            minWidth="100px"
            maxWidth="450px" 
            pr={3}
            pl={3} 
            pt={2}
            margin={"10px"}
            borderRadius={"12px 0px 12px 12px"}
            boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            >
                
                <Text fontWeight={"400"} color={"#FFFFFF"}>
                    {message.content}
                </Text> 
                <Text fontSize="12px" opacity textAlign="end" color={"#FFFFFF"}>
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
       
        :
        <Flex width="100%" justifyContent="flex-start">
            <Box 
            bg={'#ffffff'}
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
                <Text color={primaryColor[colorMode]} fontWeight={"400"} color={"#000000"}>
                    {message.content}
                </Text> 
                <Text color={primaryColor[colorMode]} fontSize="12px" opacity textAlign="end">
                    {message.schedule_message}
                </Text> 
            </Box>
        </Flex>
            
        }
       </>
        )
   
}