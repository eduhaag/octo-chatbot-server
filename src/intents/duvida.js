import { senderText } from "../sender.js";

export default function duvida(client, messageTo, user, botConfig){
  const {name} = botConfig;
  const userName = user.name;

  senderText(client, messageTo, `${name} ${userName} estarei transferindo o chat para um atendente. Assim que possível responderemos.`);
  user['stage'] ='aguardando';
  user['timestamp']=Date.now();
}
