// import { useEffect } from 'react'
// import io from 'socket.io-client'

// const socket = io(process.env.NEXT_PUBLIC_SERVER_CHAT)

// export default function useSocket(eventName, cb) {
//   useEffect(() => {
    
//       socket.on(eventName, cb)
  
//     return function useSocketCleanup() {
//       socket.off(eventName, cb)
//     }
//   }, [eventName, cb])

//   return socket
// }


import { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const useSocket = () => useContext(SocketContext);

export default useSocket;