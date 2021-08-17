import {useState} from 'react'
import {uploadFile} from '../../../services/uploadFile'
import getDateTime from '../../../services/getDateTime'
import { Box, Input,Tooltip,Popover,PopoverBody,PopoverContent,PopoverTrigger, useToast, useColorMode} from '@chakra-ui/react'
import {BtnSend} from './btnSend'
import { AttachmentIcon} from '@chakra-ui/icons'
import { IoImage,IoDocumentText} from "react-icons/io5"
import { RiCreativeCommonsZeroLine } from 'react-icons/ri'

export const BtnAttach = ({user,active,socket})=>{
    const [image, setImage] = useState();
    const toast = useToast()

    const {colorMode} = useColorMode();
    const background = { light: 'light.background', dark: 'dark.background' }
    const fontColor = { light: 'light.fontColor', dark: 'dark.fontColor' }

    // toast({
    //     title: `Arquivo muito grande, o tamanho limite é de 5MB`,
    //     status: 'error',
    //     position: 'top',
    //     isClosable: true,
    //   })

     async function sendFile(e, type){
        var dateTime = getDateTime()
        if(e.target.files[0]){
            if(e.target.files[0].size >= 16000000){
                toast({
                    title: `Arquivo muito grande, o tamanho limite é de 16MB`,
                    status: 'error',
                    position: 'top',
                    isClosable: true,
                })
            }else{

                const response = await uploadFile(e.target.files[0], {
                   urlServer: user.server_whatsapi,
                   fileName: `${user.id}_${active.id_room}.${e.target.files[0].name.split('.').pop()}`
                })
        
                if(response!=false){
                    toast({
                        title: `Upload bem sucedido`,
                        status:'success',
                        position: 'top',
                        isClosable: true,
                    })
                    socket.emit('chat-message',
                        {
                            id_author:user.id,
                            content:response.url,
                            type:type,
                            room: active.id_room,
                            name_author:user?.name,
                            schedule_message: dateTime.time,
                            channel: active.channel,
                            isSupport: true,
                            mimetype: response.mimetype
                        },e.target.value=""
                    )
                }else{
                    toast({
                        title: `Falha ao fazer upload do arquivo`,
                        status: 'error',
                        position: 'top',
                        isClosable: true,
                    })
                }
            }
        }
        
    };

    return(
        <Popover>
            <PopoverContent 
            _focus={{ boxShadow:"none" }}
            width="max-content" bg="transparent" border="none" >

                <PopoverBody >
                    <Input value={image} onChange={(e)=>sendFile(e,"image")} id="inputImage" display="none" type="file"  accept="image/*"/>
                    <Input id="inputFile" onChange={(e)=>sendFile(e,"file")}    display="none" type="file"/>

                    <Tooltip label="Imagem" aria-label="Enviar imagem">
                        <label for="inputImage">
                            <BtnSend   icon={<IoImage  fontSize={"25px"}/>} />
                        </label>
                    </Tooltip>
                    
                    <Tooltip label="Arquivo" aria-label="Enviar arquivo">
                        <label for="inputFile">
                            <BtnSend  icon={<IoDocumentText  fontSize={"25px"}/>} />
                        </label>
                    </Tooltip>
                </PopoverBody>
            </PopoverContent>
            <PopoverTrigger>
                <Box
                tabIndex={0}
                cursor={"pointer"} bg={"#FFFFFF"} 
                    marginBottom={"10px"} 
                    borderRadius="30px" 
                    p={2}
                    bg={background[colorMode]}
                    color={fontColor[colorMode]}
                    style={{
                        boxShadow: "0px 4px 4px rgb(22, 75, 97,0.5)"
                    }}
                    _hover={
                        {
                        opacity: "0.7"
                        }
                    }>
                        <AttachmentIcon  fontSize={"25px"}/>
                    </Box>

            </PopoverTrigger>

        </Popover>

    )
  
}