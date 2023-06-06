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

module.exports = { getSuffix, truncateCharacterName };
