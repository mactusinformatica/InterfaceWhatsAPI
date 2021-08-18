import useSocket from '../../hooks/useSocket'
import useChat from '../../hooks/useChat'
import {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth';

import { Box,useToast} from '@chakra-ui/react'
import {HeaderChat} from './HeaderChat'
import {InputChat} from './inputChat'
import {PanelChat} from './panelChat'
import {InitialChat} from './InitialChat'
import io from "socket.io-client"
import {useRouter} from 'next/router'
import getDateTime from '../../services/getDateTime'

export const ChatContainer = ({urlHost}) => {
    
    const {user} = useAuth();
    const supname = user?.name
    const supid = user?.id

    const {socket,socketEvent} = useSocket();
    const {active,setActive} = useChat();
    
  

    const [messages,setMessages] = useState([]);

    const dateTime = getDateTime()
    const toast = useToast()

    useEffect(
        ()=>{
            if(active){
                joinRoom({
                    id_room:active.id_room,
                    name:supname,
                    status:active.status,
                    channel: active.channel,
                    schedule: active.schedule,
                    isSupport: true
                })
            
            }
        },[active]
    )

    socketEvent("message",(message) => {
        
        if(message.room == active?.id_room ){
            setMessages([...messages, message])
        }
    })

    socketEvent("previousMessages",(previousMessages) => {
            
        setMessages(previousMessages)
    })

    socketEvent("endThisCall",() => {
        if(active!=""){
            active.status = "finished"
        }
    })

    
    
    async function joinRoom({id_room,name,status,channel,isSupport, schedule}){
        
        
        await socket.emit("joinRoom", {id_sup: supid, id_room: id_room, name:name,status:status, channel: channel, schedule:schedule, date:dateTime.date, schedule_current:dateTime.time, isSupport:isSupport})
        
    }
    
    async function exitRoom({id_room, schedule_room}){
        await socket.emit("exitRoom", {name_sup:supname,id_sup:supid, id_room:id_room,status: active.status,
        schedule_room:schedule_room, schedule:dateTime.time, channel:active.channel}, setActive(''))
        
    }

    async function endCall({id_room, schedule_room}){
        await socket.emit("endCall", {name_sup:supname,id_sup:supid, id_room:id_room, 
                          schedule_room:schedule_room, schedule_current:dateTime.time,  date:dateTime.date, channel:active.channel}
        ,setActive(''))
    }

    return(
        <Box
        height= "100%"
        width= "900px"
        bgPosition="center"
        boxShadow="2xl"
        borderTop={"1px"}
        borderRight={"1px"}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        >
        {active?
        <>

         <HeaderChat active={active} endCall={endCall} exitRoom={exitRoom}/>
         <PanelChat urlHost={urlHost} messages={messages}/>
         <InputChat active={active} socket={socket}/>
        </>
        :
        <InitialChat urlHost={urlHost} />}
     
        </Box>
    );
}


