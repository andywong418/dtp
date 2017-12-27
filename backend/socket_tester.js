const io = require('socket.io-client');

let socket = io.connect('http://10.2.106.85:3000');

setTimeout(() => sendEvent('CHAT_ENTER', 'XD'), 500);
setTimeout(() => sendEvent('SEND_MESSAGE', createMessage()), 1500);
setTimeout(() => sendEvent('SEND_MESSAGE', createMessage()), 1000);
setTimeout(() => sendEvent('SEND_MESSAGE', createMessage()), 2500);

const sendEvent = (event, data) => {
	console.log('EVENT', event, 'SENT!');
	socket.emit(event, data);
}

const createMessage = () => {
	let content = '';
	for (let i = 0; i < 7; i++) {
		content += String.fromCharCode(Math.floor(Math.random() * (91 - 65) + 65));
	}
	return {
		author: 'Obadah',
		content,
		roomId: 'XD',
		recipientId: '123',
		sentAt: new Date()
	};
};