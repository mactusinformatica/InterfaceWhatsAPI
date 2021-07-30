
import { Box, Text,useColorMode, Flex, Stack, Button,useDisclosure } from '@chakra-ui/react'
import { CloseIcon,MdCall} from '@chakra-ui/icons'
import { BsFillPersonFill,BsThreeDotsVertical} from "react-icons/bs"
import { IoMdCloseCircle, IoMdPower } from "react-icons/io"
import {Avatar} from '../Avatar'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from "@chakra-ui/react"
import getDateTime from '../../services/getDateTime'

export const HeaderChat = ({active, exitRoom, endCall}) => {

    
    const {colorMode} = useColorMode();
    const bgColor =  { light: 'light.background', dark: 'dark.background' }
    const primaryColor =  { light: 'light.primary', dark: 'dark.primary' }
    const red =  { light: 'colorful.red', dark: 'colorful.red' }
    const blue =  { light: 'colorful.blue', dark: 'colorful.blue' }
    const fontColor =  { light: 'light.fontColor', dark: 'dark.fontColor' }
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'dark.hoverSecondary' }
    const { isOpen, onOpen, onClose } = useDisclosure()
    

    return(
        <Box 
        width={"100%"}
        height={"max-content"}
        p={3}
        bg={hoverSecondary[colorMode]}
        boxShadow="md"
        display="flex"
        justifyContent="space-between"
        alignItems="start">
            <Flex>
                {/* <Box>
                <Avatar  bg={primaryColor[colorMode]} 
                        color={bgColor[colorMode]}
                        fontSize={"25px"}
                        size={"40px"}
                        icon={<BsFillPersonFill />}
                        width=""
                        />
                </Box> */}
                
                <Box display="flex"
                   
                    alignItems="center" >
                    <Text wordBreak="break-word" fontSize={"20px"} color={fontColor[colorMode]} fontWeight={"600"} marginLeft="10px">
                    {active.name}</Text>
                </Box>
            </Flex>

            <Flex alignItems="center" >
                <Stack spacing={4} direction="row" align="center">
                    <Button 
                     size="sm"
                     pl={"5px"}
                     pr={"5px"}
                     rightIcon={<IoMdPower fontSize="20px" style={{marginBottom:"2px" }} />} 
                     bg={red[colorMode]}
                     color={"#FFFFFF"}
                     variant="solid" 
                     fontSize="15px"
                     onClick={onOpen}
                     >
                         FINALIZAR
                    </Button>
                    <Modal  isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent p={4} width='max-content'>
                            <ModalBody>
                                <Text fontSize={"24px"}>
                                    Tem certeza que deseja finalizar o atendimento?
                                </Text>
                            </ModalBody>
                            <ModalFooter mr={20}>
                                <Button colorScheme="blue" mr={2} onClick={onClose}>
                                CANCELAR
                                </Button>
                                <Button  colorScheme="red" 
                                onClick={e=>endCall({ id_room:active.id_room, schedule_room: active.schedule})}>
                                    FINALIZAR
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <Button 
                     size="sm"
                     pl={"5px"}
                     pr={"5px"}
                     rightIcon={<IoMdCloseCircle fontSize="20px" style={{marginBottom:"2px" }} />} 
                     bg={blue[colorMode]}
                     variant="solid" 
                     fontSize="15px"
                     onClick={e=>exitRoom({ id_room:active.id_room, schedule_room: active.schedule})}
                     color={"#FFFFFF"}
                     >
                         SAIR
                    </Button>
                  
                </Stack>

                
            </Flex>
            


            
            
           
        </Box>
    );
}