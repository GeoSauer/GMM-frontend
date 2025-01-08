import agent from './customAgent';

const CHARACTERS = process.env.REACT_APP_CHARACTERS;
// const CHARACTERS = 'https://grimoire-for-the-modern-mage.herokuapp.com/api/v1/characters';

// eslint-disable-next-line
console.log(
  process.env.REACT_APP_CHARACTERS,
  process.env.REACT_APP_USERS,
  process.env.REACT_APP_SPELLS
);
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
