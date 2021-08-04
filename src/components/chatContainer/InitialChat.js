
import useAuth from '../../hooks/useAuth';
import { Box } from "@chakra-ui/react"

export const InitialChat = ({active, serverChat}) => {
    const {host} = useAuth();
    return(
        <Box  height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box borderTop={"2px"} borderBottom={"2px"} p={2} bg={"#FFFFFF"} display={"flex"} justifyContent={"center"} width={"100%"}>
            <img width={"200px"} src={`${host}/mactus.png`}/>
            </Box>
        </Box>
    )
}