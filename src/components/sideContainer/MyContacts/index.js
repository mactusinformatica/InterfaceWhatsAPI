import {Box,useColorMode} from '@chakra-ui/react'
import {asd} from 'next/image'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react";
import { useState } from 'react';
import {ContactBox} from "./ContactBox"

export const MyContacts = ({title,setactive}) => {
    const {colorMode} = useColorMode();
    const primaryColor = { light: 'light.primary', dark: 'dark.primary' }
    const secondaryColor = { light: 'light.secondary', dark: 'dark.secondary'}
    const fontColor = {light: 'light.fontColor', dark: 'dark.fontColor'}

    const [contacts, setContacts] = useState([
        {
        name:"caio",
        schedule:"12:33",
        lastMessage:"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        schedule_message:"06/07/2021, 12:30",
        id: "(00)999887701",
        channel: "sri",
        status: "pending",
            
        },
        {
        name:"caio",
        schedule:"12:33",
        lastMessage:"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        schedule_message:"06/07/2021, 12:30",
        id: "(00)999887701",
        channel: "sri",
        status: "pending",
                
        },
        {
        name:"caio",
        schedule:"12:33",
        lastMessage:"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        schedule_message:"06/07/2021, 12:30",
        id: "(00)999887701",
        channel: "sri",
        status: "pending",
        }
    ]);

    return(
        <Accordion
        
        marginBottom="5px"
        width="100%"
        defaultIndex={[0]} 
        allowMultiple
        >
            <AccordionItem   bg={'transparent'}> 
            <h2>
              <AccordionButton  height="25px"
              textDecoration="none" 
              _focus={{ boxShadow:"none" }} >
                <Box 
                borderWidth="0px"  
                fontSize='12px' 
                fontWeight='600'  
                flex="1" 
                textAlign="left">
                {title}
                </Box>
                <AccordionIcon />
               </AccordionButton>
            </h2>
            <AccordionPanel  pb={"10px"}  pt={0} pl={0} pr={0} borderWidth="0px">
            {contacts.map(
                (c)=>{
                   return (
                   <ContactBox 
                   contact={c}
                   setactive={setactive}
                   />
                   )}
            )}
    </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

