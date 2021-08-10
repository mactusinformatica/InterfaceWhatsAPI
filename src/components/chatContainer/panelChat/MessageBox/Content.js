import { Box,Text, Flex, useColorMode} from '@chakra-ui/react'
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
                
            :
                <Text fontWeight={"400"}  color={color} >
                   <i>MENSAGEM INVÁLIDA({message.type})</i>
                </Text> 
            }
        </>
    )

}