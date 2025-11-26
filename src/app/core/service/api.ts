import { environment } from 'src/environments/environment';

export const ApiURL = {
  // auth
  login: `${environment.url}/adminLogin`,

  //common

  //api
  createUser: `${environment.url}/createUser`,
  users: `${environment.url}/getUsers`,
  updateUser: `${environment.url}/updateUser`,
  deleteUser: `${environment.url}/deleteUser`,
};
