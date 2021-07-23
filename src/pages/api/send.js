import sendMessage from '../../services/sendMessage'

export default function handler(req,res){
    console.log("******** SEND ************")
    
   let destination= req.body.destination;
   let isHSM = req.body.isHSM;
   let type = req.body.type;
   let text = req.body.text;
   

    sendMessage(destination,text,isHSM,type).then(
      ()=>{
        res.send('OK',200)
        console.log("SUCCESSFUL")
      }
    ).catch(
      (err)=>{
        console.log("Error on SENDMESSAGE", err)
        res.send(err)
      }
    )
    console.log("***************************")
}