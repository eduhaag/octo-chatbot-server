import {senderText } from '../sender.js'

export default function welcome(client, messageTo, user, botConfig){
  const {name, shortName} = botConfig
  senderText(client, messageTo, `${name} Olá, tudo bem?\nMe chamo ${shortName} e sou a assistente virtual da *Papernice*.`);
  senderText(client, messageTo, `${name} para melhor lhe atender, gostaria de saber qual o seu nome?`, 1000)
}
