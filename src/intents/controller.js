import { differenceInSeconds} from 'date-fns';

import welcome from "./welcome.js";
import setName from "./setName.js";
import menu from "./menu/menu.js";
import menuController from "./menu/menuController.js";
import entrega from "./entrega.js";
import finaliza from "./finaliza.js";
import duvida from "./duvida.js";
import aguardando from "./aguardando.js";


//stages: welcome >> nome >> menu >> Fim
export default function intentController(client, usersStages, message){
  var user = usersStages.find(user=>user.userId===message.from)
  user = user ? user : {stage:undefined};

  if(message.mimetype){
    client.sendText(message.from, 'Desculpe, ainda não aprendi a lidar com esse tipo de mensagem, favor escrever sua mensagem.');
    return;
  }

  if(message.isGroupMsg===true){
    return;
  }



  switch(user.stage){
    case 'nome':
      user['name'] = message.body;
      setName(client, message.from, user);
      menu(client, message.from, user);
      user['stage'] = 'menu'
      break;

    case 'menu':
      menuController(client, message, user);
      break;

    case 'produto':
      const mensagem = message.body;
      if(mensagem==='Sim'){
        entrega(client, message.from, user);
      }else if(mensagem==='Não'){
        finaliza(client,message.from, usersStages, user);
      }else{
        menu(client,message.from, user);
      }
      break;

    case 'entrega':
      const msg = message.body;
      if(msg==='Sim'){
        entrega(client, message.from, user);
      }else if(msg==='Não'){
        finaliza(client,message.from, usersStages, user);
      }else{
        menu(client,message.from, user);
      }

      break;

    case 'duvida':
      duvida(client, message.from, user);
      setTimeout(()=>{
        client.markUnseenMessage(message.from);
      },2000);
      break;

    case 'aguardando':
      if(differenceInSeconds(Date.now(),user['timestamp'])>=300){
        aguardando(client, message.from, user);
      };
      setTimeout(()=>{
        client.markUnseenMessage(message.from);
      },2000);
      break;

    default: //welcome
      welcome(client, message.from, user)
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

  // define ultima interação
    user['timestamp']=Date.now();
    user['provaVida']=0;
}
