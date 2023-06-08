import agent from './customAgent';

//TODO switch this over after deploy
const USERS = 'https://grimoire-for-the-modern-mage.herokuapp.com/api/v1/users';
// const USERS = 'http://localhost:7890/api/v1/users';
const USER_KEY = 'USER';

export class User {
  static async signUp(info) {
    const response = await agent.post(`${USERS}/`).send(info);
    response.user = response.data;
    return response;
  }

  static async signIn(info) {
    const response = await agent.post(`${USERS}/sessions`).send(info);
    response.user = response.body;
    return response;
  }

  static async signOut() {
    const response = await agent.del(`${USERS}/sessions`);
    localStorage.removeItem(USER_KEY);
    return response;
  }

  static async getById() {
    const { body } = await agent.get(`${USERS}/`);
    return body;
  }

  static async updateInfo(updatedInfo) {
    const { body } = await agent.patch(`${USERS}/update`).send(updatedInfo);
    return body;
  }
}
