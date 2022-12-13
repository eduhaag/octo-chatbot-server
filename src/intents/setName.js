import {senderText} from '../services/sender.js'

export default function setName(client, messageTo, user){
  const userName = user.name;

  senderText(client, messageTo, `Ótimo, obrigada ${userName}.`)
}
