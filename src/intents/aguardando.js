import { senderText } from "../services/sender.js";

export default function aguardando(client, messageTo, user){
  const userName = user.name;

  senderText(client, messageTo, `${userName} sua mensagem já foi repassada para um atendende. Responderemos o mais rápido o possível.\nGrata pela compreensão.`)
}
