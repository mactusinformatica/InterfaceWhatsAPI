import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client'
const SocketContext = createContext();

export function SocketProvider({children}){
    const[socket, setSocket] = useState(null);

    const connectSocket = (url)=>{
        setSocket(io(url))
    }

    return <SocketContext.Provider value={{
        socket,
        connectSocket
    }}>
       {children} 
    </SocketContext.Provider>



}

export const SocketConsumer = SocketContext.Consumer;

export default SocketContext;