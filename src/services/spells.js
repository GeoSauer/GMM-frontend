import agent from './customAgent';
//TODO switch this over after deploy
// const SPELLS = 'https://gmm.herokuapp.com/api/v1/spells';
const SPELLS = 'http://localhost:7890/api/v1/spells';

export class Spells {
  // static async getAll(offset, batchSize) {
  //   const response = await agent.get(`${SPELLS}/all`).query({ offset, batchSize });
  //   return response.body;
  // }

  // static async getAvailable(charId, offset, batchSize) {
  //   const response = await agent.get(`${SPELLS}/${charId}/available`).query({ offset, batchSize });
  //   return response.body;
  // }
  // static async getKnown(charId, offset, batchSize) {
  //   const response = await agent.get(`${SPELLS}/${charId}/known`).query({ offset, batchSize });
  //   return response.body;
  // }

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
}
