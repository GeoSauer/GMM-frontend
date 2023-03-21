import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
// const SPELLBOOK = 'https://gmm.herokuapp.com/api/v1/spellbook';
const SPELLS = 'http://localhost:7890/api/v1/spells';
const SPELLBOOK = 'http://localhost:7890/api/v1/spellbook';

export async function getAvailableSpells() {
  const response = await get(`${SPELLS}/`);
  return response;
}

export async function getSpellDetail(id) {
  const response = await get(`${SPELLS}/${id}/details`);
  return response;
}

export async function learnSpell(id, spell) {
  const response = await post(
    `${SPELLS}/${id}/learn`,
    spell
  );
  return response;
}

export async function getKnownSpells() {
  const response = await get(`${SPELLBOOK}/`);
  return response;
}

export async function getPreparedSpells() {
  const response = await get(`${SPELLBOOK}/prepared`);
  return response;
}

export async function updateSpellPreparation(
  id,
  updatedInfo
) {
  const response = await patch(
    `${SPELLBOOK}/${id}/prepare`,
    updatedInfo
  );
  return response;
}

export async function forgetSpell(id) {
  const response = await del(`${SPELLBOOK}/${id}`);
  return response;
}
