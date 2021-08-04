import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Box, Flex,Input,Button,useColorMode, Text,InputRightElement,InputGroup,Alert } from '@chakra-ui/react'
import {ViewOffIcon , ViewIcon, WarningIcon} from '@chakra-ui/icons'
import { useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {parseCookies} from 'nookies'

const Login = ({urlHost, apiFinanceiro})=>{

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [messageSignin, setMessageSignin] = useState("");
    const {colorMode} = useColorMode();
    const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
    const bgColor = { light: 'light.background', dark: 'dark.background' }
    const red03 = { light: 'colorful.red03', dark: 'colorful.red03' }
    const red = { light: 'colorful.red', dark: 'colorful.red' }


    const {user, signin,host,setHost} = useAuth();
    setHost(urlHost)

    const submitLogin = async ()=>{
        console.log()
        setIsLoading(true);
        console.log("SUBMIT SIGNIN")
        const response = await signin({email:email,password:password, apiFinanceiro});
        
        if(response==false){
            setMessageSignin("Credenciais inválidas")
        }
        setIsLoading(false);
    }


    useEffect(() => {
        

        if(email!=""){
            setErrorEmail("");
        }else{
            setErrorEmail("* Preencha o campo de e-mail");
        }
        if(password!=""){
            setErrorPassword("");
        }else{
            setErrorPassword("* Preencha o campo senha");
        }
       
    }, [password,email])

    return(
        <Flex width={"100%"} height={"100vh"} bg={primaryColor[colorMode]}
        justifyContent={"center"} alignItems={"center"} flexDirection={"column"}> 
            
            <Text 
            style={{
                    textShadow:"0px 2px 2px rgba(0, 0, 0, 0.25)"
                
            }}
             p={1} borderBottom="2px" color={bgColor[colorMode]} fontFamily="Otomanopee One" fontSize={"4xl"}marginBottom={"15px"}>
                    MacWhatsAPI!
            </Text>
            <Box boxShadow="lg" borderRadius={'15px'} display={"flex"} width={"350px"} bg={bgColor[colorMode]} p={3}
            height={"300px"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"}>
                     <img width={"60px"} src={`${urlHost}/logo-mactus.png`}/>  
                     
                     {messageSignin?
                        <Box marginBottom={"5px"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}  borderRadius={"7px"} p={1} bg={red03[colorMode]}
                        fontSize={"14px"} width={"60%"} color={red[colorMode]}  >
                        <WarningIcon color={red[colorMode]} /> 
                        {messageSignin}
                        </Box>
                        :
                        ""
                    }
                    <Box>
                    <Text fontSize="12px" color="red">{errorEmail}</Text>
                    <Input onChange={(e)=>setEmail(e.target.value)} onKeyPress={event => event.key === "Enter"?submitLogin():null}
                    value={email} placeholder={"Email"} marginBottom={"15px"} isRequired />
                    <Text fontSize="12px" color="red"> {errorPassword}</Text>
                    <InputGroup marginBottom={"10px"} size="md">
                        <Input
                         onKeyPress={event => event.key === "Enter"?submitLogin():null}
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                        />
                        <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    </Box>
                    <Button 
                    isLoading={isLoading}
                    bg={primaryColor[colorMode]} color={bgColor[colorMode]} width={"150px"}
                    style={{
                        boxShadow:"inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.1),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.1),inset 0 0 0em 0.05em rgba(255,255,255,0.1)"
                        
                    }}
                    _hover={{
                        bg:primaryColor[colorMode]
                    }}
                    onClick={()=>submitLogin()}
                    >
                        Entrar
                        
                    </Button>
                
                <Text marginTop={"10px"} color={"#545454"} textAlign={"center"} fontSize={"xx-small"}>Copyright © 2021 
                <a target={"_blank"} href="https://mactus.online"> <u>Mactus Soluções em TI</u></a>
                <br/> Todos os direitos reservados </Text>
            </Box>
        </Flex>
    );
}


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
        urlHost: publicRuntimeConfig.NEXT_PUBLIC_HOST,
        apiFinanceiro: publicRuntimeConfig.NEXT_PUBLIC_API_FINANCEIRO  
      }
    }
  }


export default Login;