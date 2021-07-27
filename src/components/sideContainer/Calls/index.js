import {Box,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import {CallBox} from "./CallBox"
import {HeaderCalls} from "./HeaderCalls"
import { FilterCalls } from './FilterCalls';
export const Calls = ({title,setactive, calls}) => {
    

    const [pending, setPending ]= useState(0);
    const [answering,setAnswering] = useState(0);
    const [finished, setFinished ]= useState(0);
    const [listPending, setListPending ]= useState([]);
    const [listAnswering,setListAnswering] = useState([]);
    const [listFinished, setListFinished ]= useState([]);

    const [filterPending, setFilterPending] = useState(true)
    const [filterAnswering, setFilterAnswering] = useState(true)
    const [filterFinished, setFilterFinished] = useState(false)
    const [filteredCalls, setFilteredCalls] = useState([])


    useEffect(()=>{

        var auxPending=0
        var auxAnswering=0
        var auxFinished=0
        calls.map(
            (c)=>{
                
                if(c.status=="pending"){
                    auxPending+=1
                    listPending.push(c)

                }else if(c.status=="answering"){
                    auxAnswering+=1
                    listAnswering.push(c)
                }else if(c.status=="finished"){
                    auxFinished+=1
                    listFinished.push(c)
                }
            }
        )
        setPending(auxPending)
        setAnswering(auxAnswering)
        setFinished(auxFinished)

        var auxFilter = []
        if(filterPending && filterAnswering && filterFinished ){
            
           
            auxFilter = calls.filter(
                (i)=> i.status == "pending" || i.status == "answering" || i.status == "finished"
            )
        }else if(filterPending && filterAnswering && !filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "pending" || i.status == "answering"
            )
        }else if(filterPending && !filterAnswering && !filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "pending"
            )
        }else if(!filterPending && !filterAnswering && !filterFinished ){
            auxFilter = []
        }else if(!filterPending && filterAnswering && filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "answering" || i.status == "finished"
            )
        }else if(!filterPending && !filterAnswering && filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "finished"
            )
        }else if(!filterPending && filterAnswering && !filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "answering"
            )
        }else if(filterPending && !filterAnswering && filterFinished ){
            auxFilter = calls.filter(
                (i)=> i.status == "pending" || i.status == "finished"
            )
        }
        
        setFilteredCalls(auxFilter)

    },[filterPending, filterAnswering, filterFinished, calls])


    
    

    return(
        <Accordion
        
        marginBottom="5px"
        width="100%"
        defaultIndex={[0]} 
        allowMultiple
        >
            <AccordionItem   bg={'transparent'}> 
            <h2>
              <AccordionButton  height="40px"
              textDecoration="none" 
              pt={"15px"}
              pb={"15px"}
              _focus={{ boxShadow:"none" }}
               >
                <Box 
                borderWidth="0px"  
                fontSize='12px' 
                fontWeight='600'  
                flex="1" 
                textAlign="left">
                {title}
                </Box>
                <HeaderCalls pending={pending} answering={answering} finished={finished}/>    

                <AccordionIcon />

               </AccordionButton>
            </h2>
            <AccordionPanel  pb={"10px"}  p={0} borderWidth="0px">
            
            <FilterCalls 
                filterPending={filterPending} filterAnswering={filterAnswering} filterFinished={filterFinished}
                setFilterPending={setFilterPending} setFilterAnswering={setFilterAnswering} setFilterFinished={setFilterFinished} 
            />  
                   
                    {filteredCalls.map(
                            (c)=>{
                            return (
                            <CallBox 
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

