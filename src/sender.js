function senderText(client, sendTo, text, intervalo=0){
  setTimeout(()=>{
    client
    .sendText(sendTo, text)
    .then((result) => {
      console.log("RESPONDIDO");
    })
    .catch((erro) => {
      console.log("ERRO: ", erro);
    });
  }, intervalo)
}

function senderMenu(client, sendTo, msgBody, menu, intervalo=0){
  /* Bottons format:
      {
        "buttonId": id1,
        "buttonText": {
          "displayText": btn1
        },
        "type": 1
      }
  */

  const {title, footer, buttons} = menu;
  setTimeout(()=>{
    client
    .sendMessageOptions(sendTo, msgBody, {
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
