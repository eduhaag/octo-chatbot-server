import { senderText } from "../services/sender.js";

export default function entrega(client, messageTo, user){
  senderText(client, messageTo, `${name} ok. Descreva de forma resumida a sua dúvida.`);
  user['stage']='duvida'

}
