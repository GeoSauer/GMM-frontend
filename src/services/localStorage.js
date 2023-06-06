const USER_KEY = 'USER';
const CHARACTER_KEY = 'CHARACTER';

export function storeLocalUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getLocalUser() {
  const json = localStorage.getItem(USER_KEY);
  try {
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    storeLocalUser();
  }
}

export function storeLocalCharacter(charId) {
  if (charId) {
    localStorage.setItem(CHARACTER_KEY, JSON.stringify(charId));
  } else {
    localStorage.removeItem(CHARACTER_KEY);
  }
}

export function getLocalCharacter() {
  const json = localStorage.getItem(CHARACTER_KEY);
  try {
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    storeLocalCharacter();
  }
}
