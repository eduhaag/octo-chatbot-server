import { senderText } from "../sender.js";

export default function aguardando(client, messageTo, user, botConfig){
  const {name} = botConfig;
  const userName = user.name;

  senderText(client, messageTo, `${name} ${userName} sua mensagem já foi repassada para um atendende. Responderemos o mais rápido o possível.\nGrata pela compreensão.`)
  user['timestamp']=Date.now();
}
