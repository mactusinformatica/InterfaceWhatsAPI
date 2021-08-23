import Router from "next/router";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import {parseCookies,setCookie, destroyCookie} from 'nookies';
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();

export function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        const {"macwhatsapi-auth": token} = parseCookies();
        if(token){
            var config = {
                method: 'get',
                url: "https://macfinanceiro.mactus.com.br/api/APIStatus.php",
                headers: { 
                    'Authorization':`Bearer ${token}` 
                  }
            };
            axios(config).then(function (res) {
                if(res.data.erro ==false){
                    var userObj ={
                        name: res.data.name.split(" ")[0],
                        id: res.data.id,
                        token: res.data.token,
                        server_whatsapi:process.env.NODE_ENV=="development"?'http://localhost:5000':res.data.dados_adicionais[0].server_whatsapi
                    }
                    console.log("setUserAUTH")
                    setUser(userObj)
                }else{
                    signout()
                }
            }).catch(
                (err)=>{
                    console.log(err)
                    signout()
                    setUser(false)
                }
            )
            }
    },[])

    const formatUser = (user)=>{
        
        var uId;
        var uName;
        var uToken;
        var uServer;
        if(user.nome){
             uId = user.id
             uName = user.nome.split(" ")[0]
             uToken = user.token
             uServer = "http://localhost:5000"
             //uServer = user.dados_adicionais[0].server_whatsapi
        }else if(user.name){
             uId = user.id
             uName = user.name.split(" ")[0]
             uToken = user.token
             uServer = "http://localhost:5000"
             //uServer = user.server_whatsapi
        }
        return {
            id: uId,
            name: uName,
            token: uToken,
            server_whatsapi: process.env.NODE_ENV=="development"?'http://localhost:5000':uServer
        }
    }

    const signin = async ({email,password, apiFinanceiro})=>{
        
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append('email',email);
            formData.append('senha',password);
            var config = {
                method: 'post',
                url: apiFinanceiro,
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
                    console.log(res.data.erro )
                    return false;
                }
            })
            .catch(function (error) {
                console.log(error )
                setUser(error.data);
            });
            return response;
        }
        finally {
            setLoading(false);
        }
    }
    
    const signout = (setSocket)=>{
        setLoading(true);
        try{
            Router.push('/login');
            destroyCookie(undefined, 'macwhatsapi-auth');
            setUser(null);
            setSocket(null);

        }
        finally{
           // setUser(false);
        setLoading(false);
        }
    }
    return <AuthContext.Provider value={{
        user,
        setUser,
        signin,
        signout,
        loading,
        setLoading
    }}>
       {children} 
    </AuthContext.Provider>

}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;