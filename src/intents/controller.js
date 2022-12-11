import { differenceInSeconds} from 'date-fns';

import welcome from "./welcome.js";
import setName from "./setName.js";
import menu from "./menu/menu.js";
import menuController from "./menu/menuController.js";
import entrega from "./entrega.js";
import finaliza from "./finaliza.js";
import duvida from "./duvida.js";
import aguardando from "./aguardando.js";

var botConfig={
  name: '*👩🏻‍🦱 Nice:*',
  shortName:'*Nice*'
}

//stages: welcome >> nome >> menu >> Fim
export default function intentController(client, usersStages, message){
  var user = usersStages.find(user=>user.userId===message.from)
  user = user ? user : {stage:undefined};

  if(message.mimetype){
    client.sendText(message.from, '*👩🏻‍🦱 Nice:* Desculpe, ainda não aprendi a lidar com esse tipo de mensagem, favor escrever sua mensagem.');
    return;
  }

  if(message.isGroupMsg===true){
    return;
  }

  // define ultima interação
  user['timestamp']=Date.now();

  switch(user.stage){
    case 'nome':
      user['name'] = message.body;
      setName(client, message.from, user, botConfig);
      menu(client, message.from, user, botConfig);
      user['stage'] = 'menu'
      break;

    case 'menu':
      menuController(client, message, user, botConfig);
      break;

    case 'produto':
      const mensagem = message.body;
      if(mensagem==='Sim'){
        entrega(client, message.from, user, botConfig);
      }else if(mensagem==='Não'){
        finaliza(client,message.from, usersStages, user, botConfig);
      }else{
        menu(client,message.from, user, botConfig);
      }
      break;

    case 'entrega':
      const msg = message.body;
      if(msg==='Sim'){
        entrega(client, message.from, user, botConfig);
      }else if(msg==='Não'){
        finaliza(client,message.from, usersStages, user, botConfig);
      }else{
        menu(client,message.from, user, botConfig);
      }

      break;

    case 'duvida':
      duvida(client, message.from, user, botConfig);
      setTimeout(()=>{
        client.markUnseenMessage(message.from);
      },2000);
      break;

    case 'aguardando':

      if(differenceInSeconds(Date.now(),user['timestamp'])>=300){
        aguardando(client, message.from, user, botConfig);
      };
      setTimeout(()=>{
        client.markUnseenMessage(message.from);
      },2000);
      break;

    default: //welcome
      console.log('*Usuário atual* from:' + message.from);
      welcome(client, message.from, user, botConfig)
      const newUser = {
        stage: 'nome',
        name: undefined,
        userId: message.from,
        timestamp: Date.now(),
        provaVida: 0
      }
      usersStages.push(newUser);
      break;
  }
}
