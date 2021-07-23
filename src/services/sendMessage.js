import axios from 'axios';
import qs from 'querystring'
export default async function sendMessage (destination, text, isHSM, type, callback){
    var data = qs.stringify({
      "channel" : "whatsapp",
      "source" : "554430179011",
      "destination" :`${destination}`,
      "src.name":"CartorioBot",
      "message.payload":`{"isHSM":"${isHSM}", "type": "${type}", "text": "${text}"
    }`
    });
    var config = {
      method: 'post',
      url: 'https://api.gupshup.io/sm/api/v1/msg',
      headers: { 
        'apikey': '1w9y15pluo7bpatwxuixp7imyvsrmd0u', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
   await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      
    })
    .catch(function (error) {
      console.log(error);
     
    });
  }