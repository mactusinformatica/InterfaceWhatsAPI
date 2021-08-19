import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client'
const SocketContext = createContext();

export function SocketProvider({children}){

    const[socket, setSocket] = useState(null);
    const[connectError, setConnectError] = useState(null);

    const connectSocket =  (url)=>{
             setSocket(io(url,{reconnection: false}))
    }

    const socketEvent= (eventName, cb)=>{
        useEffect(() => {
            socket?.on(eventName, cb)
    
            return function useSocketCleanup() {
            socket?.off(eventName, cb)
            }
        }, [eventName, cb])

        return socket
    }  
    
    return <SocketContext.Provider value={{
        socket,
        connectSocket,
        socketEvent,
        connectError,
        setConnectError
    }}>
       {children} 
    </SocketContext.Provider>



}

export const SocketConsumer = SocketContext.Consumer;

export default SocketContext;