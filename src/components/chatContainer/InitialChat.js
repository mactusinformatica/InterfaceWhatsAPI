import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Box } from "@chakra-ui/react"

export const InitialChat = ({active, serverChat}) => {
    return(
        <Box  height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box borderTop={"2px"} borderBottom={"2px"} p={2} bg={"#FFFFFF"} display={"flex"} justifyContent={"center"} width={"100%"}>
            <img width={"200px"} src={`${publicRuntimeConfig.NEXT_PUBLIC_HOST}/mactus.png`}/>
            </Box>
        </Box>
    )
}