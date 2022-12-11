import { senderMenu, senderText } from "../../sender.js";
import menu from "./menu.js";

const menuButtons = [
  {
    'buttonId': 'btsim',
    'buttonText': {
      'displayText': 'Sim'
    },
    'type': 1
  },
  {
    'buttonId': 'btnao',
    'buttonText': {
      'displayText': 'Não'
    },
    'type': 1
  },
  {
    'buttonId': 'btvoltar',
    'buttonText': {
      'displayText': 'Voltar ao menu anterior'
    },
    'type': 1
  },
];

export default function menuController(client, message, user, botConfig){
  const {name} = botConfig;
  const to = user.userId;
  const msg = message.body
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");


  switch(msg){
    case 'informacoes sobre produtos':
    case 'informacoes':
      senderText(client, to, `${name} \n*Sobre nossos produtos:* Nós trabalhamos com agendas, cadernos, livros de mensagens, livros do bebê, blocos e vários outros itens de encadernação, tudo com capa personalizada.\n\nAlguns produtos podem ter o miolo personalizado. Por isso é importante a consulta na página do produto em nosso site.`,500);
      senderMenu(client, to, `${name} você ainda tem alguma dúvida sobre nossos produtos?`, {buttons: menuButtons}, 2000)
      user['stage'] = 'produto';
      break;

    case 'envio / entregas':
    case 'envio':
    case 'entrega':
    case 'entregas':
      senderText(client, to, `${name} nós entregamos em todo o território nacional com máxima segurança através das transportadoras parceiras (Correios e Jadlog).\n\nNossos produtos são embalados com todo o cuidado para garantir que você receberá ele perfeito em seu endereço.`, 500);
      senderMenu(client, to, `${name} você ainda tem alguma dúvida sobre a entrega?`, {buttons:menuButtons}, 2000);
      user['stage'] = 'entrega';
      break;

    case 'outros':
      senderText(client, to, `${name} ok. Me diga resumidamente sobre o que você gostaria de falar?`);
      user['stage'] = 'duvida';
      break;

    default:
      senderText(client, to, `${name} desculpe não entendi. Vamos tentar de novo`);
      menu(client, to, user, botConfig);
      user['stage']='menu';
      break;
  }

}
