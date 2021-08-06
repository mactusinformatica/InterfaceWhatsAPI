import {useState, useEffect} from 'react'
import useAuth from '../../../hooks/useAuth';
import { Box, Input,useColorMode,Text,Tooltip,Popover,PopoverBody,PopoverContent,PopoverTrigger} from '@chakra-ui/react'
import {BtnSend} from './btnSend'
import { AttachmentIcon} from '@chakra-ui/icons'
import getDateTime from '../../../services/getDateTime'
import { IoImage,IoDocumentText} from "react-icons/io5"

export const BtnAttach = ({user,active,socket})=>{
    const [image, setImage] = useState();
    
    function sendPhoto(e){
        var dateTime = getDateTime()
        
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
                }
                )
            };
        reader.readAsArrayBuffer(e.target.files[0]);  
        
    };

    return(
        <Popover>
            <PopoverContent 
            _focus={{ boxShadow:"none" }}
            width="max-content" bg="transparent" border="none" >

                <PopoverBody >
                    <Input value={image} onChange={(e)=>sendPhoto(e)} id="inputImage" display="none" type="file"  accept="image/*"/>
                    <Input id="inputFile" onChange={(e)=>sendPhoto(e)}    display="none" type="file"/>

                    <Tooltip label="Imagem" aria-label="A tooltip">
                        <label for="inputImage">
                            <BtnSend   icon={<IoImage  fontSize={"25px"}/>} />
                        </label>
                    </Tooltip>
                    
                    <Tooltip label="Documento" aria-label="A tooltip">
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