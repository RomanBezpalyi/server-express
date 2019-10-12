const app = require('express')();
const io = require('socket.io-client')('http://localhost:3000');

io
  .on('connect', () => {
    console.log('connected client 2');
  })
  .on('message', (data) => {
    console.log(data)
  });
