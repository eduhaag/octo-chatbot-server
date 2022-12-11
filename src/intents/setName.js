import {senderText} from '../sender.js'

export default function setName(client, messageTo, user, botConfig){
  const {name} = botConfig;
  const userName = user.name;

  senderText(client, messageTo, `${name} Ótimo, obrigada ${userName}.`)
}
