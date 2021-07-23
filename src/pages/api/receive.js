import sendMessage from '../../services/sendMessage.js'

var started = [];


export default async function handler(req,res){
    
    console.log("######## RECEIVE ############")

  if( req.body.type =="message"){
    var name = req.body.payload.sender.name;
    var number = req.body.payload.sender.phone;
    var message = req.body.payload.payload.text.trim().toLowerCase()

    if(message!=undefined){
      
      console.log("req.body.payload.payload.text: ",message);
  
      if(!started.includes(number)){
        console.log("Não iniciado: ",number)
        await sendMessage(
          `${number}`,
          `Olá *${name?name:number}*
Seja bem-vindo(a) ao atendimento do 1 RI Maringá.
Eu sou a *Olívia*, sua assistente virtual.
Estou aqui para ajudar no pré-atendimento.`,
        false,
        "text"
)
        await sendMessage(
          `${number}`,
  `Nosso horário de atendimento é das 8h30 às 11h e das 13h às 17h. Para evitar aglomeração solicitamos o agendamento no site www.registrodeimoveis.org.br/atendimentoremoto
  Por favor, escolha uma opção:\n
  1 -    Pedido de certidão;
  2 -    Custas;
  3 -    Acompanhamento do protocolo;
  4 -    Dúvida sobre o tipo de certidão que você precisa;
  5 -    Endereço do cartório;`,
  false,
  "text"
)
    
        started.push(number);
        res.end();

      }else{
        if(message== "1" ||message=="pedido"||message=="certidão" ||message=="certidao" ){

          console.log(message)
        await  sendMessage(
            `${number}`,
            `Os pedidos de certidão podem ser efetuados pelo site ebalcao.com.br\n
Após o pagamento, seu pedido será processado pelo cartório e no máximo em 24h poderá efetuar o download de sua certidão pela própria plataforma com seu login.`,
            false,
            "text"
          )

          res.end();
        }else if(message == "2"){
          console.log(message)
        await sendMessage(
            `${number}`,
            `O valor da certidão é de R$ 50,00.\n 
O valor do registro, via de regra, sai por R$ 1.000,00 por imóvel, podendo sofrer alterações caso necessite de outros registros e averbações. Para maior precisão, agende seu horário e busque um atendimento presencial.\n
            `,
            false,
            "text"
  
          )

          res.end();
        }
        else if( message == "3"){
          console.log(message)
        await sendMessage(
            `${number}`,
            `Para acompanhar o andamento do seu protocolo, acesse o site: aripar/....\n`,
            false,
            "text"
          )
          res.end();
        }
        else if(message == "4"){
          console.log(message)
          await  sendMessage(
            `${number}`,
            `Tipos mais comuns de certidão:\n
Certidão de Inteiro teor ou cópia da matrícula: asfiafife\n
Certidão de Ônus: bafbhafae\n
Certidão de Propriedade: asfndhfushg\n`,
            false,
            "text"
          )
          res.end();
        }
        else if(message == "5"){
          console.log(message)
        await  sendMessage(
            `${number}`,
            `Av. Duque de Caxias, 882, sala 803, Centro, Maringá/PR \n`,
            false,
            "text"
          )

          res.end();
        }
        else{
          console.log(message)
        await sendMessage(
            `${number}`,
            `Não compreendi\n\n
Por favor, escolha uma opção:\n
 1-    Pedido de certidão;\n
 2-    Custas;\n
 3-    Acompanhamento do protocolo;\n
 4-    Dúvida sobre o tipo de certidão que você precisa;\n
 5-    Endereço do cartório;\n
 `,
            false,
            "text"
          )
          res.end();
        }
 
      }
    }else{
      console.log("ERROR: message")
      res.end();
    }
  }else{
    res.end();
  }

  console.log("#############################")
  

}