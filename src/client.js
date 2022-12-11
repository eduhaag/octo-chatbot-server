import intentController from './intents/controller.js';
import provaDeVida from './provaDeVida.js';

var chats=[];

export function start(client, userStages){
  chats = userStages;

  provaDeVida(client, chats);

  client.onMessage((message) => {
    console.log(`${message.from} diz: ${message.body}`);
    intentController(client, chats, message);
  });
}

