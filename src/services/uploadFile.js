import axios from 'axios';
import FormData from 'form-data'


export const uploadFile = async (file,{urlServer, fileName})=>{
    
    var data = new FormData();
    data.append('file', file);
    console.log(fileName)
    var config = {
    method: 'post',
    url: `${urlServer}/uploadFile?name=${fileName}`,
    headers: { 
        'Content-Type': 'multipart/form-data'
    },
    data : data
    };

  const response = await axios(config)
    .then(function (response) {
      
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return false
    });
  return response
}
