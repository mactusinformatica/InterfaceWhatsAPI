
import useAuth from '../../../hooks/useAuth'
import { Box,useColorMode, Text,Input,Menu,MenuButton,MenuList, MenuItem, IconButton } from "@chakra-ui/react"
import { BsFillPersonFill,BsFilterRight,BsSearch} from "react-icons/bs"
import { MdSettings,MdExitToApp} from "react-icons/md"
import { Avatar } from "../../Avatar";
import { DarkModeSwitch } from '../../DarkModeSwitch'
export const Header = (props) => {
    const {user, signout} = useAuth();
    const firstName = user?.name  
                                                                                                                              
    const {colorMode} = useColorMode();
    const primaryColor ={ light: 'dark.primary', dark: 'light.primary' }
    
    const bgColor =  { light: 'light.background', dark: 'dark.background' }
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'dark.hoverSecondary' }

    return(
        <Box
        w="100%"
        pt={4} pl={4} pr={4}
        bg={hoverSecondary[colorMode]}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={"10px"}>
                <Box display={"flex"} alignItems="center">
                    <Avatar
                    
                    icon={<BsFillPersonFill />}
                    bg={primaryColor[colorMode]} 
                    color={"#ffffff"}
                    fontSize={"25px"}
                    size={"35px"}
                    />
                    <Text marginLeft='7px'fontSize="18px" fontWeight='400'>
                        {(firstName?.length <= 14?firstName:firstName?.substring(0,14)+"...")}
                    </Text>
                </Box>
                
                <Menu closeOnSelect={false}>
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
                    w={'150px'}
                    mt={'-3'}
                    ml={'3'}
                    >
                       
                        {/* <MenuItem>
                            <DarkModeSwitch />  DarkMode
                        </MenuItem>  */}
                        <MenuItem fontSize={'16px'} onClick={()=>signout()} icon={<MdExitToApp fontSize='20px'/>}>
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
