const getSuffix = (num) => {
  let suffix;
  if (num === 1) {
    suffix = 'st';
  } else if (num === 2) {
    suffix = 'nd';
  } else if (num === 3) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }
  return suffix;
};

module.exports = { getSuffix };
