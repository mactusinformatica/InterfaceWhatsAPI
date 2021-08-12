import {useState} from 'react'
import {uploadFile} from '../../../services/uploadFile'
import getDateTime from '../../../services/getDateTime'
import { Box, Input,Tooltip,Popover,PopoverBody,PopoverContent,PopoverTrigger, useToast} from '@chakra-ui/react'
import {BtnSend} from './btnSend'
import { AttachmentIcon} from '@chakra-ui/icons'
import { IoImage,IoDocumentText} from "react-icons/io5"
import { RiCreativeCommonsZeroLine } from 'react-icons/ri'

export const BtnAttach = ({user,active,socket})=>{
    const [image, setImage] = useState();
    const toast = useToast()
    function sendPhoto(e){
        var dateTime = getDateTime()
        if(e.target.files[0].size >= 5000000){
            toast({
                title: `Arquivo muito grande, o tamanho limite é de 5MB`,
                status: 'error',
                position: 'top',
                isClosable: true,
              })
        }else{
            const reader = new FileReader();
            reader.onload = function() {
                const bytes = new Uint8Array(this.result);
                socket.emit('chat-message',
                {
                    id_author:user.id,
                    content:bytes,
                    type:"image",
                    room: active.id_room,
                    name_author:user?.name,
                    schedule_message: dateTime.time,
                    channel: active.channel,
                    isSupport: true,
                },e.target.value=""
                )
            };

            reader.readAsArrayBuffer(e.target.files[0]);
        }
        
    };
     async function sendFile(e){
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
                            type:"file",
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
                    <Input value={image} onChange={(e)=>sendPhoto(e)} id="inputImage" display="none" type="file"  accept="image/*"/>
                    <Input id="inputFile" onChange={(e)=>sendFile(e)}    display="none" type="file"/>

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
                    style={{
                        boxShadow: "0px 4px 4px rgba(51, 173, 225, 0.25)"
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