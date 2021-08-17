import {parseCookies} from 'nookies'
import {ChatProvider} from '../context/ChatContext'
import { Container } from '../components/Container'
import { SideContainer } from '../components/sideContainer'
import { ChatContainer } from '../components/chatContainer'
import { Flex, Spinner , Box, useColorMode} from '@chakra-ui/react'
import {RepeatIcon} from '@chakra-ui/icons'
import{useState,useEffect,useLayoutEffect} from 'react'
import useSocket from '../hooks/useSocket'
import useAuth from '../hooks/useAuth';

import getDateTime from '../services/getDateTime'


const Index = ({urlHost})=>{

  const {user, loading, setLoading} = useAuth();
  const {socket, connectSocket, connectError, setConnectError,socketEvent} = useSocket();
  const {colorMode} = useColorMode();
  const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
  useEffect(
    ()=>{
      if(user){
        if(!socket){
          connectSocket(user.server_whatsapi)
        }else{
          socket.on('connect', () => {
            setLoading(false);
          }) 
        }
      }
  },[socket,user]);

  socketEvent('connect_error', err => setConnectError(true));
  socketEvent('connect_failed', err => setConnectError(true));

  const makeCall = async ()=>{
    // var dateTime = getDateTime()
  
    // await socket.emit("joinRoom", {id_room: "554499378974", name:"CaioFake", channel: "whatsapp", schedule:dateTime.time, date:dateTime.date, isSupport:false})
  
  }

  
  function sendMessage(){
    var dateTime = getDateTime()  
    socket.emit('chat-message',
    {
        id_author:"4",
        content:"#TEST#",
        type:"text",
        room:"123",
        name_author:"tester",
        schedule_message: dateTime.time,
        channel: "whatsapp",
        isSupport: false,
    }
    )
};

  return(
    <Container height="100vh">
        
       
       <Flex
      direction="row"
      alignItems="inherit"
      justifyContent="center"
      height={"100%"}>
        <ChatProvider>
          {
            connectError?
              <Box display="flex" flexDirection="column" width="100%" height="100%" justifyContent="center" alignItems="center">
                  FALHA DE CONEXÃO AO SERVIDOR
                  <Box onClick={(e)=>location.reload()} width="max-content" p={2} border="1px" borderRadius="15px" bg="transparent" _hover={{ bg:`rgb(55, 182, 237,0.25)` }} >
                    <RepeatIcon fontSize="22px"/>
                  </Box>
              </Box>
            :
              loading?
                <Box display="flex" flexDirection="column" width="100%" height="100%" justifyContent="center" alignItems="center">
                  <h1>CARREGANDO</h1>
                  <Spinner />
                </Box>
              
              : 
                <>
                  <SideContainer urlHost = {urlHost}  width='300px' height='100%'/>
                  <ChatContainer urlHost = {urlHost} height='100%'/>
                </>
          }
        </ChatProvider>
        {/* <Box>
          <button onClick={(e)=>makeCall()}>
                Atendimento
          </button>
          <button onClick={(e)=>sendMessage()}>
                Mensagem
          </button>
        </Box>
         */}
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



