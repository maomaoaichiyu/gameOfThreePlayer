'use strict';
const server_url = process.env.server_url || 'http://localhost:10050';

const io = require('socket.io-client');

const socket = io(server_url);
console.log(`connecting to ${server_url}`);

socket.on('start', function() {
  console.log('You start the game. Please send the first number.');
  // initial number in range [50, 150)
  let init_number = 50 + Math.floor(Math.random() * 100);
  console.log(`You sent ${init_number} to start.`);
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
  console.log(`You received ${number}.`);
  console.log(`You added: ${step}, sent ${calculated_number} to the other.`);
  socket.emit('number', calculated_number);
});

socket.on('game-over', function(message) {
  if (message.win) {
    console.log('You won! :)');
  } else {
    console.log('You lost! :(');
  }
  socket.disconnect();
});

socket.on('kickout', function() {
  console.log('No more space in the game, the server has kicked you out.');
});

socket.on('connect', function() {
  console.log('You are connected to the server.');
});

socket.on('disconnect', function(){
  console.log('Disconnected from the server. Please restart to retry.');
});
