import { Box,useColorMode, Text,Input } from "@chakra-ui/react"
import { BsFillPersonFill,BsFilterRight,BsSearch} from "react-icons/bs"

export const Avatar = (props) => {
    const {colorMode} = useColorMode();
    const primaryColor ={ light: 'light.primary', dark: 'dark.primary' }
    const bgColor =  { light: 'light.background', dark: 'dark.background' }

   

    return(
        
        <Box  
        bg={props.bg?props.bg:bgColor[colorMode]} 
        color={props.color?props.color:primaryColor[colorMode]}
        fontSize={props.fontSize?props.fontSize:"25px"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={props.size?props.size:"35px"}
        width={props.size?props.size:"35px"}
        margin="0"
        padding="3px" 
        borderRadius="30px"
        >
            {props.icon}
        </Box>
    );
}