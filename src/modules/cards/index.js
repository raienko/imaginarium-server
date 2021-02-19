const Card = require('./Card');

const createCard = async (params) => {
  const card = new Card(params);
  await card.save();
  return card;
}

const fetchCard = async (_id) => {
  return Card.find({ _id });
}

const updateCard = async (_id, updates) => {
  return Card.findOneAndUpdate({ _id }, updates, { new: true });
}

const deleteCard = async (_id) => {
  return Card.remove({ _id });
}

const getDeck = async () => {
  return Card.find({ active: true });
}

module.exports = {
  createCard,
  fetchCard,
  updateCard,
  deleteCard,
  getDeck,
}
