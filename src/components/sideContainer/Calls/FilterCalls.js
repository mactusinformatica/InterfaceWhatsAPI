import { Checkbox, Stack} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
export const  FilterCalls = ({filterPending, filterAnswering, filterFinished,
                            setFilterPending,setFilterAnswering, setFilterFinished}) => {
   
    return(
        <Stack pr={"5px"} pl={"5px"} justifyContent={'center'} textAlign="center" direction="row">
            <Checkbox  onChange={()=>setFilterPending(!filterPending)}  size="sm" colorScheme="red" defaultIsChecked>
                Pendente
            </Checkbox>
            <Checkbox  onChange={()=>setFilterAnswering(!filterAnswering)} size="sm"  colorScheme="blue" defaultIsChecked>
                Andamento
            </Checkbox>
            <Checkbox size="sm" onChange={()=>setFilterFinished(!filterFinished)}  colorScheme="green" >
                Finalizado
            </Checkbox>
        </Stack>
    )
}