import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const CHARACTERS = 'https://gmm.herokuapp.com/api/v1/characters';
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const CHARACTERS = 'http://localhost:7890/api/v1/characters';

export class Character {
  static async create(info) {
    const { data } = await post(`${CHARACTERS}/`, info);
    return data;
  }

  static async getById(charId) {
    const { data } = await get(`${CHARACTERS}/${charId}`);
    return data;
  }

  static async getAll() {
    const { data } = await get(`${CHARACTERS}/all`);
    return data;
  }

  static async updateInfo(updatedInfo) {
    const { data } = await patch(`${CHARACTERS}/update`, updatedInfo);
    return data;
  }

  static async delete(charId) {
    const { data } = await del(`${CHARACTERS}/${charId}`);
    return data;
  }

  static async learnSpell(charId, spellId) {
    const { data } = await post(`${CHARACTERS}/learn`, { charId, spellId });
    return data;
  }

  static async forgetSpell(charId, spellId) {
    const { data } = await del(`${CHARACTERS}/${charId}/${spellId}`);
    return data;
  }

  static async updateSpellPreparation(updatedInfo) {
    const { data } = await patch(`${CHARACTERS}/prepare`, updatedInfo);
    return data;
  }

  static async castSpell(charId, slotLevel) {
    const { data } = await patch(`${CHARACTERS}/cast`, { charId, slotLevel });
    return data;
  }
}
