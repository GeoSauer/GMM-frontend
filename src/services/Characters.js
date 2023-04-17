import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const CHARACTERS = 'https://gmm.herokuapp.com/api/v1/characters';
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const CHARACTERS = 'http://localhost:7890/api/v1/characters';
const SPELLS = 'http://localhost:7890/api/v1/spells';

export class Character {
  static async createCharacter(info) {
    const { data } = await post(`${CHARACTERS}/`, info);
    return data;
  }

  static async getCharacterById(charId) {
    const { data } = await get(`${CHARACTERS}/${charId}`);
    return data;
  }

  static async getAllCharacters() {
    const { data } = await get(`${CHARACTERS}/all`);
    return data;
  }

  static async updateCharacterInfo(updatedInfo) {
    const { data } = await patch(`${CHARACTERS}/update`, updatedInfo);
    return data;
  }

  static async deleteCharacter(charId) {
    const { data } = await del(`${CHARACTERS}/${charId}`);
    return data;
  }

  static async learnSpell(charId, spellId) {
    const { data } = await post(`${SPELLS}/learn`, { charId, spellId });
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
