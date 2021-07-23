import useSocket from '../../hooks/useSocket'
import {useState, useEffect} from 'react'
import { Box} from '@chakra-ui/react'
import {HeaderChat} from './HeaderChat'
import {InputChat} from './inputChat'
import {PanelChat} from './panelChat'
import {InitialChat} from './InitialChat'
import io from "socket.io-client"
import {useRouter} from 'next/router'
import getDateTime from '../../services/getDateTime'

export const ChatContainer = ({active, setactive}) => {
    
    //Temporário
    const router = useRouter();
    const supname = router.query.name? router.query.name:"genericName"
    const supid = router.query.id?router.query.id:"genericID"
    ///

    const [messages,setMessages] = useState([
    ]);

    const dateTime = getDateTime()
   
    useEffect(
        ()=>{
            if(active){
                joinRoom({
                    id_room:active.id_room,
                    name:supname,
                    channel: active.channel,
                    schedule: active.schedule,
                    isSupport: true
            }
            
            )
            console.log(socket)
            }
            return  () => {
                socket.off()
            }
        },[active]
    )
    const socket = useSocket()
    useSocket("message",(message) => {
        console.log(message)
        setMessages([...messages, message])
    })

    useSocket("previousMessages",(previousMessages) => {
            
        setMessages(previousMessages)
    })

    async function joinRoom({id_room,name,channel,isSupport, schedule}){
        
        
        await socket.emit("joinRoom", {id_sup: supid, id_room: id_room, name:name, channel: channel, schedule:schedule, date:dateTime.date, schedule_current:dateTime.time, isSupport:isSupport})
        
    }
    
    async function exitRoom({id_room, schedule_room}){
        await socket.emit("exitRoom", {name_sup:supname,id_sup:supid, id_room:id_room,
                         schedule_room:schedule_room, schedule:dateTime.time, channel:active.channel}, setactive(''))
        
    }

    async function endCall({id_room, schedule_room}){
        await socket.emit("endCall", {name_sup:supname,id_sup:supid, id_room:id_room, 
                          schedule_room:schedule_room, schedule_current:dateTime.time,  date:dateTime.date, channel:active.channel}
        ,setactive(''))
        
    }

    return(
        <Box
        height= "100%"
        width= "600px"
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
         <PanelChat supId={supid} messages={messages}/>
         <InputChat active={active} supName={supname} supId={supid} socket={socket}/>
        </>
        :
        <InitialChat/>}
     
        </Box>
    );
}


