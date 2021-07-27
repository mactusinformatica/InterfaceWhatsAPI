
import useAuth from '../../../hooks/useAuth'
import { Box,useColorMode, Text,Input,Menu,MenuButton,MenuList, MenuItem, IconButton } from "@chakra-ui/react"
import { BsFillPersonFill,BsFilterRight,BsSearch} from "react-icons/bs"
import { MdSettings,MdExitToApp} from "react-icons/md"
import { Avatar } from "../../Avatar";

export const Header = (props) => {
    const {user, signout} = useAuth();
    const firstName = user?.name  
                                                                                                                              
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
                <Box display={"flex"} alignItems="center">
                    <Avatar
                    
                    icon={<BsFillPersonFill />}
                    bg={bgColor[colorMode]} 
                    color={primaryColor[colorMode]}
                    fontSize={"25px"}
                    size={"35px"}
                    />
                    <Text marginLeft='7px' color="#FFFFFF"fontSize="18px" fontWeight='500'>
                        {(firstName?.length <= 14?firstName:firstName?.substring(0,14)+"...")}
                    </Text>
                </Box>
                
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<MdSettings cursor="pointer" fontSize='25px'/>}
                        bg={'transparent'}
                        _hover={{
                            background:"transparent"
                        }}
                        _expanded={{ bg: "transparent" }}
                        _focus={{ boxShadow:"none"}}

                        
                    />
                    <MenuList  
                    p={0} minW="0"
                    w={'100px'}
                    mt={'-3'}
                    ml={'3'}
                    >
                        <MenuItem onClick={()=>signout()} icon={<MdExitToApp fontSize='16px'/>}>
                            Sair 
                        </MenuItem>
                    </MenuList>
                </Menu>

                
            </Box>
            {/* <Box  display="flex"
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
                
            </Box> */}
        </Box>
        
    );
}
