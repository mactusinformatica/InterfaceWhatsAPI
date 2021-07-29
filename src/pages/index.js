import {parseCookies} from 'nookies'
import { Container } from '../components/Container'
import { SideContainer } from '../components/sideContainer'
import { ChatContainer } from '../components/chatContainer'
import { Flex,FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import {SocketProvider} from '../context/SocketContext'
import{useState,createContext,useEffect} from 'react'



const Index = ({serverChat})=>{
  
  const [active, setActive] = useState();
  
  return(
    <Container height="100vh">
        
       
       <Flex
      direction="row"
      alignItems="inherit"
      justifyContent="center"
      height={"100%"}>
          <SocketProvider>
            <SideContainer setactive={setActive}  width='300px' height='100%'/>
            {/* <ChatContainer setactive={setActive} serverChat={serverChat} active={active} height='100%'/> */}
          </SocketProvider>
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



