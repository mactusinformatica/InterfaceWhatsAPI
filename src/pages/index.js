import {parseCookies} from 'nookies'
import {ChatProvider} from '../context/ChatContext'
import { Container } from '../components/Container'
import { SideContainer } from '../components/sideContainer'
import { ChatContainer } from '../components/chatContainer'
import { Flex} from '@chakra-ui/react'
import{useState,useEffect} from 'react'
import useSocket from '../hooks/useSocket'
import useAuth from '../hooks/useAuth';

import getDateTime from '../services/getDateTime'


const Index = ({urlHost, apiFinanceiro})=>{
  
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
  
    await socket.emit("joinRoom", {id_room: "456", name:"name2", channel: "whatsapp", schedule:dateTime.time, date:dateTime.date, isSupport:false})
  
  }

  return(
    <Container height="100vh">
        
       
       <Flex
      direction="row"
      alignItems="inherit"
      justifyContent="center"
      height={"100%"}>
        <ChatProvider>
          {
          socket?
            <>
              <SideContainer urlHost = {urlHost}  width='300px' height='100%'/>
              <ChatContainer urlHost = {urlHost} height='100%'/>
            </>
          :
            ''
          }
        </ChatProvider>
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
    props: {
      urlHost: process.env.NEXT_PUBLIC_HOST,
      apiFinanceiro: process.env.NEXT_PUBLIC_API_FINANCEIRO  
    }
  }
}



