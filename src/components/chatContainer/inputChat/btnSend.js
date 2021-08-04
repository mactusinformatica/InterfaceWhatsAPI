import { Box} from '@chakra-ui/react'

export const BtnSend = ({icon,event}) => {

    return(
        <Box 
        onClick={event?(e)=>event():null}
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
        }
        >   

            {icon}

           

        </Box>
    )
}