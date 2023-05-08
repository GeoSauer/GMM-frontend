import { get } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';

export class Spells {
  static async getAllSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}/all`);
    return data;
  }
  static async getAvailableSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}/available`);
    return data;
  }
  static async getKnownSpells(charId) {
    const { data } = await get(`${SPELLS}/${charId}/known`);
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
}
