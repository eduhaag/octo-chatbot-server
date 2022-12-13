import { senderText } from "../services/sender.js";

export default function duvida(client, messageTo, user){
  const userName = user.name;

  senderText(client, messageTo, `${userName} estarei transferindo o chat para um atendente. Assim que possível responderemos.`);
  user['stage'] ='aguardando';
}
