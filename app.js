'use strict';
const server_url = process.env.server_url || 'http://localhost:10050';

const io = require('socket.io-client');

const socket = io(server_url);
console.log(`connecting to ${server_url}`);
