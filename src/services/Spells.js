import agent from './customAgent';

// const SPELLS = process.env.REACT_APP_SPELLS;
const SPELLS = 'https://grimoire-for-the-modern-mage.herokuapp.com/api/v1/spells';

export class Spells {
  static async getAll() {
    const response = await agent.get(`${SPELLS}/all`);
    return response.body;
  }

  static async getAvailable(charId) {
    const response = await agent.get(`${SPELLS}/${charId}/available`);
    return response.body;
  }

  static async getKnown(charId) {
    const response = await agent.get(`${SPELLS}/${charId}/known`);
    return response.body;
  }

  static async getPrepared(charId) {
    const response = await agent.get(`${SPELLS}/${charId}/prepared`);
    return response.body;
  }

  static async getDetails(spellId) {
    const response = await agent.get(`${SPELLS}/${spellId}/details`);
    return response.body;
  }

  static async updateDB() {
    const { body } = await agent
      .post(`${SPELLS}/update`)
      .set('auth', process.env.REACT_APP_PASSWORD);
    return body;
  }
}
