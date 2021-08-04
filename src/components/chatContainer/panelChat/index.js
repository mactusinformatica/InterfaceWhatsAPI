import useAuth from '../../../hooks/useAuth';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { useEffect, useRef } from 'react';
import { Box,Text} from '@chakra-ui/react'
import { MessageBox } from './MessageBox';


export const PanelChat = ({messages}) => {
    
    const {host} = useAuth();
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);



   
    return(
        <Box
        id="scroll"
        height="container.lg"
        width= "100%"
        bgImage={`${host}/bgT.png`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        overflowY="scroll"
        
        >
        {
        messages.map((m)=>
                <MessageBox message={m}/>
            )
        
        }
        <div ref={messagesEndRef} />
        </Box>
    )
}