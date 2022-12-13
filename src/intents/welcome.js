import {senderText } from '../services/sender.js'
import {botConfig} from '../config.js'

const {botName} = botConfig;

export default function welcome(client, messageTo, user){
  senderText(client, messageTo, `Olá, tudo bem?\nMe chamo ${botName} e sou a assistente virtual da *Papernice*.`);
  senderText(client, messageTo, `para melhor lhe atender, gostaria de saber qual o seu nome?`, 1000)
}
