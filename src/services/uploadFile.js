import axios from 'axios';
import FormData from 'form-data'


export const uploadFile = async (file,urlServer)=>{
    var data = new FormData();
    data.append('file', file);

    var config = {
    method: 'post',
    url: `${urlServer}/uploadFile`,
    headers: { 
        'Content-Type': 'multipart/form-data'
    },
    data : data
    };

    var response = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return true
    })
    .catch(function (error) {
      console.log(error);
      return false
    });

    return response
}
