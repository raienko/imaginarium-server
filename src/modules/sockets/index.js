const Room = require ('./Room');
const connections = require('./connections');

const addConnection = (user, connection) => {
  if (!connections[user]) {
    connections[user] = [];
  }
  return connections[user].push(connection);
};

const cancelConnection = (user, connection) => {
  if (!connections[user]?.length) {
    return;
  }

  connections[user] = connections[user].filter(c => c.id !== connection.id);
};

const sendMessage = async (user, message) => {
  const data = JSON.stringify(message);
  return connections[user]?.map(connection => connection.sendUTF(data));
};

const disconnectUser = async (user, reason) => {
  return connections[user]?.map(connection => connection.reject(reason));
};

const createRoom = async (game, users) => {
  const room = new Room({ users, game });
  await room.save();
  return room;
};

const joinRoom = async (game, users) => {
  return Room.findByIdAndUpdate({ game }, { $push: { users } });
};

const sendRoomMessage = async (game, message) => {
  const room = await Room.findOne({ game });
  return room?.users.map(user => sendMessage(user, message));
}

const kickFromRoom = async (game, users) => {
  return Room.findByIdAndUpdate({ game }, { $pull: { users } });
};

const cancelRoom = async (game) => {
  return Room.findOneAndDelete({ game });
};

module.exports = {
  addConnection,
  cancelConnection,
  sendMessage,
  disconnectUser,
  createRoom,
  sendRoomMessage,
  joinRoom,
  kickFromRoom,
  cancelRoom,
}
