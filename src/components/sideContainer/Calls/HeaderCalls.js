import {Flex, Box,Text, useColorMode,Tooltip} from '@chakra-ui/react'

export const  HeaderCalls = ({pending, answering, finished}) => {
    const {colorMode} = useColorMode();
    const red = {light: 'colorful.red', dark: 'colorful.red'}
    const blue = {light: 'colorful.blue', dark: 'colorful.blue'}
    const green = {light: 'colorful.green', dark: 'colorful.green'}
    return(
        <Flex justifyContent="space-around" p={"5px"}>
            <Tooltip label="Pendentes" aria-label="A tooltip">
                <Box bg={red[colorMode]}
                    display="flex"
                    alignItems='center'
                    justifyContent="center"
                    borderRadius={"30px"}
                    p={1}
                    width="35px" height="35px"
                    marginRight="5px"
                    color="#FFFFFF"
                    fontWeight="500"
                    >
                        {pending}
                 </Box>
            </Tooltip>
                   
                   
                
            <Tooltip label="Em andamento" aria-label="A tooltip">
                <Box bg={blue[colorMode]}
                    display="flex"
                    alignItems='center'
                    justifyContent="center"
                    borderRadius={"30px"}
                    p={1}
                    width="35px" height="35px"
                    marginRight="5px"
                    color="#FFFFFF"
                    fontWeight="500"
                    >
                        {answering}
                </Box>
            </Tooltip>     
            <Tooltip label="Finalizados" aria-label="A tooltip">
                <Box bg={green[colorMode]}
                    display="flex"
                    alignItems='center'
                    justifyContent="center"
                    borderRadius={"30px"}
                    p={1}
                    width="35px" height="35px"
                    marginRight="5px"
                    color="#FFFFFF"
                    fontWeight="500"
                    
                    >
                        {finished}
                </Box>
            </Tooltip>
                    
        
            
        </Flex>
       
    )


}