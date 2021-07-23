import { Box } from "@chakra-ui/react"


export const InitialChat = ({active, serverChat}) => {
    return(
        <Box bgImage={`${process.env.NEXT_PUBLIC_HOST}/bgChat2.png`} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box borderTop={"2px"} borderBottom={"2px"} p={2} bg={"#FFFFFF"} display={"flex"} justifyContent={"center"} width={"100%"}>
            <img width={"200px"} src={`${process.env.NEXT_PUBLIC_HOST}/mactus.png`}/>
            </Box>
        </Box>
    )
}