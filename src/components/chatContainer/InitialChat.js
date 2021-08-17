import { Box } from "@chakra-ui/react"

export const InitialChat = ({active, serverChat,urlHost}) => {
    
    return(
        <Box  height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <img width={"200px"} src={`${urlHost}/mactus.png`}/>
        </Box>
    )
}