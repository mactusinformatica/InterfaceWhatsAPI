import { createContext, useState, useEffect } from "react";
const ChatContext = createContext();

export function ChatProvider({children}){

    const [active,setActive] = useState();

    useEffect(
        ()=>{
            console.log(active)
        },[active]
    )


    return <ChatContext.Provider value={{
        active,
        setActive
    }}>
       {children} 
    </ChatContext.Provider>



}

export const ChatConsumer = ChatContext.Consumer;

export default ChatContext;