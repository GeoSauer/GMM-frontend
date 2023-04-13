import { get, patch, post, del } from './requests';

//TODO switch this over after deploy
// const CHARACTERS = 'https://gmm.herokuapp.com/api/v1/characters';
const CHARACTERS = 'http://localhost:7890/api/v1/characters';

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

  static async updateCharacterInfo(charId, updatedInfo) {
    const { body } = await patch(`${CHARACTERS}/update`, { charId, updatedInfo });
    return body;
  }

  static async deleteCharacter(charId) {
    const { data } = await del(`${CHARACTERS}/${charId}`);
    return data;
  }

  static async castSpell(charId, slotLevel) {
    const { data } = await patch(`${CHARACTERS}/cast`, { charId, slotLevel });
    return data;
  }

  static async updateSpellPreparation(updatedInfo) {
    const { data } = await patch(`${CHARACTERS}/prepare`, updatedInfo);
    return data;
  }

  static async forgetSpell(charId, spellId) {
    const { data } = await del(`${CHARACTERS}/${charId}/${spellId}`);
    return data;
  }
}
