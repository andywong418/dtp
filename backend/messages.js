const Message = require('./models/Message');

let rooms = {};

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(socket.id, 'connected!');

		socket.on('disconnect', () => {
			removeFromRoom(socket);
			console.log(socket.id, 'just disconnected!');
		});

		socket.on('CHAT_ENTER', (chatID) => {
			console.log('JOINED', chatID);
			socket.join(chatID);
			socket.room = chatID;
			if (!rooms[socket.room]) {
				rooms[socket.room] = {
					messages: [],
					members: 0
				}
			}
			rooms[socket.room].members++;
			console.log(rooms);
		});

		socket.on('CHAT_CLOSE', (chatID) => {
			removeFromRoom(socket);
			socket.leave(chatID);
		});

		socket.on('SEND_MESSAGE', (message) => {
			rooms[socket.room].messages.push(message);
			socket.broadcast.to(socket.room).emit('MESSAGE_SENT', message);
			console.log(rooms);
		});
	});
}

const removeFromRoom = (socket) => {
	if (rooms[socket.room]) {
		if (rooms[socket.room].members > 0) {
			rooms[socket.room].members--;
		}

		if (!rooms[socket.room].members) {
			console.log(rooms);
			saveMessages(rooms[socket.room].messages, () => {
				console.log('Room Deleted.');
			});
		}
	}
};

const saveMessages = (messages, callback) => {
	Message.create(messages, (error, success) => {
		if (error) {
			console.log('Error saving messages:', error);
		} else {
			console.log('All messages saved successfully');
		}
	})
};