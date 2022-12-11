import { senderText } from "../sender";

function produto(client, messageTo, user, botConfig){
  const {name} = botConfig;
  senderText(client, messageTo, `${name} ok. Descreva de forma resumida a sua dúvida.`);
  user['stage']='duvida'
}
