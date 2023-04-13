import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
// const KNOWN_SPELLS = 'https://gmm.herokuapp.com/api/v1/known-spells';
// const CHARACTERS = 'https://gmm.herokuapp.com/api/v1/characters';
const SPELLS = 'http://localhost:7890/api/v1/spells';
const KNOWN_SPELLS = 'http://localhost:7890/api/v1/known-spells';
const CHARACTERS = 'http://localhost:7890/api/v1/characters';

export class Spells {
  static async getAvailableSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}`);
    return data;
  }
  static async getKnownSpells(charId) {
    const { data } = await get(`${KNOWN_SPELLS}/${charId}`);
    return data;
  }
  static async getPreparedSpells(charId) {
    const { data } = await get(`${KNOWN_SPELLS}/${charId}/prepared`);
    return data;
  }
  static async getSpellDetails(spellId) {
    const { data } = await get(`${SPELLS}/${spellId}/details`);
    return data;
  }
  static async learnSpell(charId, spellId) {
    const { data } = await post(`${SPELLS}/learn`, { charId, spellId });
    return data;
  }
  static async forgetSpell(charId, spellId) {
    const { data } = await del(`${KNOWN_SPELLS}/${charId}/${spellId}`);
    return data;
  }
  static async updateSpellPreparation(updatedInfo) {
    const { data } = await patch(`${KNOWN_SPELLS}/prepare`, updatedInfo);
    return data;
  }
  static async castSpell(charId, slotLevel) {
    const { data } = await patch(`${CHARACTERS}/cast`, { charId, slotLevel });
    return data;
  }
}
