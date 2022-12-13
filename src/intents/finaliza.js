import { senderText } from "../services/sender.js";

export default function finaliza(client, messageTo,usersStages, user){
  const userName = user.name;

  senderText(client, messageTo, `ok então ${userName}, estarei finalizando o chat aqui. Caso tenha alguma nova dúvida, não exite em chamar.\n\nLembre-se de nos seguir no Instagram *@papernice_* para ficar por dentro de nossas novidades.\nAté mais.`);
  const userIndex = usersStages.findIndex(user=>user.userid===messageTo);
  usersStages.splice(userIndex,1);
}
