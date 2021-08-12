import { Box,Text, Flex, useColorMode} from '@chakra-ui/react'
import {DownloadIcon} from '@chakra-ui/icons'
import {RiFileTextFill} from 'react-icons/ri'
import Image from 'next/image'
export const Content = ({message,color, fontWeight}) => {
    const {colorMode} = useColorMode();
    const primaryColor = { light: 'light.primary', dark: 'light.primary' }
    return (
        <>
            {message.type == "text"?
                <Text fontWeight={fontWeight} color={color} >
                    {message.content}
                </Text> 
            :
            message.type == "image"?
                <img src={message.content} style={{maxWidth:"400px", minWidth:"200px"}}  />
                
            :message.type == "file"?
                <Box fontWeight={"200"} width={'100px'} display="flex" justifyContent="space-evenly" color={color} >
                    <a  href={message.content}
                    style={{
                            display:"flex",
                            alignItems:"center"
                           }}
                    download>
                        <RiFileTextFill style={{marginRight:"10px"}}/>
                        Arquivo 
                        <DownloadIcon  style={{marginLeft:"10px"}}/>
                    </a>
                </Box> 
            :
                <Text fontWeight={"400"}  color={color} >
                <i>MENSAGEM INVÁLIDA({message.type})</i>
                </Text> 
            }
        </>
    )

}