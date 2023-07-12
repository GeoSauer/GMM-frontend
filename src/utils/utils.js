const getSuffix = (level) => {
  let suffix;
  if (+level === 1) {
    suffix = 'st';
  } else if (+level === 2) {
    suffix = 'nd';
  } else if (+level === 3) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }
  return suffix;
};

const truncateCharacterName = (character) => {
  const truncatedCharacterName =
    character.charName.length > 20 ? character.charName.slice(0, 20) + '...' : character.charName;
  return truncatedCharacterName;
};

const truncateUsername = (username) => {
  if (username) {
    const truncatedUsername = username.length > 20 ? username.slice(0, 20) + '...' : username;
    return truncatedUsername;
  }
};

const fullModifier = (modifier) => {
  let value;
  switch (modifier) {
    case 'STR':
      value = 'Strength';
      break;
    case 'DEX':
      value = 'Dexterity';
      break;
    case 'CON':
      value = 'Constitution';
      break;
    case 'INT':
      value = 'Intelligence';
      break;
    case 'WIS':
      value = 'Wisdom';
      break;
    case 'CHA':
      value = 'Charisma';
      break;
  }
  return value;
};

module.exports = { getSuffix, truncateCharacterName, truncateUsername, fullModifier };
