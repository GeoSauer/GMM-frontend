import agent from './customAgent';

//TODO switch this over after deploy
const CHARACTERS = 'https://grimoire-for-the-modern-mage.herokuapp.com/api/v1/characters';
// const CHARACTERS = 'http://localhost:7890/api/v1/characters';

export class Character {
  static async create(info) {
    const { body } = await agent.post(`${CHARACTERS}/`).send(info);
    return body;
  }

  static async getById(charId) {
    const { body } = await agent.get(`${CHARACTERS}/${charId}`);
    return body;
  }

  static async getAll() {
    const { body } = await agent.get(`${CHARACTERS}/all`);
    return body;
  }

  static async updateInfo(updatedInfo) {
    const { body } = await agent.patch(`${CHARACTERS}/update`).send(updatedInfo);
    return body;
  }

  static async delete(charId) {
    const { body } = await agent.del(`${CHARACTERS}/${charId}`);
    return body;
  }

  static async learnSpell(spellInfo) {
    const { body } = await agent.post(`${CHARACTERS}/learn`).send(spellInfo);
    return body;
  }

  static async forgetSpell(charId, spellId) {
    const { body } = await agent.del(`${CHARACTERS}/${charId}/${spellId}`);
    return body;
  }

  static async updateSpellPreparation(updatedInfo) {
    const { body } = await agent.patch(`${CHARACTERS}/prepare`).send(updatedInfo);
    return body;
  }

  static async castSpell(charId, slotLevel) {
    const { body } = await agent.patch(`${CHARACTERS}/cast`).send({ charId, slotLevel });
    return body;
  }
}
