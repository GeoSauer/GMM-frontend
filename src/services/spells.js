import { get, post } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';

export class Spells {
  static async getAvailableSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}`);
    return data;
  }
  static async getKnownSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}`);
    return data;
  }
  static async getPreparedSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}/prepared`);
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
}
