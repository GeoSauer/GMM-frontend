import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
// const KNOWN_SPELLS = 'https://gmm.herokuapp.com/api/v1/known-spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';
const KNOWN_SPELLS = 'http://localhost:7890/api/v1/known-spells';

export async function getAvailableSpells() {
  const { data } = await get(`${SPELLS}/`);
  return data;
}

export async function getSpellDetails(id) {
  const { data } = await get(`${SPELLS}/${id}/details`);
  return data;
}

//TODO
export async function learnSpell(id) {
  const { body } = await post(`${SPELLS}/learn`, id);
  return body;
}

export async function getKnownSpells() {
  const { data } = await get(`${KNOWN_SPELLS}/`);
  return data;
}

export async function getPreparedSpells() {
  const { data } = await get(`${KNOWN_SPELLS}/prepared`);
  return data;
}

export async function updateSpellPreparation(updatedInfo) {
  const { body } = await patch(`${KNOWN_SPELLS}/prepare`, updatedInfo);
  return body;
}

export async function forgetSpell(id) {
  const { body } = await del(`${KNOWN_SPELLS}/${id}`);
  return body;
}
