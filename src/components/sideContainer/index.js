import { useState, useEffect, useLayoutEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import { Flex, useColorMode,Box } from '@chakra-ui/react'
import {Header} from './Header'
import  {Calls}from './Calls'
import getDateTime from '../../services/getDateTime'

export const SideContainer = (props) => {

  const {socket,socketEvent, setConnectError} = useSocket();
  const {colorMode} = useColorMode();
  const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
  const color = { light: 'light.fontColor', dark: 'dark.fontColor' }
  const [calls, setCalls] = useState([]);
  const dateTime = getDateTime()

  useEffect(
    ()=>{
      if(socket){
        socket.emit("reqCallList")
      }
    },[socket]);
  
  

  socketEvent('resCallList', calls => {

    if(calls!=null){

      setCalls(calls.reverse());

    }
  })
  
  socketEvent('newCall', call => {
    if(call!=null){

      setCalls([call,...calls]);

    }
  })

  socketEvent("updateCallStatus",({id_room,supportName,schedule, status}) => {
      var auxCalls = []
      if(calls){
        calls.map(
          (c)=>{
            if(c.id_room == id_room && c.schedule == schedule ){
              auxCalls.push(
                {
                  channel: c.channel,
                  date: c.date,
                  id_room: c.id_room,
                  name: c.name,
                  schedule:c.schedule,
                  status: status,
                  supportName: supportName
                })
            }else{
              auxCalls.push(c)
            }
          }
        )
        setCalls(auxCalls)
      }
    })

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      bg={'transparent'}
      color={color[colorMode]}
      borderLeft="1px" borderColor={`${primaryColor[colorMode]}`}


      {...props}>

        <Header/>

        <Box id="scroll">
            {/* <MyContacts title={"MEUS ATENDIMENTOS"} key="1" setactive={props.setactive}/> */}
            <Calls urlHost={props.urlHost} title={"GERAL"} calls={calls} key="1"/>
        </Box>


    </Flex>
  )
}