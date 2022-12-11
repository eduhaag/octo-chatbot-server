import express from "express";
import wppconnect from "@wppconnect-team/wppconnect";
import fs  from'fs';

import {start} from './client.js'
var status ='';
var client;

const server = express();
server.use('/startServer', express.static('public'));
server.get('/status', (req,res)=>{
  res.json({status});
})

server.listen(3333, () => {
  console.log("Server initialized");
});

// aqui inicia o bot

var userStages=[]

// deleta qrcode
fs.unlink('./public/out.png', (err)=>{
  if(err) console.log(err)
})

wppconnect
  .create({
    session: "whatsbot",
    statusFind:(statusSession, session)=>{
      status = statusSession;
      console.log('status', statusSession)
    },
    catchQR: (base64Qr, asciiQR)=>{
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        responses = {};

      if(matches.length !==3){
        return new Error('Invalid input string.');
      }
      responses.type= matches[1];
      responses.data= new Buffer.from(matches[2], 'base64');

      var imageBuffer = responses;
      fs.writeFile(
        './public/out.png',
        imageBuffer['data'],
        'binary',
        function (err){
          if(err != null){
            console.log(err)
          }
        }
      )
    },
    autoClose: false,
    puppeteerOptions: { args: ["--no-sandbox"] },
  })
  .then((cliente) =>{
    client = cliente;
    start(client, userStages)}
  )
  .catch((error) => console.log(error));

