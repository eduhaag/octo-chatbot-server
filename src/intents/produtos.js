import { senderText } from "../sender";

function produto(client, messageTo, user){
  senderText(client, messageTo, `ok. Descreva de forma resumida a sua dúvida.`);
  user['stage']='duvida'
}
