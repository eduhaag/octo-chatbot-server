import {botConfig} from '../config.js'

const {botEmoji, botName} = botConfig

function senderText(client, sendTo, text, intervalo=0){
  setTimeout(()=>{
    client
    .sendText(sendTo, `*${botEmoji} ${botName}:* ${text}`)
    .then((result) => {
      console.log("RESPONDIDO");
    })
    .catch((erro) => {
      console.log("ERRO: ", erro);
    });
  }, intervalo)
}

function senderMenu(client, sendTo, msgBody, menu, intervalo=0){
   const {title, footer, buttons} = menu;
  setTimeout(()=>{
    client
    .sendMessageOptions(sendTo, `*${botEmoji} ${botName}:* ${msgBody}`, {
      title,
      footer,
      isDynamicReplyButtonsMsg: true,
        dynamicReplyButtons: buttons
    })
    .then((result)=>{
      console.log("Menu enviado");
    })
    .catch((erro)=>{console.log("ERRO: ", erro)})
  },intervalo)
}

export {senderText, senderMenu};
