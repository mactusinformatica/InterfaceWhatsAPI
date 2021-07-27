import Router from "next/router";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import {parseCookies,setCookie, destroyCookie} from 'nookies';
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();

export function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    const isAuthenticated = !!user;
    useEffect(()=>{
        const {"macwhatsapi-auth": token} = parseCookies();
        if(token){
            
            const decodeToken =  jwt_decode(token, {payload:true});
            var userObj = formatUser(decodeToken)
            setUser(userObj)
        }
    },[])

    const formatUser = (user)=>{
        var uId;
        var uName;
        var uToken;
        if(user.nome){
             uId = user.id
             uName = user.nome.split(" ")[0]
             uToken = user.token
        }else if(user.name){
             uId = user.id
             uName = user.name.split(" ")[0]
             uToken = user.token
        }

        return {
            id: uId,
            name: uName,
            token: uToken
            }
    }

    const signin = async ({email,password})=>{
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
            const response = await axios(config).then(async function (res) {
                
                
                if(res.data.erro == false){
                   

                    var userObj = formatUser(res.data)
                    await setUser(userObj);
                    await setCookie(undefined,"macwhatsapi-auth",userObj.token,{
                        maxAge: 60 * 60 * 24 //24h
                    })
                    
                    Router.push('/');
                }else{
                    return false;
                }
                
            })
            .catch(function (error) {
                setUser(error.data);
            });
            return response;
        }
        finally {
            setLoading(false);
        }
    }
    const signout = ()=>{
        setLoading(true);
        try{
            Router.push('/login');
            destroyCookie(undefined, 'macwhatsapi-auth');
            
        }
        finally{
            setUser(false);
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