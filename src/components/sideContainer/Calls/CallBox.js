import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Box, useColorMode,Text } from '@chakra-ui/react'
import {Avatar} from '../../Avatar'
import { BsFillPersonFill} from "react-icons/bs"
import { FaWhatsapp, FaHeadset,FaPhone} from "react-icons/fa"
import useChat from '../../../hooks/useChat'
import useAuth from '../../../hooks/useAuth'


export const  CallBox = ({contact}) => {

    const {setActive} = useChat();
    const {host} = useAuth();

    const {colorMode} = useColorMode();
    const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
    const bgColor = { light: 'light.background', dark: 'dark.background' }
    const secondaryColor = { light: 'light.secondary', dark: 'dark.secondary' }
    const fontColor = {light: 'light.fontColor', dark: 'dark.fontColor'}
    const red= {light: 'colorful.red', dark: 'colorful.red'}
    const blue = {light: 'colorful.blue', dark: 'colorful.blue'}
    const green03 = {light: 'colorful.green03', dark: 'colorful.green03'}
    const red03={light: 'colorful.red03', dark: 'colorful.red03'}
    const blue03 = {light: 'colorful.blue03', dark: 'colorful.blue03'}
    const red06 = {light: 'colorful.red06', dark: 'colorful.red06'}
    const blue06 = {light: 'colorful.blue06', dark: 'colorful.blue06'}
    const green06 = {light: 'colorful.green06', dark: 'colorful.green06'}

    
    const hoverSecondary = {light: 'light.hoverSecondary', dark: 'dark.hoverSecondary'}


    return(
        <Box
        onClick={(e)=>setActive(contact)}
        color={fontColor[colorMode]} 
        height="max-content"
        bg={
         contact.status=="pending"?
         red03[colorMode]
         :contact.status=="answering"?
         blue03[colorMode]
         :
         green03[colorMode]
        }
        p={2}
        border="1px"
        borderColor={
         contact.status=="pending"?
         red03[colorMode]
         :
         blue03[colorMode]
        }
        marginTop="5px"
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        _hover={{
            background: contact.status=="pending"?
            red06[colorMode]
            :contact.status=="answering"?
            blue06[colorMode]
            :
            green06[colorMode]
        } 
        }
        >
            <Box display="flex"
            alignItems="center"
            >
            <Box>
            <Avatar 
               icon={<BsFillPersonFill />}
               bg={
                contact.status=="pending"?
                red[colorMode]
                :contact.status=="answering"?
                blue06[colorMode]
                :
                green06[colorMode]
               }
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
                <Box display="flex" alignItems="center" fontSize="14px" fontWeight={"400"} color={fontColor[colorMode]}>
                
                {contact.id_room?<FaPhone fontSize="12px"/>:""}
                {contact.id_room?`: ${contact.id_room}`:""}
              
                </Box> 
                <Box display="flex" alignItems="center" fontSize="14px" fontWeight={"400"} color={fontColor[colorMode]}>
                
                {contact.supportName?<FaHeadset fontSize="16px"/>:""}
                {contact.supportName?`: ${contact.supportName}`:""}
              
                </Box> 
               
            </Box>
            </Box>
            <Box>
           
            {contact.channel=="whatsapp"?
            <FaWhatsapp fontSize="30px" color="#128C7E"/>
            :
            <img width={"30px"} src={`${host}/sri.png`}/>
            }
             <Text fontWeight="bold" fontSize="12px">
             {contact.schedule}
             </Text>
             
            </Box>
        </Box>
    );
}