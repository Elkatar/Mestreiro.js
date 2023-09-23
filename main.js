///////////////////////////////////
//
//
//
//
//
//
//
//
//
//////////////////////////////////

const express = require('express');
const http = require('http'); 
const socketIO = require('socket.io'); 
const path = require('path');
const si = require('systeminformation');


const Roll = require('roll');

const port = process.env.PORT || 1000;
const appex = express();
const server = http.createServer(appex); 
const io = socketIO(server);

appex.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname) });
});

appex.get('/systemstatus', async (req, res) => {
    let system = {};
    await si.cpu().then(data => system['cpu'] = data);
    await si.mem().then(data => system['memory'] = data);
    res.json(system);
});

appex.get('/fichas/:id', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
});
appex.get('/mapas/:id', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
});
appex.get('/dashboard/:id', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
});

io.on('connection', (socket) => {
  console.log('Um usuário conectou ao Socket.IO');
  
  
    si.cpu().then(data => socket.emit('checkcpu', data));

  
  socket.on('message', (data) => {
    console.log(`Mensagem recebida: ${data}`);

    
    io.emit('message', data);
  });

 
  
  socket.on('disconnect', () => {
    console.log('Um usuário desconectou do Socket.IO');
  });
});



server.listen(port, () => {
  console.log(`||||||| Servidor Rodando [${port}] ||||||| `);
});
