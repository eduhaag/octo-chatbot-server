import {senderMenu} from '../../services/sender.js'

// -------------Menu
const menuButtons = [
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

export default function menu(client, messageTo, user){
  const userName = user.name;

  senderMenu(client, messageTo, `${userName}, agora selecione nos botões abaixo sobre o que gostaria de falar:`, {buttons:menuButtons}, 500);
  user['stage']='menu';
}
