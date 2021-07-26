import Router from "next/router";
import { createContext, useState } from "react";
import axios from 'axios';
const AuthContext = createContext();

export function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);


    const signin = ({email,password}, callback)=>{
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append('email',email);
            formData.append('senha',password);
        
            var config = {
                method: 'post',
                url: process.env.NEXT_PUBLIC_API_FINANCEIRO,
                data : formData
            };
            axios(config).then(function (res) {
                
                setUser(res.data);
                
                if(res.data.erro == false){
                    Router.push('/');
                }else{
                    callback
                }
                
            })
            .catch(function (error) {
                //   console.log("ASDDDDDDD")
                setUser(error.data);
            });
        }
        finally {
            setLoading(false);
        }
    }

    const signout = ()=>{
        setLoading(true);
        try{
            Router.push('/');
            return setUser(false);
        }
        finally{
            setLoading(false);
        }
    }


    return <AuthContext.Provider value={{
        user,
        signin,
        signout,
        loading
    }}>
       {children} 
    </AuthContext.Provider>

}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;