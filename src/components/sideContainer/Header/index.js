import { Box,useColorMode, Text,Input } from "@chakra-ui/react"
import { BsFillPersonFill,BsFilterRight,BsSearch} from "react-icons/bs"
import { MdSettings} from "react-icons/md"
import { Avatar } from "../../Avatar";

export const Header = (props) => {
    const name = props.supname;          
    const firstName = name.split(" ")[0]  
                                                                                                                              
    const {colorMode} = useColorMode();
    const primaryColor ={ light: 'light.primary', dark: 'dark.primary' }
    const bgColor =  { light: 'light.background', dark: 'dark.background' }
 
    return(
        <Box
        w="100%"
        p={4}
        bg={primaryColor[colorMode]}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={"10px"}>
              
                <Avatar
               
                icon={<BsFillPersonFill />}
                bg={bgColor[colorMode]} 
                color={primaryColor[colorMode]}
                fontSize={"25px"}
                size={"35px"}
                />
                    <Text marginLeft='7px' color="#FFFFFF"fontSize="16px" fontWeight='500'>
                        {(firstName.length <= 14?firstName:firstName.substring(0,14)+"...").toUpperCase()}
                    </Text>
                <MdSettings cursor="pointer" onClick={(event)=>console.log("CLICK")} fontSize='25px'/>
            </Box>
            <Box  display="flex"
                  alignItems="center"
                  justifyContent="center">
                <Input variant="flushed" 
                height="25px"
                fontSize='14px'
                color={"#FFFFFF"} 
                placeholder={"Procure pela conversa"}
                _placeholder={{ color: 'rgba(255, 255, 255, 0.70)' }}
                borderColor="rgba(255, 255, 255, 0.70)"
                focusBorderColor="rgba(255, 255, 255, 0.80)"
                /> 
                
                <BsFilterRight fontSize='28px'/>
                
            </Box>
        </Box>
        
    );
}
