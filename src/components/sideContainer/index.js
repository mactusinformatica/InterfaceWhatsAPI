import { useState, useEffect, useLayoutEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import { Flex, useColorMode,Box } from '@chakra-ui/react'
import {Header} from './Header'
import {MyContacts} from './MyContacts'
import  {Calls}from './Calls'
import getDateTime from '../../services/getDateTime'
import {useRouter} from 'next/router'

export const SideContainer = (props) => {

  
  const {colorMode} = useColorMode();
  const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
  const color = { light: 'light.fontColor', dark: 'dark.fontColor' }
  const [calls, setCalls] = useState([]);
  const dateTime = getDateTime()

  const socket = useSocket('callList', calls => {
    if(calls!=null){

      setCalls(calls.reverse());
      
    }
  })

  useSocket('newCall', call => {
    if(call!=null){

      setCalls([call,...calls]);
      
    }
  })
  
    useSocket("updateCallStatus",({id_room,supportName,schedule, status}) => {
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
      //Temporário
      const router = useRouter();
      const supname = router.query.name? router.query.name:"genericName"
      const supid = router.query.id?router.query.id:"genericID"
      ///
    async function joinRoom({id_room,name,channel,isSupport, schedule}){
        
    
      await socket.emit("joinRoom", {id_sup: supid, id_room: id_room, name:name, channel: channel, schedule:schedule, date:dateTime.date, isSupport:isSupport})
      

  }
  
   
  
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      bg={'transparent'}
      color={color[colorMode]}
      boxShadow="xl"
      borderRight="0px" borderColor={`${primaryColor[colorMode]}`}

      {...props}>
        
        <Header supname={supname}  />
        
        <Box id="scroll">
            {/* <MyContacts title={"MEUS ATENDIMENTOS"} key="1" setactive={props.setactive}/> */}
            <Calls title={"GERAL"} calls={calls} key="1" setactive={props.setactive}/>
        </Box>
       
        
    </Flex>
  )
}