import {senderMenu, senderText} from '../../sender.js'

// -------------Menu
const menuButtons = [
  //*1* - Informações sobre produtos\n*2* - Envio/Entrega\n*3* - Personalização\n*4* - Outros assuntos`
  {
    'buttonId': 'btProdutos',
    'buttonText': {
      'displayText': 'Informações sobre produtos'
    },
    'type': 1
  },
  {
    'buttonId': 'btEnvio',
    'buttonText': {
      'displayText': 'Envio / Entregas'
    },
    'type': 1
  },
  {
    'buttonId': 'btOutros',
    'buttonText': {
      'displayText': 'Outros'
    },
    'type': 1
  }
];

export default function menu(client, messageTo, user, botConfig){
  const {name} = botConfig;
  const userName = user.name;

  senderMenu(client, messageTo, `${name} ${userName}, agora selecione nos botões abaixo sobre o que gostaria de falar:`, {buttons:menuButtons}, 500);
  user['stage']='menu';
}
