const sample = require('lodash.sample');

const chooseAssociation = (cards) => {
  const card = sample(cards);
  const association = sample(card.associations);
  return { card, association };
}

const chooseRelative = (association, card, cards) => {
  const perfectMatch = cards.find(i => i.assocations.includes(association));
  if (perfectMatch) {
    return perfectMatch;
  } else {
    return cards[0];
  }
}

const voteForTheCard = (cards, user) => {
  const options = cards.filter(i => i.user !== user);
  return sample(options);
}

module.exports = {
  chooseAssociation,
  chooseRelative,
  voteForTheCard,
}
