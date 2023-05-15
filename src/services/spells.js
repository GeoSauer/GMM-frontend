import { get } from './requests';

//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';

export class Spells {
  static async getAll() {
    const { data } = await get(`${SPELLS}/all`);
    return data;
  }
  static async getAvailable(charId) {
    const { data } = await get(`${SPELLS}/${charId}/available`);
    return data;
  }
  static async getKnown(charId) {
    const { data } = await get(`${SPELLS}/${charId}/known`);
    return data;
  }
  static async getPrepared(charId) {
    const { data } = await get(`${SPELLS}/${charId}/prepared`);
    return data;
  }
  static async getDetails(spellId) {
    const { data } = await get(`${SPELLS}/${spellId}/details`);
    return data;
  }
}
