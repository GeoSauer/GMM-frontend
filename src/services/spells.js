import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
// const KNOWN_SPELLS = 'https://gmm.herokuapp.com/api/v1/known-spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';
const KNOWN_SPELLS =
  'http://localhost:7890/api/v1/known-spells';

export async function getAvailableSpells() {
  const { body } = await get(`${SPELLS}/`);
  return body;
}

export async function getSpellDetail(id) {
  const { body } = await get(`${SPELLS}/${id}/details`);
  return body;
}

export async function learnSpell(spell) {
  const { body } = await post(`${SPELLS}/learn`, spell);
  return body;
}

export async function getKnownSpells() {
  const { body } = await get(`${KNOWN_SPELLS}/`);
  return body;
}

export async function getPreparedSpells() {
  const { body } = await get(`${KNOWN_SPELLS}/prepared`);
  return body;
}

export async function updateSpellPreparation(updatedInfo) {
  const { body } = await patch(
    `${KNOWN_SPELLS}/prepare`,
    updatedInfo
  );
  return body;
}

export async function forgetSpell(id) {
  const { body } = await del(`${KNOWN_SPELLS}/${id}`);
  return body;
}
