import { useEffect } from "react"
import { HeaderChat } from "./HeaderChat"
import { InputChat } from "../chatContainer/inputChat"
import { PanelChat } from "../chatContainer/panelChat"
import { Flex } from "@chakra-ui/react"
import getDateTime from '../../services/getDateTime'
import useSocket from '../../hooks/useSocket'
import {useRouter} from 'next/router'
import { useState } from "react"

export const ChatClientContainer = ({urlHost, active}) => {

     const {socket,socketEvent} = useSocket();
 
     const [messages,setMessages] = useState([]);

     

     useEffect(
          ()=>{
          if(active){
               joinRoom({
                    id_room:active.id_room,
                    name: active.name,
                    status:active.status,
                    channel: active.channel,
                    schedule: active.schedule,
                    isSupport: false
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
          var dateTime = getDateTime()
          await socket.emit("joinRoom",
           {id_room: id_room, name:name,status:status, channel: channel,
            schedule:schedule, date:dateTime.date, schedule_current:dateTime.time, isSupport:isSupport})
      }
      
      async function exitRoom({id_room, schedule_room}){
          var dateTime = getDateTime()
          await socket.emit("exitRoom", {name_sup:supname,id_sup:supid, id_room:id_room,status: active.status,
          schedule_room:dateTime.time, schedule:dateTime.time, channel:active.channel})
      }
  
      async function endCall({id_room, schedule_room}){
          var dateTime = getDateTime()
          await socket.emit("endCall", {name_sup:supname,id_sup:supid, id_room:id_room, 
                            schedule_room:schedule_room, schedule_current:dateTime.time,  date:dateTime.date, channel:active.channel}
          )
      }



    return(
        <Flex 
        height={"100vh"}
        width= "100%"
        bgPosition="center"
        bg={'#FFFFFF'}
        boxShadow="2xl"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between">
              <HeaderChat/>
              <PanelChat urlHost={urlHost} messages={messages} /> 
              <InputChat active={active} socket={socket} /> 
        </Flex>
       
    )

}