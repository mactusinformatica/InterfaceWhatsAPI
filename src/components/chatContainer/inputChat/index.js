
import {useState, useEffect} from 'react'
import useAuth from '../../../hooks/useAuth';
import { Box, useColorMode,Text,useDisclosure,Popover,PopoverBody,PopoverContent,PopoverTrigger} from '@chakra-ui/react'
import { AttachmentIcon} from '@chakra-ui/icons'
import { BsFillMicFill} from "react-icons/bs"
import { IoSend} from "react-icons/io5"
import {BtnSend} from './btnSend'
import {BtnAttach} from './btnAttach'

import getDateTime from '../../../services/getDateTime'



export const InputChat = ({active, socket}) => {
    const {user} = useAuth();
    const [text, setText] = useState("");
    const {colorMode} = useColorMode();
    const hoverSecondary =  { light: 'light.hoverSecondary', dark: 'dark.hoverSecondary' }
    const fontColor =  { light: 'light.fontColor', dark: 'dark.fontColor' }
    const { isOpen, onToggle } = useDisclosure()

    function sendMessage(){
        var dateTime = getDateTime()
        if(text!=""){
           
            socket.emit('chat-message',
            {
                id_author:user.id,
                content:text,
                type:"text",
                room: active.id_room,
                name_author:user?.name,
                schedule_message: dateTime.time,
                channel: active.channel,
                isSupport: true,
            }
            )

        setText('')
        }
    };

    return(
        <Box
        height="100px"
        width= "100%"
        bg={hoverSecondary[colorMode]}
        border={"0px"}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        >

        {
            active.status=="finished"?
            
            <Text fontWeight="500" color={fontColor[colorMode]}>
                ATENDIMENTO JÁ FINALIZADO
            </Text>
            :
             <>
               <BtnAttach user={user} active={active} socket={socket}/>
                <Box width="85%" pt={"5px"}>    
                <textarea
                onKeyDown={event => event.key === "Enter" && text=="" && !event.shiftKey  ? event.preventDefault():null}
                onKeyUp={event => event.key === "Enter" && !event.shiftKey ?sendMessage():null}
                value={text}
                onChange={(e)=>setText(e.target.value)}
                style={{
                    border:"none",
                    overflow: 'hidden',
                    resize: "none",
                    outline: "none",
                    borderRadius:"20px",
                    padding:"10px 20px",
                    flexGrow:"1",
                    height: "50px",
                    width:"100%",
                    boxShadow: "0px 4px 4px rgba(51, 173, 225, 0.25)",
                }}
                placeholder="Digite aqui sua mensagem"
                >
                </textarea>
                
                </Box>
                {
                text?
                <BtnSend
                mr={"10px"} event={sendMessage} icon={<IoSend  fontSize={"25px"}/>} />
                :
                // <ButtonInput event={sendMessages} icon={<BsFillMicFill  fontSize={"25px"}/>} />
                <BtnSend event={sendMessage} icon={<IoSend  fontSize={"25px"}/>} />
                }
            </>
    }

        
        </Box>
    );
}