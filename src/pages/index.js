import {parseCookies} from 'nookies'
import { Container } from '../components/Container'
import { SideContainer } from '../components/sideContainer'
import { ChatContainer } from '../components/chatContainer'
import { Flex} from '@chakra-ui/react'
import{useState,useEffect} from 'react'
import useSocket from '../hooks/useSocket'
import useAuth from '../hooks/useAuth';

import getDateTime from '../services/getDateTime'


const Index = ({serverChat})=>{
  
  const [active, setActive] = useState();
  const {user} = useAuth();
  const {socket, connectSocket} = useSocket();

  useEffect(
    ()=>{
      if(user){
        if(!socket){
          connectSocket(user.server_whatsapi)
      }
      }

  },[socket, user]);

  const makeCall = async ()=>{
    var dateTime = getDateTime()
  
    await socket.emit("joinRoom", {id_room: "121241", name:"name", channel: "whatsapp", schedule:dateTime.time, date:dateTime.date, isSupport:false})
  
  }

  return(
    <Container height="100vh">
        
       
       <Flex
      direction="row"
      alignItems="inherit"
      justifyContent="center"
      height={"100%"}>
          
        <SideContainer setactive={setActive}  width='300px' height='100%'/>
        <ChatContainer setactive={setActive} serverChat={serverChat} active={active} height='100%'/>
      
        <button onClick={(e)=>makeCall()}>
              Enviar
        </button>

      </Flex>
          
    </Container>
  )
  
}

export default Index;

export const getServerSideProps = async(ctx)=>{

  const { 'macwhatsapi-auth': token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}



