
import {ChatProvider} from '../context/ChatContext'
import { ChatClientContainer } from '../components/clientChatContainer'
import useAuth from '../hooks/useAuth'
import useSocket from '../hooks/useSocket'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box,Spinner } from '@chakra-ui/react'
import {RepeatIcon} from '@chakra-ui/icons'
import getDateTime from '../services/getDateTime'
import {parseCookies} from 'nookies'

const ChatClient = ({urlHost})=>{

    const {setUser ,loading, setLoading} = useAuth();
    const {socket, connectSocket, connectError, setConnectError,socketEvent} = useSocket();
    const router =  useRouter();
    const dateTime = getDateTime()
    let serverName
    let userName
    if(router.query.server && router.query.name){
       serverName = router.query?.server
       userName = router.query?.name.split(' ')[0]
    }

    const active = {
      name: userName,
      id_room: `${userName}_${serverName}`,
      status: 'pending',
      channel:'client',
      schedule: dateTime.time
    }
    useEffect(
      ()=>{ 
        if(serverName && userName){
          console.log("setUserCLIENT")
            setUser({
              id: active.id_room,
              name: userName,
              //server_whatsapi:`http://localhost:5000`
              server_whatsapi: `https://server-${serverName}.mactus.online`
            })
          if(!socket){
          connectSocket(`https://server-${serverName}.mactus.online`)
         // connectSocket(`http://localhost:5000`)
          }else{
            socket.on('connect', () => {
              setLoading(false);
            }) 
          }
        }else{
          setConnectError(true)
        }
    },[socket]);

    socketEvent('connect_error', err => setConnectError(true));
    socketEvent('connect_failed', err => setConnectError(true));
    socketEvent('disconnect', err => setConnectError(true));

    return(
        <ChatProvider>
            {
              connectError?
                <Box display="flex" flexDirection="column" width="100%" height="100vh" justifyContent="center" alignItems="center">
                    FALHA DE CONEXÃO AO SERVIDOR
                    <Box onClick={(e)=>location.reload()} width="max-content" p={2} border="1px" borderRadius="15px" bg="transparent" _hover={{ bg:`rgb(55, 182, 237,0.25)` }} >
                      <RepeatIcon fontSize="22px"/>
                    </Box>
                </Box>
              :
                loading?
                  <Box display="flex" flexDirection="column" width="100%" height="100vh" justifyContent="center" alignItems="center">
                    <h1>CARREGANDO</h1>
                    <Spinner />
                  </Box>
                
                : 
                <ChatClientContainer active={active} urlHost={urlHost}/>
            }
            
        </ChatProvider>
        
    )
}
export default ChatClient;

export const getServerSideProps = async(ctx)=>{
  const { 'macwhatsapi-auth': token } = parseCookies(ctx)
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
      urlHost: process.env.NEXT_PUBLIC_HOST,
    }
  }
}
