'use strict';
const server_url = process.env.server_url || 'http://localhost:10050';

const io = require('socket.io-client');

const socket = io(server_url);
console.log(`connecting to ${server_url}`);

socket.on('start', function() {
  console.log('This player is the one to start.');
  // initial number in range [50, 150)
  let init_number = 50 + Math.floor(Math.random() * 100);
  socket.emit('number', init_number);
});

socket.on('number', function(number) {
  let step;
  if ((number - 1) % 3 === 0) {
    step = -1;
  } else if ((number + 1) % 3 === 0) {
    step = 1;
  } else {
    step = 0;
  }
  let calculated_number = (number + step) / 3;
  // eslint-disable-next-line max-len
  console.log(`Received ${number}, added: ${step}, the result number to send is ${calculated_number}`);
  socket.emit('number', calculated_number);
});

socket.on('game-over', function(message) {
  if (message.win) {
    console.log('Winner!! :)');
  } else {
    console.log(':(');
  }
  socket.disconnect();
});

socket.on('disconnect', function(){
  console.log('Disconnected from the server');
});
