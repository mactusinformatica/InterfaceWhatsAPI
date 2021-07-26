import axios from 'axios';

const apiLogin = async ({email,password}, setIsLoading)=>{
    
    
        
       
        const formData = new FormData();
        formData.append('email',email);
        formData.append('senha',password);

        var config = {
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_FINANCEIRO,
            data : formData
          };
        let response = await axios(config).then(function (res) {
            // console.log(JSON.stringify(res.data));
            return res.data;
          })
          .catch(function (error) {
            //   console.log("ASDDDDDDD")
            console.log(error);
            return error.mensagem;
          });
    

    return response;



}; 
export default apiLogin;