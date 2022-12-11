import { differenceInSeconds, differenceInHours} from 'date-fns';

import {senderText} from './sender.js'

import {provaDeVidaConfig} from '../config.js'

const {ciclo,encerraChatSemInteracao,envioMsgProvaDeVida, numeroProvaVida} = provaDeVidaConfig

export default function provaDeVida(client, chats){
  console.log('fila prova de vida iniciada')
  setInterval(() => {
    console.log('rodando prova de vida');


    chats.forEach(chat => {
      if(chat['stage'] !== 'aguardando'){
        const timeNotInteraction = differenceInSeconds(Date.now(),chat['timestamp'])

        if(timeNotInteraction > envioMsgProvaDeVida && timeNotInteraction <encerraChatSemInteracao && chat.provaVida< numeroProvaVida ){
          senderText(client, chat.userId, `*👩🏻‍🦱 Nice:* você ainda está ai?`);
          chat['provaVida']++;
        }

        if(timeNotInteraction >= encerraChatSemInteracao){
          senderText(client, chat.userId, `*👩🏻‍🦱 Nice:* estarei finalizando o chat por falta de interação. Caso tenha alguma nova dúvida, não exite em chamar.\n\nLembre-se de nos seguir no Instagram *@papernice_* para ficar por dentro de nossas novidades.\nAté mais.`);
          const userIndex = chats.findIndex(user=>user.userid===chat.userId);
          chats.splice(userIndex,1);
        }
      }
      else{
        const timeNotInteraction = differenceInHours(Date.now(),chat['timestamp'])
        if(timeNotInteraction>=24){
          const userIndex = chats.findIndex(user=>user.userid===chat.userId);
          chats.splice(userIndex,1);
        }
      }
    });
  }, ciclo);
}
