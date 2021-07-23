

import {useRouter} from 'next/router'
import { Container } from '../components/Container'
import { SideContainer } from '../components/sideContainer'
import { ChatContainer } from '../components/chatContainer'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Flex,FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import{useState,createContext,useEffect} from 'react'
import useSocket from '../hooks/useSocket'
import getDateTime from '../services/getDateTime'

const Index = ({serverChat})=>{
  //Temporário
  const router = useRouter();
  const supname = router.query.name? router.query.name:"genericName"
  const supid = router.query.id?router.query.id:"genericID"
  ///

  const [active, setActive] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const socket = useSocket()

  const makeCall = async ()=>{
    var dateTime = getDateTime()
    if(name!="" || id!=""){
    console.log(name, id)
  
    await socket.emit("joinRoom", {id_sup: supid, id_room: id, name:name, channel: "whatsapp", schedule:dateTime.time, date:dateTime.date, isSupport:false})
    }
    
  }


  return(
    <Container height="100vh">
       <DarkModeSwitch />     
       
       <Flex
      direction="row"
      alignItems="inherit"
      justifyContent="center"
      height={"100%"}>
        
          <SideContainer setactive={setActive}  width='300px' height='100%'/>
          <ChatContainer setactive={setActive} serverChat={serverChat} active={active} height='100%'/>
          {/* <div style={{
            backgroundColor:"#FFFFFF",
            // width:"300px",
            padding:"10px"
          }}>
            <label>Nome</label>
            <Input onChange={(e)=>setName(e.target.value)} value={name} mb={"10px"} placeholder="Digite um nome para o chamado" isRequired/>
            <label>Número</label>
            <Input onChange={(e)=>setId(e.target.value)} value={id} mb={"10px"} placeholder="Digite um número para o chamado" isRequired />

            <button onClick={(e)=>makeCall()}>
              Enviar
            </button>
          
          </div> */}
       
      </Flex>
          
    </Container>
  )
  
}

export async function getServerSideProps() {
  return {
    props: {
        serverChat: process.env.NEXT_PUBLIC_SERVER_CHAT, 
    }, 
  }
}




export default Index;





