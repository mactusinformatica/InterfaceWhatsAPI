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
                console.log(res.data)
                if(res.data.erro ==false){
                    var userObj ={
                        name: res.data.name.split(" ")[0],
                        id: res.data.id,
                        token: res.data.token,
                        //server_whatsapi:"http://localhost:5000"
                        server_whatsapi: res.data.dados_adicionais[0].server_whatsapi
                    }
                    setUser(userObj)
                }else{
                    console.log("1")
                    signout()
                    setUser(false)
                }
            }).catch(
                (err)=>{
                    console.log("2 ", err)
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
             uServer = user.dados_adicionais[0].server_whatsapi
        }else if(user.name){
             uId = user.id
             uName = user.name.split(" ")[0]
             uToken = user.token
             uServer = user.server_whatsapi
        }
        return {
            id: uId,
            name: uName,
            token: uToken,
            server_whatsapi: uServer
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
                    console.log(userObj)
                    await setUser(userObj);
                    await setCookie(undefined,"macwhatsapi-auth",userObj.token,{
                        maxAge: 60 * 60 * 24 //24h
                    })
                    Router.push('/');
                }else{
                    console.log("SUBMIT ERROR: ",res.data.erro )
                    return false;
                }
            })
            .catch(function (error) {
                console.log("error: ", error )
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
           // setUser(false);
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