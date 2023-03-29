import { get, patch } from './requests';

//TODO switch this over after deploy
// const URL = 'https://gmm.herokuapp.com/api/v1/users';
const URL = 'http://localhost:7890/api/v1/users';

export async function getUserById() {
  const { data } = await get(`${URL}/`);
  return data;
}

export async function updateUserInfo(updatedInfo) {
  const response = await patch(`${URL}/update`, updatedInfo);
  return response.body;
}

// export async function getUserByLogin(credentials)
